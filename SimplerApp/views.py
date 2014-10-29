import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Simpler.settings')
from django.shortcuts import render_to_response 
from django.template import RequestContext
from django.http import HttpResponseRedirect, HttpResponse
from models import Post, Simpler, postBox, SimplerBox, UserForm, UserProfileForm, HighlightDesc, highlightq, highlight, topic, ReqByUser, UserNotification, UserProfile
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from datetime import datetime

def index(request):
    context = RequestContext(request)
    topics = topic.objects.all()
    topic_dict = []
    for t in topics:
        if Post.objects.all().filter(topic=t):
            topic_dict.append(Post.objects.all().filter(topic=t))
    context_dict = {'topics':topic_dict}

    simpler_num_arr = []
    for post in Post.objects.all():      #Picking all posts up right now. Gotta fix it later.
        simpler_num_arr.append([post.id, len(post.simpler_set.all().filter(display=' '))])
    context_dict['numarr']=simpler_num_arr

    form = postBox()
    context_dict['form'] = form
    #notifs = UserNotification.objects.all().filter(user=request.user.username).filter(status='unread')
    #context_dict['notifs'] = notifs
    #context_dict['notifcount'] = notifs.count()
    if request.user.is_authenticated():
        user_profile = UserProfile.objects.get(user=request.user)
        followedposts = user_profile.followed_posts.split(';')
        followed = []
        for fpost in followedposts:
            followed.append(int(fpost))
        context_dict['followed'] = followed
    return render_to_response('SimplerApp/index.html',context_dict, context)

def follow(request):
    context = RequestContext(request)
    post_id = request.GET['post_id']
    user_profile = UserProfile.objects.get(user=request.user)
    followedposts = user_profile.followed_posts.split(';')
    if post_id in followedposts:
        del followedposts[followedposts.index(post_id)]
    else:
        followedposts.insert(-1, post_id)
    user_profile.followed_posts = ';'.join(followedposts)
    user_profile.modified = datetime.now()
    user_profile.save()
    return HttpResponse('success')

def addpost(request):
    if request.method == 'POST':
        form = postBox(request.POST)
        if form.is_valid():
            f = form.save(commit=False)
            f.author = request.user.username
            p = f.post
            f.post = '<p>' + p + '</p>'         #Encloses in <p></p>.
            f.created = datetime.now()
            f.modified = datetime.now()
            f.save()
            topic.objects.get_or_create(topic=f.topic)
    return HttpResponseRedirect('/')
   
def post(request, post_id):
    context = RequestContext(request)
    parent_list_dict = {}
    post_id_int = int(post_id)
    context_dict ={'post_id':post_id}
    post = Post.objects.get(id=post_id_int)
    context_dict['post']=post
    simplers = Simpler.objects.all().filter(post=post).filter(display =' ')         #Not so efficient algorithmically.
    maximum = 0
    highlightq_set = []
    for simpler in simplers:
        highlights = highlight.objects.all().filter(highlight_parent=simpler)
        for hl in highlights:
            highlightq_set.append(highlightq.objects.all().filter(highlight=hl))
        if simpler.coeficient > maximum:
            maximum = simpler.coeficient
    context_dict['request']='-1'
    context_dict['simplers']=simplers
    context_dict['max'] = maximum
    context_dict['loop'] = range(1, maximum+1)
    context_dict['highlightqs'] = highlightq_set              #All the highlighqs related to this question are being passed on.
    #notifs = UserNotification.objects.all().filter(user=request.user.username).filter(status='unread')
    #context_dict['notifs'] = notifs
    #context_dict['notifcount'] = notifs.count()
    return render_to_response('SimplerApp/post.html', context_dict, context)

def postreq(request, post_id, requestid):
    context = RequestContext(request)
    request_id = int(requestid)
    try:
        user_request = ReqByUser.objects.get(id=request_id)
    except:
        return HttpResponseRedirect('/simpler/' + post_id + '/')
    parent_list_dict = {}
    post_id_int = int(post_id)
    context_dict ={'post_id':post_id}
    post = Post.objects.get(id=post_id_int)
    context_dict['post']=post
    simplers = Simpler.objects.all().filter(post=post).filter(display =' ')         #Not so efficient algorithmically.
    maximum = 0
    highlightq_set = []
    for simpler in simplers:
        highlights = highlight.objects.all().filter(highlight_parent=simpler)
        for hl in highlights:
            highlightq_set.append(highlightq.objects.all().filter(highlight=hl))
        if simpler.coeficient > maximum:
            maximum = simpler.coeficient
    context_dict['request']=user_request.description.split('simplerid:')[1].split(';')[0]
    context_dict['simplers']=simplers
    context_dict['max'] = maximum
    context_dict['loop'] = range(1, maximum+1)
    context_dict['highlightqs'] = highlightq_set              #All the highlighqs related to this question are being passed on.
    #notifs = UserNotification.objects.all().filter(user=request.user.username).filter(status='unread')
    #context_dict['notifs'] = notifs
    #context_dict['notifcount'] = notifs.count()
    return render_to_response('SimplerApp/post.html', context_dict, context)

    
