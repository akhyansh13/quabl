from django.conf.urls import patterns, include, url
from SimplerApp.views import index, post, makesimpler, register, user_login, user_logout, deletesimpler, addpost, define, highlight
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
    url(r'^makesimpler/$', makesimpler),
    url(r'^register/$', register),
    url(r'^login/$', user_login),
    url(r'^logout/$', user_logout),
    url(r'^deletesimpler/$', deletesimpler),
    url(r'^addpost/$', addpost),
    url(r'^define/(?P<post_id>\w+)/(?P<simpler_id>\w+)/(?P<highlight>[\w|\W]+)/$', define),
	url(r'^highlight/(?P<post_id>\w+)/(?P<simpler_id>\w+)/(?P<highlight>[\w|\W]+)/$', highlight),
) 