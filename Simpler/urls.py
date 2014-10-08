from django.conf.urls import patterns, include, url
from SimplerApp.views import index, post, makesimpler, register, user_login, user_logout, deletesimpler, addpost, define, highlightt, quotes, defined, addanswer
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Simpler.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', index),
    url(r'^simpler/(?P<post_id>\w+)/$', post),
    url(r'^makesimpler/$', makesimpler),
    url(r'^register/$', register),
    url(r'^login/$', user_login),
    url(r'^logout/$', user_logout),
    url(r'^deletesimpler/$', deletesimpler),
    url(r'^addpost/$', addpost),
    url(r'^define/(?P<post_id>\w+)/(?P<simpler_id>\w+)/newxhex/(?P<new_simpler>[\w|\W]+)/oldxhex/(?P<old_simpler>[\w|\W]*)/$', define),
    url(r'^defined/(?P<post_id>\w+)/(?P<simpler_id>\w+)/(?P<highlightx>[\w|\W]+)/(?P<current>[\w|\W]+)/$', defined),                   
    url(r'^highlight/(?P<post_id>\w+)/(?P<simpler_id>\w+)/(?P<highlightx>[\w|\W]+)/(?P<current>[\w|\W]+)/$', highlightt),
    url(r'^addsimpler/(?P<qid>\w+)/$', addanswer),
    url(r'^quotes/(?P<author>\w+)/$', quotes),
) 
