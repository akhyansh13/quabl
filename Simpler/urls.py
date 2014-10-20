from django.conf.urls import patterns, include, url
from SimplerApp.views import index, post, makesimpler, register, user_login, user_logout, deletesimpler, addpost, define, quotes, defined, addanswer, requestbyuser, postreq
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Simpler.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', index),
    url(r'^simpler/(?P<post_id>\w+)/(?P<requestid>\w+)/$', postreq),        #Coming as a result of a HttpResponseRedirect.
    url(r'^simpler/(?P<post_id>\w+)/$', post),      #Coming from the index page.
    url(r'^makesimpler/$', makesimpler),
    url(r'^register/$', register),
    url(r'^login/$', user_login),
    url(r'^logout/$', user_logout),
    url(r'^deletesimpler/$', deletesimpler),
    url(r'^addpost/$', addpost),
    url(r'^define/(?P<post_id>\w+)/(?P<simpler_id>\w+)/newxhex/(?P<new_simpler>[\w|\W]+)/oldxhex/(?P<old_simpler>[\w|\W]*)/$', define),
    url(r'^defined/(?P<post_id>\w+)/(?P<simpler_id>\w+)/(?P<highlightx>[\w|\W]+)/(?P<current>[\w|\W]+)/$', defined),                   
    url(r'^addsimpler/(?P<qid>\w+)/$', addanswer),
    url(r'^quotes/(?P<author>\w+)/$', quotes),
    url(r'^request/(?P<category>[\w|\W]+)/(?P<description>[\w|\W]+)/$', requestbyuser),
) 