def makesimpler(request):
    context = RequestContext(request)
    if request.GET['simpler_id']=='level1-simp':
        post_id = int(request.GET['post_id'])
        post = Post.objects.get(id=post_id)
        simpler_text = request.GET['simpler_text']
        c = Simpler.objects.get_or_create(post=post, simpler = '<div class ="question"></div><div class ="answer">' + simpler_text + '</div>', simpler_original=simpler_text, coeficient=1, author=request.user.username, display=' ', parent_list=' ', created = datetime.now(), modified = datetime.now())[0]
        #getting all the users who have followed the particular post
        authors = []
        profiles = UserProfile.objects.all()
        for profile in profiles:
            if (';' + str(post_id) + ';') in profile.followed_posts:
                authors.append(profile.user.username)
        for author in authors:
            if author != request.user.username:
                u = UserNotification.objects.get_or_create(user=author, notification=str(request.user.username) + ' added an answer to post:' + str(post.id), status='unread', postid=post.id)
                if u[1]:
                    u[0].created = datetime.now()
                u[0].modified = datetime.now()
                u[0].save()
    else: 
        highlight_simpler_id = int(request.GET['simpler_id'])
        simpler_text = request.GET['simpler_text']
        highlight_simpler = Simpler.objects.get(id=highlight_simpler_id)
        c = Simpler.objects.get_or_create(post = highlight_simpler.post, parent_simpler = highlight_simpler.parent_simpler,  simpler = highlight_simpler.simpler + '<br/><br/><div class ="answer">'+ simpler_text + '</div>', simpler_original = highlight_simpler.simpler,coeficient = highlight_simpler.coeficient, parent_list = highlight_simpler.parent_list, author = request.user.username, display=' ', created = datetime.now(), modified = datetime.now())[0]
        #getting the user who asked the question
        if highlight_simpler.author is not request.user.username:
            u = UserNotification.objects.get_or_create(user=highlight_simpler.author, notification=str(request.user.username) + ' added an answer to your question', status='unread', postid=highlight_simpler.post.id, simplerid=c.id)
            if u[1]:
                u[0].created = datetime.now()
            u[0].modified = datetime.now()
            u[0].save()
        #getting all the users who have followed the particular post
        authors=[]
        profiles = UserProfile.objects.all()
        for profile in profiles:
            if (';' + str(highlight_simpler.post.id) + ';') in profile.followed_posts:
                authors.append(profile.user.username)
        for author in authors:
            if author != request.user.username:
                u = UserNotification.objects.get_or_create(user=author, notification=str(request.user.username) + ' added an answer to post:' + str(highlight_simpler.post.id), status='unread', postid=highlight_simpler.post.id, simplerid=c.id)
                if u[1]:
                    u[0].created = datetime.now()
                u[0].modified = datetime.now()
                u[0].save()
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
            profile.created = datetime.now()
            profile.modified = datetime.now()
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

