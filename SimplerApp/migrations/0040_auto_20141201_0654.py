# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('SimplerApp', '0039_auto_20141201_0650'),
    ]

    operations = [
        migrations.AlterField(
            model_name='highlight',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 54, 50, 686026)),
        ),
        migrations.AlterField(
            model_name='highlightq',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 54, 50, 686963)),
        ),
        migrations.AlterField(
            model_name='post',
            name='author',
            field=models.CharField(max_length=100000, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='context',
            field=models.CharField(max_length=1000000000, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 54, 50, 683864)),
        ),
        migrations.AlterField(
            model_name='post',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 54, 50, 683906)),
        ),
        migrations.AlterField(
            model_name='post',
            name='post',
            field=models.CharField(max_length=10000000, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='topic',
            field=models.CharField(default=b' ', max_length=100000, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='writer',
            field=models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True),
        ),
        migrations.AlterField(
            model_name='reqbyuser',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 54, 50, 689996)),
        ),
        migrations.AlterField(
            model_name='reqbyuser',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 54, 50, 690028)),
        ),
        migrations.AlterField(
            model_name='simpler',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 54, 50, 684975)),
        ),
        migrations.AlterField(
            model_name='simpler',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 54, 50, 685011)),
        ),
        migrations.AlterField(
            model_name='usernotification',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 54, 50, 689292)),
        ),
        migrations.AlterField(
            model_name='usernotification',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 54, 50, 689324)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 54, 50, 688365)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 54, 50, 688395)),
        ),
    ]
