from django.db import models
from django import forms
from django.contrib.auth.models import User

class Post(models.Model):
    post = models.CharField(max_length=10000000)
    levels_simplified = models.IntegerField(null = True, blank = True, default = 0)
    author = models.CharField(max_length=100000)
    
class Simpler(models.Model):
    post = models.ForeignKey(Post)
    parent_simpler = models.ForeignKey('self', related_name="parent", blank= True, null= True)
    simpler = models.CharField(max_length=10000000)
    coeficient = models.IntegerField(null = False, blank = False)
    parent_list = models.CharField(max_length=100000)
    author = models.CharField(max_length=100000)

class simpler_request(models.Model):
    simpler = models.ForeignKey(Simpler)
    status = models.IntegerField(null=False)
    req_by = models.ForeignKey(User)
    
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

class simpler_request(models.Model):
    simpler = models.ForeignKey(Simpler)
    status = models.IntegerField(null=False)
    req_by = models.ForeignKey(User)
    
    