def define(request, post_id, simpler_id, new_simpler, old_simpler):
    context = RequestContext(request)
    if old_simpler == 'empty':
        old_simpler = ''
    new_simpler = new_simpler.replace("xqmx", "?")
    old_simpler = old_simpler.replace("xqmx", "?")
    post_id = int(post_id)
    simpler_id = int(simpler_id)
    flag = False
    if 'curr_highlight' not in new_simpler:
        new_simpler, old_simpler = old_simpler, new_simpler
        flag = True
    highlight = new_simpler.split('curr_highlight')[1].split('>')[1].split('<')[0];     #Extracts the highlights.
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
            if flag:
                simpler.simpler = '<div class="question">' + (new_simpler.replace('curr_highlight','highlight')).replace('curr_checkedhigh','checkedhigh').replace('style="display: none;"','') + '</div><div class="answer">' + old_simpler + '</div>'        #JS and Python conflict fixed. Brute forced the display:none out.
            else:
                simpler.simpler = '<div class="question">' + old_simpler + '</div><div class="answer">' + (new_simpler.replace('curr_highlight','highlight')).replace('curr_checkedhigh','checkedhigh').replace('style="display: none;"','') + '</div>'        #JS and Python conflict fixed. Brute forced the display:none out
            simpler.modified = datetime.now()
            simpler.save()
            f.status = 0
            f.highlight = highlight
            f.req_by = request.user
            highlight_simpler_context = '<div class="question">' + highlight + '<br/><br/>'
            simpler_content = highlight_simpler_context + '<p style="font-size:12pt;" class="q-text">' + f.description + '</p></div>'
            parent_list = 'parent' + str(simpler.id) + ' '
            curr_simpler = simpler
            while curr_simpler.parent_simpler != None:
                parent_list += "parent" + str(curr_simpler.parent_simpler.id) + " "
                curr_simpler = curr_simpler.parent_simpler
            g = Simpler.objects.get_or_create(post = simpler.post, parent_simpler = simpler, simpler = simpler_content, coeficient=simpler.coeficient+1, parent_list = parent_list, author = request.user.username, display='none')[0]
            f.highlight_simpler = g
            f.created = datetime.now()
            f.save()
            question = highlightq.objects.get_or_create(highlight=f, question=f.description, created = datetime.now())
            #getting the user who wrote the simpler
            if simpler.author is not request.user.username:
                u = UserNotification.objects.get_or_create(user=simpler.author, notification=str(request.user.username) + ' added a question to your answer:' + str(simpler_id), status='unread', postid=post_id, simplerid=simpler_id)
                if u[1]:
                    u[0].created = datetime.now()
                u[0].modified = datetime.now()
                u[0].save()
            #getting the users who have followed the post    
            authors = []
            profiles = UserProfile.objects.all()
            for profile in profiles:
                if (';' + str(post_id) + ';') in profile.followed_posts:
                    authors.append(profile.user.username)
            for author in authors:
                if author != request.user.username:
                    u = UserNotification.objects.get_or_create(user=author, notification=str(request.user.username) + ' added a question to post:' + str(post_id), status='unread', postid=post_id, simplerid=simpler_id)
                    if u[1]:
                        u[0].created = datetime.now()
                    u[0].modified = datetime.now()
                    u[0].save()
            return HttpResponseRedirect('/request/askforsimpler/postid:' + str(post_id) + ';simplerid:' + str(simpler_id) + ';')
            #return HttpResponseRedirect('/simpler/'+str(f.highlight_parent.post.id))
    else:
        form = HighlightDesc()

    context_dict['post_id']=str(post_id)
    context_dict['pid']=str(simpler_id)
    context_dict['form']=form
    return render_to_response('SimplerApp/define.html',context_dict,context)

def defined(request, post_id, simpler_id, highlightx, current):
    context = RequestContext(request)
    post_id = int(post_id)
    parent_simpler_id = int(simpler_id)
    parent_simpler = Simpler.objects.get(id = parent_simpler_id)
    highlightx = highlightx.replace("_", " ")
    highlights = highlightx.split('xhex')
    count = len(highlights)
    highlight = highlights[int(current)]
    del highlights[int(current)]
    highlighty = 'xhex'.join(highlights)
    if request.method == 'POST':
        form = HighlightDesc(request.POST)
        if form.is_valid():
            f = form.save(commit=False)
            f.highlight_parent = parent_simpler
            f.status = 0
            f.highlight = highlight
            f.req_by = request.user
            highlight_simpler_context = '<div class="question">' + highlight + '<br/><br/>'
            simpler_content = highlight_simpler_context + '<p style="font-size:12pt;" class="q-text">' + f.description + '</p></div>'
            parent_list = 'parent' + str(parent_simpler_id) + ' '
            curr_simpler = parent_simpler
            while curr_simpler.parent_simpler != None:
                parent_list += 'parent' + str(curr_simpler.parent_simpler.id) + " "
                curr_simpler = curr_simpler.parent_simpler
            g = Simpler.objects.get_or_create(post = parent_simpler.post, parent_simpler = parent_simpler, simpler = simpler_content, coeficient = parent_simpler.coeficient + 1, parent_list = parent_list, author = request.user.username, display='none')[0]
            f.highlight_simpler = g
            f.created = datetime.now()
            f.save()
            question = highlightq.objects.get_or_create(highlight=f, question=f.description, created = datetime.datetime.now())
            #getting the user who wrote the simpler
            if parent_simpler.author is not request.user.username:
                u = UserNotification.objects.get_or_create(user=parent_simpler.author, notification=str(request.user.username) + ' added a question to your answer:' + str(simpler_id), status='unread', postid=post_id, simplerid=simpler_id)
                if u[1]:
                    u[0].created = datetime.now()
                u[0].modified = datetime.now()
                u[0].save()
            #getting the users who have followed the post    
            authors = []
            profiles = UserProfile.objects.all()
            for profile in profiles:
                if (';' + str(post_id) + ';') in profile.followed_posts:
                    authors.append(profile.user.username)
            for author in authors:
                if author != request.user.username:
                    u = UserNotification.objects.get_or_create(user=author, notification=str(request.user.username) + ' added a question to post:' + str(post_id), status='unread', postid=post_id, simplerid=simpler_id)
                    if u[1]:
                        u[0].created = datetime.now()
                    u[0].modified = datetime.now()
                    u[0].save()
            if int(current) == count - 1 and count == 1:
                return HttpResponseRedirect('/request/askforsimpler/postid:' + str(post_id) + ';simplerid:' + str(simpler_id) + ';')
                #return HttpResponseRedirect('/simpler/' + str(f.highlight_parent.post.id))
            elif int(current) == count - 1:
                return HttpResponseRedirect('/defined/' + str(post_id) + '/' + str(parent_simpler_id) + '/' + highlighty + '/' + str(int(current) - 1) + '/')
            else:
                return HttpResponseRedirect('/defined/' + str(post_id) + '/' + str(parent_simpler_id) + '/' + highlighty + '/' + current + '/')
    else:
        form = HighlightDesc()
    context_dict = {'highlight':highlight, 'highlightx':highlightx, 'post_id': post_id, 'pid': parent_simpler_id, 'count':count, 'current': current}
    context_dict['form'] = form
    return render_to_response('SimplerApp/defined.html', context_dict, context)

