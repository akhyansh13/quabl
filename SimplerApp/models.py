from django.db import models
from django import forms
from django.contrib.auth.models import User

class topic(models.Model):
    topic = models.CharField(max_length=1000000, default='Uncategorized')
    topic_description = models.CharField(max_length=10000000, null=True, blank=True)
    def __unicode__(self):
        return self.topic

class Post(models.Model):
    post = models.CharField(max_length=10000000)
    author = models.CharField(max_length=100000)
    topic = models.CharField(max_length=100000, default=' ')
    description = models.CharField(max_length=1000000000, null=True, blank=True)
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
    highlight_parent = models.ForeignKey(Simpler, related_name=u'highlight_parent', blank=True, null=True)
    highlight_simpler = models.ForeignKey(Simpler, blank=True, null=True)
    status = models.IntegerField(null=False)
    req_by = models.ForeignKey(User)
    description = models.CharField(max_length=10000000)
    def __unicode__(self):
        return self.highlight
    
class highlightq(models.Model):
    highlight = models.ForeignKey(highlight)
    question = models.CharField(max_length=10000000, blank=True, null=True)
    def __unicode__(self):
        return self.question

class Quote(models.Model):
    author = models.CharField(max_length=1000000)
    quote = models.CharField(max_length=10000000)
    def __unicode__(self):
        return self.quote + ' - ' + self.author 

class postBox(forms.ModelForm):
    post = forms.CharField(max_length=10000000,widget=forms.Textarea(attrs={'class': 'postbox'}))
    topic = forms.CharField(max_length=100000,widget=forms.Textarea(attrs={'class': 'topicbox'}))
    class Meta:
        model = Post
        fields = ('topic', 'post',)
    
class SimplerBox(forms.ModelForm):
    simpler = forms.CharField(max_length=10000000,widget=forms.Textarea(attrs={'rows': 8, 'cols': 80}))
    class Meta:
        model = Simpler
        fields = ('simpler',)
        
class UserProfile(models.Model):
    user = models.OneToOneField(User)
    picture = models.ImageField(upload_to='profile_images', blank=True)
    followed_posts = models.CharField(max_length=10000000, default='-1;-1')
    followed_simplers = models.CharField(max_length=10000000, default='-1;-1')
    def __unicode__(self):
        return self.user.username

class UserNotification(models.Model):
    user = models.CharField(max_length=1000000)
    notification = models.CharField(max_length=10000000)
    status = models.CharField(max_length=10)
    postid = models.IntegerField(null=False, default=-1)
    simplerid = models.IntegerField(null=False, default=-1)
    def __unicode__(self):
        return str(self.user) + '-' + self.notification

class ReqByUser(models.Model):
    user = models.ForeignKey(User)
    category = models.CharField(max_length=1000)
    description = models.CharField(max_length=1000)
    frequency = models.IntegerField(null=False, default=0)
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
        fields = ('picture',)

class HighlightDesc(forms.ModelForm):
    description = forms.CharField(max_length=10000000,widget=forms.Textarea(attrs={'class':'DescBox'}))
    class Meta:
        model = highlight
        fields = ('description',)

#Parse functions follow.

def show_less(string):
    str_arr = list(string)
    less_arr = []
    i=0
    VISIBLE = 0
    if len(str_arr)>100:
        VISIBLE = 100
    else:
        VISIBLE = len(str_arr)
    for c in str_arr:
        if i<VISIBLE:
            less_arr.append(c)
        else:
            break
        i += 1
    less_str = ''.join(less_arr)
    return less_str

    
    
