from django.db import models
from django import forms
from django.contrib.auth.models import User
from functions import show_less

class topic(models.Model):
    topic = models.CharField(max_length=1000000, default='Uncategorized')
    topic_description = models.CharField(max_length=10000000, null=True, blank=True)
    def __unicode__(self):
        return self.topic

class Post(models.Model):
    post = models.CharField(max_length=10000000)
    author = models.CharField(max_length=100000)
    topic = models.ForeignKey(topic, null=True, blank = True)
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
    display = models.CharField(max_length=1000, default=' ')
    def __unicode__(self):
        simpler_less = show_less(self.simpler)
        return simpler_less

class highlight(models.Model):
    highlight = models.CharField(max_length=100000000)
    simpler = models.ForeignKey(Simpler)
    status = models.IntegerField(null=False)
    req_by = models.ForeignKey(User)
    description = models.CharField(max_length=10000000)
    def __unicode__(self):
        return self.highlight
    
class highlightq(models.Model):
    highlight = models.ForeignKey(highlight)
    question = models.CharField(max_length=10000000, blank=True, null=True)

class postBox(forms.ModelForm):
    post = forms.CharField(max_length=10000000,widget=forms.Textarea(attrs={'rows': 8, 'cols': 80}))
    class Meta:
        model = Post
        fields = ('post',)
    
class SimplerBox(forms.ModelForm):
    simpler = forms.CharField(max_length=10000000,widget=forms.Textarea(attrs={'rows': 8, 'cols': 80}))
    class Meta:
        model = Simpler
        fields = ('simpler',)
        
class UserProfile(models.Model):
    user = models.OneToOneField(User)
    picture = models.ImageField(upload_to='profile_images', blank=True)
    def __unicode__(self):
        return self.user.username

class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('picture',)

class HighlightDesc(forms.ModelForm):
    description = forms.CharField(max_length=10000000,widget=forms.Textarea(attrs={'rows': 8, 'cols': 80}))
    class Meta:
        model = highlight
        fields = ('description',)

    
    