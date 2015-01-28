from django.db import models
from django.contrib import admin
from django.forms import TextInput, Textarea
from models import Post, Simpler, UserProfile, topic, highlight, highlightq, UserNotification, Link

class SimplerAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.CharField: {'widget': Textarea(attrs={'rows':'8', 'cols':'80'})},
    }

class PostAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.CharField: {'widget': Textarea(attrs={'rows':'8', 'cols':'80'})},
    }

admin.site.register(Post, PostAdmin)
admin.site.register(Simpler, SimplerAdmin)
admin.site.register(UserProfile)
admin.site.register(topic)
admin.site.register(highlight)
admin.site.register(highlightq)
admin.site.register(UserNotification)
admin.site.register(Link)
