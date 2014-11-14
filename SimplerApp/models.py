from django.db import models
from django import forms
from django.contrib.auth.models import User
from datetime import datetime
from functions import show_less

class topic(models.Model):
    topic = models.CharField(max_length=1000000, default='Uncategorized')
    topic_description = models.CharField(max_length=10000000, null=True, blank=True)
    def __unicode__(self):
        return self.topic

class Post(models.Model):
    post = models.CharField(max_length=10000000)
    author = models.CharField(max_length=100000)
    writer = models.ForeignKey(User, blank=True, null=True)
    topic = models.CharField(max_length=100000, default=' ')
    description = models.CharField(max_length=1000000000, null=True, blank=True)
    created = models.DateTimeField(default=datetime.now())
    modified = models.DateTimeField(default=datetime.now())
    def __unicode__(self):
        post_less = show_less(self.post)
        return post_less   
    
class Simpler(models.Model):
    post = models.ForeignKey(Post)
    parent_simpler = models.ForeignKey('self', related_name="parent", blank= True, null= True)
    simpler = models.CharField(max_length=10000000)
    simpler_original = models.CharField(max_length=10000000, default=' ')
    coeficient = models.IntegerField(null = False, blank = False)
    parent_list = models.CharField(max_length=100000)
    author = models.CharField(max_length=100000)
    writer = models.ForeignKey(User, null=True, blank=True)
    display = models.CharField(max_length=1000, default=' ')
    created = models.DateTimeField(default=datetime.now())
    modified = models.DateTimeField(default=datetime.now())
    def __unicode__(self):
        simpler_less = show_less(self.simpler)
        return simpler_less

class highlight(models.Model):
    highlight = models.CharField(max_length=100000000)
    highlight_parent = models.ForeignKey(Simpler, related_name=u'highlight_parent', blank=True, null=True)
    highlight_simpler = models.ForeignKey(Simpler, blank=True, null=True)
    req_by = models.ForeignKey(User)
    description = models.CharField(max_length=10000000)
    created = models.DateTimeField(default=datetime.now())
    def __unicode__(self):
        return self.highlight
    
class highlightq(models.Model):
    highlight = models.ForeignKey(highlight)
    question = models.CharField(max_length=10000000, blank=True, null=True)
    created = models.DateTimeField(default=datetime.now())
    def __unicode__(self):
        return self.question   

class postBox(forms.ModelForm):
    post = forms.CharField(max_length=10000000,widget=forms.Textarea(attrs={'class': 'postbox'}))
    topic = forms.CharField(max_length=100000,widget=forms.Textarea(attrs={'class': 'topicbox'}))
    class Meta:
        model = Post
        fields = ('topic', 'post',)
        
class UserProfile(models.Model):
    user = models.OneToOneField(User)
    full_name = models.CharField(max_length=1000000, default=' ')
    picture = models.ImageField(upload_to='profile_images', blank=True)
    followed_posts = models.CharField(max_length=10000000, default='-1;-1')
    followed_simplers = models.CharField(max_length=10000000, default='-1;-1')
    shortbio = models.CharField(max_length=10000000, default="Don't know :(")
    created = models.DateTimeField(default=datetime.now())
    modified = models.DateTimeField(default=datetime.now())
    def __unicode__(self):
        return self.user.username

class UserNotification(models.Model):
    user = models.CharField(max_length=1000000)
    notification = models.CharField(max_length=10000000)
    status = models.CharField(max_length=10)
    postid = models.IntegerField(null=False, default=-1)
    simplerid = models.IntegerField(null=False, default=-1)
    created = models.DateTimeField(default=datetime.now())
    modified = models.DateTimeField(default=datetime.now())
    def __unicode__(self):
        return str(self.user) + '-' + self.notification

class ReqByUser(models.Model):

    user = models.ForeignKey(User)
    category = models.CharField(max_length=1000)
    description = models.CharField(max_length=1000)
    frequency = models.IntegerField(null=False, default=0)
    created = models.DateTimeField(default=datetime.now())
    modified = models.DateTimeField(default=datetime.now())

    def __unicode__(self):
        return self.category + ' by ' + str(self.user.username)
    
class UserForm(forms.ModelForm):

    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('full_name', 'shortbio', 'picture' )

class HighlightDesc(forms.ModelForm):
    description = forms.CharField(max_length=10000000,widget=forms.Textarea(attrs={'class':'DescBox'}))
    class Meta:
        model = highlight
        fields = ('description',)
