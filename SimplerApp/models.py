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
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now_add=True)
    followers = models.ManyToManyField(User, null=True, blank=True)
    def __unicode__(self):
        post_less = show_less(self.post)
        return post_less

class Simpler(models.Model):
    post = models.ForeignKey(Post)
    parent_simpler = models.ForeignKey('self', related_name="parent", blank= True, null= True)
    question = models.IntegerField(null=False, blank=False, default=-1)
    answerto = models.CharField(max_length=10000000, null=True, blank=True)
    answer = models.CharField(max_length=10000000)
    simpler_original = models.CharField(max_length=10000000, default=' ')
    coeficient = models.IntegerField(null = False, blank = False)
    parent_list = models.CharField(max_length=100000)
    writer = models.ForeignKey(User, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now_add=True)
    upvoters = models.ManyToManyField(User, related_name="aupvoted", null=True, blank=True)

    def __unicode__(self):
        simpler_less = show_less(self.answer)
        return simpler_less

class highlight(models.Model):
    highlight = models.CharField(max_length=100000000)
    highlight_parent = models.ForeignKey(Simpler, related_name=u'highlight_parent', blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    def __unicode__(self):
        return self.highlight

class highlightq(models.Model):
    highlight = models.ForeignKey(highlight)
    question = models.CharField(max_length=10000000, blank=True, null=True)
    req_by = models.ForeignKey(User, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    upvoters = models.ManyToManyField(User, related_name="qupvoted", null=True, blank=True)
    assignment = models.CharField(max_length=20, null=True, blank=True)
    def __unicode__(self):
        return self.question

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    full_name = models.CharField(max_length=1000000, default=' ')
    picture = models.ImageField(upload_to='profile_images', blank=True, null=True)
    shortbio = models.CharField(max_length=10000000, default="Don't know :(")
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now_add=True)
    last_seen = models.DateTimeField(auto_now_add=True)
    def __unicode__(self):
        return self.user.username

class UserNotification(models.Model):
    user = models.ForeignKey(User)
    notification = models.CharField(max_length=10000000)
    status = models.CharField(max_length=10)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now_add=True)
    def __unicode__(self):
        return str(self.user) + '-' + self.notification

class activity(models.Model):                                   #The user field contains the user who acted.
    user = models.ForeignKey(User, null=True, blank=True)
    question = models.ForeignKey(highlightq, null=True, blank=True)
    answer = models.ForeignKey(Simpler, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

class Link(models.Model):

    atext = models.CharField(max_length = 100000000, blank=True, null=True)
    href = models.CharField(max_length = 100000000, blank=True, null=True)
    simpler = models.ForeignKey(Simpler, null=True, blank=True)
    post = models.ForeignKey(Post, null=True, blank = True)

class firstlogin(models.Model):
    username = models.CharField(max_length = 100000000, blank=True, null=True)
    email = models.CharField(max_length = 100000000, blank=True, null=True)
    password = models.CharField(max_length = 100000000, blank=True, null=True)


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

class firstloginform(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())
    username = forms.CharField(max_length = 100000000, widget=forms.Textarea(attrs={'placeholder':'NEW USERNAME', 'rows':'2', 'columns':'40', 'class':'ufield'}))
    email = forms.CharField(max_length = 100000000, widget=forms.Textarea(attrs={'placeholder':'EMAIL ADDRESS', 'rows': '2', 'columns':'40', 'class':'efield'}))

    class Meta:
        model = firstlogin
        fields = ('email', 'username', 'password')
