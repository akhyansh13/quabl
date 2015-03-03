from django.conf.urls import patterns, include, url
from SimplerApp.views import index, csimpler, question, makesimpler, register, user_login, user_logout, addpost, define, getUserProfile, follow, addpostext, getthumburl, defined, indexalt, tour, sutton, suttonscroll, upvote, ucheck, lastseen, firstlogin, done, sutton1, sutton2, sutton1scroll, sutton2scroll, sysbio, feedback, enotification, addquabl
from django.contrib import admin
from django.conf import settings
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Simpler.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', tour),
    url(r'^cs670/$', index),
    url(r'^question/(?P<question_id>\w+)/$', question),
    url(r'^context/(?P<simpler_id>\w+)/$', csimpler),
    url(r'^follow/$', follow),
    url(r'^makesimpler/$', makesimpler),
    url(r'^register/$', register),
    url(r'^login/$', user_login),
    url(r'^logout/$', user_logout),
    url(r'^addpost/$', addpost),
    url(r'^define/(?P<post_id>\w+)/(?P<simpler_id>\w+)/$', define),
    url(r'^defined/(?P<h_id>\w+)/(?P<cques>[\w|\W]*)/$', defined),
    url(r'^userprof/(?P<user_id>\w+)/$', getUserProfile),
    url(r'^addpostext/$', addpostext),
    url(r'^thumb/(?P<username>\w+)/$', getthumburl),
    url(r'^indexcontext/$', indexalt),
    url(r'^sutton/$', sutton),
    url(r'^sutton/(?P<scrollto>\w+)/$', suttonscroll),
    url(r'^sutton1/$', sutton1),
    url(r'^sutton1/(?P<scrollto>\w+)/$', sutton1scroll),
    url(r'^sutton2/$', sutton2),
    url(r'^sutton2/(?P<scrollto>\w+)/$', sutton2scroll),
    url(r'^search/$', include('haystack.urls')),
    url(r'^upvote/(?P<type>\w+)/(?P<id>[\w|\W]*)/$', upvote),
    url(r'^ucheck/(?P<type>\w+)/(?P<id>[\w|\W]*)/$', ucheck),
    url(r'^lastseen/$', lastseen),
    url(r'^firstlogin/$', firstlogin),
    url(r'^done/$', done),
    url(r'^sysbio/$', sysbio),
    url(r'^feedback/(?P<fdback>\w+)/$', feedback),
    url(r'^enotif/(?P<enotif>\w+)/$', enotification),
    url(r'^addquabl/$', addquabl)
)

if settings.DEBUG:
    urlpatterns += patterns('',
        (r'^quablmedia/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT}))
