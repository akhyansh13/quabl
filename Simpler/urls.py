from django.conf.urls import patterns, include, url
from SimplerApp.views import index, post, makesimpler, register, user_login, user_logout, requestsimpler, requests, deletesimpler
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
    url(r'^requestsimpler/$', requestsimpler),
    url(r'^requestsimpler/$', requestsimpler),
    url(r'^requests/$', requests),
    url(r'^deletesimpler/$', deletesimpler),
    ) 