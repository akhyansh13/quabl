# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import datetime


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('SimplerApp', '0062_auto_20150118_1837'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='followed_posts',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='followed_simplers',
        ),
        migrations.AddField(
            model_name='post',
            name='followers',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='highlight',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 18, 56, 18, 742861)),
        ),
        migrations.AlterField(
            model_name='highlightq',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 18, 56, 18, 743480)),
        ),
        migrations.AlterField(
            model_name='post',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 18, 56, 18, 739651)),
        ),
        migrations.AlterField(
            model_name='post',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 18, 56, 18, 739716)),
        ),
        migrations.AlterField(
            model_name='post',
            name='writer',
            field=models.ForeignKey(related_name=b'writer', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='reqbyuser',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 18, 56, 18, 745914)),
        ),
        migrations.AlterField(
            model_name='reqbyuser',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 18, 56, 18, 745945)),
        ),
        migrations.AlterField(
            model_name='simpler',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 18, 56, 18, 741981)),
        ),
        migrations.AlterField(
            model_name='simpler',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 18, 56, 18, 742015)),
        ),
        migrations.AlterField(
            model_name='usernotification',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 18, 56, 18, 745161)),
        ),
        migrations.AlterField(
            model_name='usernotification',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 18, 56, 18, 745191)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 18, 56, 18, 744166)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 18, 56, 18, 744195)),
        ),
    ]
