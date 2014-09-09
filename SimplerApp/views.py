import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Simpler.settings')
from django.shortcuts import render_to_response 
from django.template import RequestContext
from django.http import HttpResponseRedirect, HttpResponse
from models import Post, Simpler, postBox, SimplerBox, UserForm, UserProfileForm, HighlightDesc, highlightq, highlight, Quote
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from functions import getQuotes, first_alpha_toupper, format_author

def index(request):
    context = RequestContext(request)
    posts = Post.objects.all()
    context_dict = {'posts':posts}
    form = postBox()
    context_dict['form'] = form
    return render_to_response('SimplerApp/index.html',context_dict, context)

def addpost(request):
    if request.method == 'POST':
        form = postBox(request.POST)
        if form.is_valid():
            f = form.save(commit=False)
            f.author = request.user.username
            p = f.post
            f.post = '<p>' + p + '</p>'         #Encloses in <p></p>.
            f.save()
    return HttpResponseRedirect('/')

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
    highlightqs = []
    for simpler in simplers:
        simpler_hset = simpler.highlight_set.all()
        for h in simpler_hset:
            highlightqs.append(h.highlightq_set.all())
        if simpler.coeficient > maximum:
            maximum = simpler.coeficient
    context_dict['max'] = maximum
    context_dict['loop'] = range(1, maximum+1)
    context_dict['highlightqs'] = highlightqs               #All the highlighqs related to this question are being passed on.
    return render_to_response('SimplerApp/post.html', context_dict, context) 
    
def makesimpler(request):
    context = RequestContext(request)
    if request.GET['simpler_id']=='level1-simp':
        post_id = int(request.GET['post_id'])
        post = Post.objects.get(id=post_id)
        simpler_text = request.GET['simpler_text']
        c = Simpler.objects.get_or_create(post=post, simpler = simpler_text, simpler_original=simpler_text, coeficient=1, author=request.user.username, display=' ', parent_list=' ')[0]
    else: 
        highlight_simpler_id = int(request.GET['simpler_id'])
        simpler_text = request.GET['simpler_text']
        highlight_simpler = Simpler.objects.get(id=highlight_simpler_id)
        c = Simpler.objects.get_or_create(post = highlight_simpler.post, parent_simpler = highlight_simpler.parent_simpler,  simpler = highlight_simpler.simpler + '<br/><br/>' + simpler_text, simpler_original = highlight_simpler.simpler,coeficient = highlight_simpler.coeficient, parent_list = highlight_simpler.parent_list, author = request.user.username, display=' ')[0]
    return HttpResponse('success')
    
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

def define(request, post_id, simpler_id, new_simpler):
    context = RequestContext(request)
    post_id = int(post_id)
    simpler_id = int(simpler_id)
    highlight = new_simpler.split('curr_highlight')[1].split('>')[1].split('&nbsp')[0];     #Extracts the highlights.
    context_dict = {'highlight':highlight}
    context_dict['new_simpler']=new_simpler
    post = Post.objects.get(id=post_id)
    simpler = Simpler.objects.get(id=simpler_id)
    context_dict['post']=post
    context_dict['simpler']=simpler

    if request.method == 'POST':
        form = HighlightDesc(request.POST)
        if form.is_valid():
            f = form.save(commit=False)
            f.highlight_parent = simpler
            simpler.simpler = (new_simpler.replace('curr_highlight','highlight')).replace('curr_checkedhigh','checkedhigh').replace('style="display: none;"','')        #JS and Python conflict fixed. Brute forced the display:none out.
            simpler.save()
            f.status = 0
            f.highlight = highlight
            f.req_by = request.user
            highlight_simpler_context = '<h4 style="line-height:1.35em;"><i>' + highlight + '</i></h4>'
            simpler_content = highlight_simpler_context + '<p style="font-size:14pt;">' + f.description + '</p>'
            parent_list = 'parent' + str(simpler.id) + ' '
            curr_simpler = simpler
            while curr_simpler.parent_simpler != None:
                parent_list += "parent" + str(curr_simpler.parent_simpler.id) + " "
                curr_simpler = curr_simpler.parent_simpler
            g = Simpler.objects.get_or_create(post = simpler.post, parent_simpler = simpler, simpler = simpler_content, coeficient=simpler.coeficient+1, parent_list = parent_list, author = request.user.username)[0]
            f.highlight_simpler = g
            f.save()
            question = highlightq.objects.get_or_create(highlight=f, question=f.description)
            return HttpResponseRedirect('/simpler/'+str(f.highlight_parent.post.id))
    else:
        form = HighlightDesc()

    context_dict['form']=form
    return render_to_response('SimplerApp/define.html',context_dict,context)

def highlightt(request, post_id, simpler_id, highlightx, current):
    context = RequestContext(request)
    parent_simpler_id=int(simpler_id)
    parent_simpler = Simpler.objects.filter(id=parent_simpler_id)
    highlightx = highlightx.replace("_", " ")
    highlights = highlightx.split("xhex")
    count = len(highlights)
    h = highlights[int(current)]
    highlight_array = highlight.objects.filter(highlight_parent=parent_simpler)     #Haven't accounted for two highlight objects having the same highlight attribute having same simpler as the highlight parent.
    highlight_array = highlight_array.filter(highlight=h)
    context_dict = {'higharr':highlight_array, 'post_id':post_id, 'count':count, 'current':current, 'pid':parent_simpler_id, 'highlightx':highlightx}
    return render_to_response('SimplerApp/highlight.html', context_dict, context)
	
def deletesimpler(request):
    context = RequestContext(request)
    deleted_simp = request.GET['curr_simp_id']
    required_simpler = Simpler.objects.get(id=int(deleted_simp))
    required_simpler.display='none'
    required_simpler.save()
    return HttpResponse('success')

def quotes(request, author):
    context = RequestContext(request)
    getQuotes(author)
    quotes = Quote.objects.all()
    author_formatted = format_author(author)
    auth_quotes = quotes.filter(author = author_formatted)
    context_dict = {'quotes':auth_quotes}
    return render_to_response('SimplerApp/quotes.html', context_dict, context)
