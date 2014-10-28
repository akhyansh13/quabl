# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('SimplerApp', '0008_reqbyuser_frequency'),
    ]

    operations = [
        migrations.AddField(
            model_name='highlight',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 10, 28, 20, 36, 11, 948000), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='highlightq',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 10, 28, 20, 36, 16, 788000), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='post',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 10, 28, 20, 36, 20, 869000)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='post',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 10, 28, 20, 36, 24, 289000)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reqbyuser',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 10, 28, 20, 36, 27, 621000), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reqbyuser',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 10, 28, 20, 36, 30, 303000), auto_now=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='simpler',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 10, 28, 20, 36, 37, 413000), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='simpler',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 10, 28, 20, 36, 45, 754000), auto_now=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usernotification',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 10, 28, 20, 36, 50, 85000), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usernotification',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 10, 28, 20, 36, 52, 905000), auto_now=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userprofile',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 10, 28, 20, 36, 55, 846000), auto_now_add=True),
            preserve_default=False,
        ),
    ]
