# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='highlight',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('highlight', models.CharField(max_length=100000000)),
                ('status', models.IntegerField()),
                ('description', models.CharField(max_length=10000000)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='highlightq',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('question', models.CharField(max_length=10000000, null=True, blank=True)),
                ('highlight', models.ForeignKey(to='SimplerApp.highlight')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('post', models.CharField(max_length=10000000)),
                ('author', models.CharField(max_length=100000)),
                ('topic', models.CharField(default=b' ', max_length=100000)),
                ('description', models.CharField(max_length=1000000000, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Quote',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('author', models.CharField(max_length=1000000)),
                ('quote', models.CharField(max_length=10000000)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Simpler',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('simpler', models.CharField(max_length=10000000)),
                ('simpler_original', models.CharField(default=b' ', max_length=10000000)),
                ('coeficient', models.IntegerField()),
                ('parent_list', models.CharField(max_length=100000)),
                ('author', models.CharField(max_length=100000)),
                ('display', models.CharField(default=b' ', max_length=1000)),
                ('parent_simpler', models.ForeignKey(related_name=b'parent', blank=True, to='SimplerApp.Simpler', null=True)),
                ('post', models.ForeignKey(to='SimplerApp.Post')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='topic',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('topic', models.CharField(default=b'Uncategorized', max_length=1000000)),
                ('topic_description', models.CharField(max_length=10000000, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('picture', models.ImageField(upload_to=b'profile_images', blank=True)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='highlight',
            name='highlight_parent',
            field=models.ForeignKey(related_name='highlight_parent', blank=True, to='SimplerApp.Simpler', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='highlight',
            name='highlight_simpler',
            field=models.ForeignKey(blank=True, to='SimplerApp.Simpler', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='highlight',
            name='req_by',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
