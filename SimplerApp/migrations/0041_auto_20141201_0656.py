# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('SimplerApp', '0040_auto_20141201_0654'),
    ]

    operations = [
        migrations.AlterField(
            model_name='highlight',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 56, 10, 667183)),
        ),
        migrations.AlterField(
            model_name='highlightq',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 56, 10, 667965)),
        ),
        migrations.AlterField(
            model_name='post',
            name='author',
            field=models.CharField(default=b' ', max_length=100000),
        ),
        migrations.AlterField(
            model_name='post',
            name='context',
            field=models.CharField(default=b' ', max_length=1000000000, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 56, 10, 665502)),
        ),
        migrations.AlterField(
            model_name='post',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 56, 10, 665532)),
        ),
        migrations.AlterField(
            model_name='post',
            name='post',
            field=models.CharField(default=b' ', max_length=10000000),
        ),
        migrations.AlterField(
            model_name='post',
            name='topic',
            field=models.CharField(default=b' ', max_length=100000),
        ),
        migrations.AlterField(
            model_name='post',
            name='writer',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='reqbyuser',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 56, 10, 670551)),
        ),
        migrations.AlterField(
            model_name='reqbyuser',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 56, 10, 670577)),
        ),
        migrations.AlterField(
            model_name='simpler',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 56, 10, 666352)),
        ),
        migrations.AlterField(
            model_name='simpler',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 56, 10, 666376)),
        ),
        migrations.AlterField(
            model_name='usernotification',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 56, 10, 669908)),
        ),
        migrations.AlterField(
            model_name='usernotification',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 56, 10, 669935)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 56, 10, 669143)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 1, 6, 56, 10, 669170)),
        ),
    ]
