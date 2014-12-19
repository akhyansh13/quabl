from django.conf.urls import patterns, include, url
from SimplerApp.views import index, csimpler, question, makesimpler, register, user_login, user_logout, addpost, define, addanswer, requestbyuser, getUserProfile, follow, addpostext
from django.contrib import admin
from django.conf import settings
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Simpler.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', index),
    url(r'^question/(?P<question_id>\w+)/$', question),
    url(r'^context/(?P<simpler_id>\w+)/$', csimpler),
    url(r'^follow/$', follow),
    url(r'^makesimpler/$', makesimpler),
    url(r'^register/$', register),
    url(r'^login/$', user_login),
    url(r'^logout/$', user_logout),
    url(r'^addpost/$', addpost),
    url(r'^define/(?P<post_id>\w+)/(?P<simpler_id>\w+)/ans/(?P<answer_part>[\w|\W]+)/quabl/(?P<quabl>[\w|\W]*)/$', define),
    url(r'^addsimpler/(?P<qid>\w+)/$', addanswer),
    url(r'^request/(?P<category>[\w|\W]+)/(?P<description>[\w|\W]+)/$', requestbyuser),
    url(r'^userprof/(?P<user_id>\w+)/$', getUserProfile),
    url(r'^addpostext/$', addpostext)
)

if settings.DEBUG:
    urlpatterns += patterns('',
        (r'^quablmedia/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT}))