def requestbyuser(request, category, description):
    context = RequestContext(request)
    
    if category == 'back_to_post' or category == 'askforsimpler' or category == 'addsimpler':
        postid = description.split('postid:')[1].split(';')[0]
        if request.user.is_authenticated():
            c = ReqByUser.objects.get_or_create(user=request.user, category=category, description=description)
            if c[1]:
                c[0].created = datetime.now()
            c[0].modified = datetime.now()
            c[0].frequency = c[0].frequency + 1
            c[0].save()
            return HttpResponseRedirect('/simpler/' + postid + '/' + str(c[0].id) + '/')
        else:
            return HttpResponseRedirect('/simpler/' + postid)
        
    elif category == 'notifications':
        notif_id = int(description)
        notification = UserNotification.objects.get(id=notif_id)
        post_id = notification.postid
        notification.status = 'read'
        notification.save()
        c = ReqByUser.objects.get_or_create(user=request.user, category=category, description=description)
        if c[1]:
            c[0].created = datetime.now()
        c[0].modified = datetime.now()
        c[0].frequency = c[0].frequency + 1
        c[0].save()
        simpler_id = notification.simplerid
        if simpler_id > -1:
            c = ReqByUser.objects.get_or_create(user=request.user, category='back_to_post', description='postid:' + str(post_id) + ';simplerid:' + str(simpler_id) + ';')
            if c[1]:
                c[0].created = datetime.now()
            c[0].modified = datetime.now()
            c[0].frequency = c[0].frequency + 1
            c[0].save()
            return HttpResponseRedirect('/simpler/' + str(post_id) + '/' + str(c[0].id) + '/')
        else:
                return HttpResponseRedirect('/simpler/' + str(post_id) + '/')
            
    elif category == 'explore':
        postid = description
        if request.user.is_authenticated():
            c = ReqByUser.objects.get_or_create(user=request.user, category=category, description='postid:' + description)
            if c[1]:
                c[0].created = datetime.now()
            c[0].modified = datetime.now()
            c[0].frequency = c[0].frequency + 1
            c[0].save()
            return HttpResponseRedirect('/simpler/' + postid + '/')
        else:
            return HttpResponseRedirect('/')
	
def deletesimpler(request):
    context = RequestContext(request)
    deleted_simp = request.GET['curr_simp_id']
    required_simpler = Simpler.objects.get(id=int(deleted_simp))
    required_simpler.display='none'
    required_simpler.save()
    return HttpResponse('success')

def addanswer(request, qid):
    context = RequestContext(request)
    q = highlightq.objects.get(id=qid)
    simpler = q.highlight.highlight_simpler
    context_dict = {'simpler':simpler}
    context_dict['post_id'] = simpler.post.id
    return render_to_response('SimplerApp/addsimpler.html', context_dict, context)
