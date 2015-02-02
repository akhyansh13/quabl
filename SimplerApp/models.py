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
    post = models.CharField(max_length=10000000, default=' ')
    author = models.CharField(max_length=100000, default=' ')
    writer = models.ForeignKey(User, related_name="writer")
    topic = models.ForeignKey(topic, null=True, blank=True)
    explores = models.IntegerField(null = False, blank = False, default = 0)
    context = models.CharField(max_length=10000000000, null = False, blank=False, default=' ')
    created = models.DateTimeField(default=datetime.now())
    modified = models.DateTimeField(default=datetime.now())
    followers = models.ManyToManyField(User, null=True, blank=True)
    def __unicode__(self):
        post_less = show_less(self.post)
        return post_less

class Simpler(models.Model):
    post = models.ForeignKey(Post)
    parent_simpler = models.ForeignKey('self', related_name="parent", blank= True, null= True)
    question = models.IntegerField(null=False, blank=False, default=-1)
    answer = models.CharField(max_length=10000000)
    simpler_original = models.CharField(max_length=10000000, default=' ')
    coeficient = models.IntegerField(null = False, blank = False)
    parent_list = models.CharField(max_length=100000)
    author = models.CharField(max_length=100000)
    writer = models.ForeignKey(User, null=True, blank=True)
    display = models.CharField(max_length=1000, default=' ')
    created = models.DateTimeField(default=datetime.now())
    modified = models.DateTimeField(default=datetime.now())
    upvoters = models.ManyToManyField(User, related_name="aupvoted", null=True, blank=True)

    def __unicode__(self):
        simpler_less = show_less(self.answer)
        return simpler_less

class highlight(models.Model):
    highlight = models.CharField(max_length=100000000)
    highlight_parent = models.ForeignKey(Simpler, related_name=u'highlight_parent', blank=True, null=True)
    created = models.DateTimeField(default=datetime.now())
    def __unicode__(self):
        return self.highlight

class highlightq(models.Model):
    highlight = models.ForeignKey(highlight)
    question = models.CharField(max_length=10000000, blank=True, null=True)
    req_by = models.ForeignKey(User, null=True, blank=True)
    created = models.DateTimeField(default=datetime.now())
    upvoters = models.ManyToManyField(User, related_name="qupvoted", null=True, blank=True)
    def __unicode__(self):
        return self.question

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    full_name = models.CharField(max_length=1000000, default=' ')
    picture = models.ImageField(upload_to='profile_images', blank=True, null=True)
    shortbio = models.CharField(max_length=10000000, default="Don't know :(")
    created = models.DateTimeField(default=datetime.now())
    modified = models.DateTimeField(default=datetime.now())
    def __unicode__(self):
        return self.user.username

class UserNotification(models.Model):
    user = models.ForeignKey(User)
    notification = models.CharField(max_length=10000000)
    status = models.CharField(max_length=10)
    created = models.DateTimeField(default=datetime.now())
    modified = models.DateTimeField(default=datetime.now())
    def __unicode__(self):
        return str(self.user) + '-' + self.notification

class activity(models.Model):                                   #Model object for all quabl activity *for* a user. Not a particular user's activity.
    activity = models.CharField(max_length=10000000)

class Link(models.Model):

    atext = models.CharField(max_length = 100000000, blank=True, null=True)
    href = models.CharField(max_length = 100000000, blank=True, null=True)
    simpler = models.ForeignKey(Simpler, null=True, blank=True)
    post = models.ForeignKey(Post, null=True, blank = True)

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
    question = forms.CharField(max_length=10000000,widget=forms.Textarea(attrs={'class':'DescBox'}))
    class Meta:
        model = highlightq
        fields = ('question',)
