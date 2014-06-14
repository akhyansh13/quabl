import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'simpler.settings')
from django.shortcuts import render_to_response 
from django.template import RequestContext
from django.http import HttpResponseRedirect, HttpResponse
from models import Post, Simpler, postBox, SimplerBox, UserForm, UserProfileForm, simpler_request
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

def index(request):
    context = RequestContext(request)
    posts = Post.objects.all()
    context_dict = {'posts':posts}
    if request.method == 'POST':
        form = postBox(request.POST)
        f = form.save(commit=False)
        f.author = request.user.username
        f.save()
    else:
        form = postBox()
    context_dict['form'] = form
    return render_to_response('SimplerApp/index.html',context_dict, context)

@login_required    
def post(request, post_id):
    context = RequestContext(request)
    parent_list_dict = {}
    post_id_int = int(post_id)
    context_dict ={'post_id':post_id}
    post = Post.objects.get(id=post_id_int)
    context_dict['post']=post
    simplers = post.simpler_set.all()
    maximum = 0
    for simpler in simplers:
        if simpler.coeficient > maximum:
            maximum = simpler.coeficient
        parent_list = ''
        while(simpler.parent_simpler != None):
            parent_list = "parent" + str(simpler.parent_simpler.id) + " "
            simpler = simpler.parent_simpler
        parent_list_dict[simpler.id] = parent_list
    context_dict['parent_list_dict']=parent_list_dict
    context_dict['max'] = maximum
    context_dict['loop'] = range(1, maximum+1)
    if request.method == 'POST':
        form = SimplerBox(request.POST)
        if form.is_valid():
            f = form.save(commit=False)
            f.coeficient = 1
            f.author = request.user.username
            f.post = post
            f.save()
    else:
        form = SimplerBox()
    context_dict['form']=form
    return render_to_response('SimplerApp/post.html', context_dict, context) 
    
def makesimpler(request):
    context = RequestContext(request)
    parent_simpler_id = int(request.GET['simpler_id'])
    simpler_text = request.GET['simpler_text']
    parent_simpler = Simpler.objects.get(id=parent_simpler_id)
    parent_list = 'parent' + str(parent_simpler.id) + ' '
    curr_simpler = parent_simpler
    while curr_simpler.parent_simpler != None:
        parent_list += "parent" + str(curr_simpler.parent_simpler.id) + " "
        curr_simpler = curr_simpler.parent_simpler
    c = Simpler.objects.get_or_create(post = parent_simpler.post, parent_simpler = parent_simpler,  simpler = simpler_text, coeficient = parent_simpler.coeficient + 1, parent_list = parent_list, author = request.user.username)[0]
    new_simpler_id = c.id
    return HttpResponse(new_simpler_id)
    
def register(request):
    context = RequestContext(request)
    registered = False

    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        profile_form = UserProfileForm(data=request.POST)

        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()

            user.set_password(user.password)
            user.save()

            profile = profile_form.save(commit=False)
            profile.user = user
            if 'picture' in request.FILES:
                profile.picture = request.FILES['picture']
            profile.save()

            registered = True

        else:
            print user_form.errors, profile_form.errors

    else:
        user_form = UserForm()
        profile_form = UserProfileForm()

    return render_to_response(
            'SimplerApp/register.html',
            {'user_form': user_form, 'profile_form': profile_form, 'registered': registered},
            context)
            
def user_login(request):
    context = RequestContext(request)

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('/')
            else:
                return HttpResponse("Your Simpler account is disabled.")
        else:
            print "Invalid login details: {0}, {1}".format(username, password)
            return HttpResponse("Invalid Username or Password.")

    else:
        return render_to_response('SimplerApp/login.html', {}, context) 
        
@login_required
def user_logout(request):
    logout(request)

    return HttpResponseRedirect('/')

def requestsimpler(request):
    simpler_id = int(request.GET['simpler_id'])
    simpler_concerned = Simpler.objects.get(id=simpler_id)
    new_req = simpler_request.objects.get_or_create(simpler=simpler_concerned, status = 0, req_by=request.user)
    return HttpResponse('success')
        
def requests(request):
    context = RequestContext(request)
    reqs = simpler_request.objects.all()
    context_dict = {'reqs':reqs}
    return render_to_response('SimplerApp/requests.html', context_dict, context)

#def deletesimpler(request):
    #context = RequestContext(request)
