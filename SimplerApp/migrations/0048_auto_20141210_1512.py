# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import datetime


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('SimplerApp', '0047_auto_20141202_0715'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='highlight',
            name='req_by',
        ),
        migrations.AddField(
            model_name='highlightq',
            name='req_by',
            field=models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='highlight',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 11, 59, 566000)),
        ),
        migrations.AlterField(
            model_name='highlightq',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 11, 59, 566000)),
        ),
        migrations.AlterField(
            model_name='post',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 11, 59, 566000)),
        ),
        migrations.AlterField(
            model_name='post',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 11, 59, 566000)),
        ),
        migrations.AlterField(
            model_name='reqbyuser',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 11, 59, 566000)),
        ),
        migrations.AlterField(
            model_name='reqbyuser',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 11, 59, 566000)),
        ),
        migrations.AlterField(
            model_name='simpler',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 11, 59, 566000)),
        ),
        migrations.AlterField(
            model_name='simpler',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 11, 59, 566000)),
        ),
        migrations.AlterField(
            model_name='usernotification',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 11, 59, 566000)),
        ),
        migrations.AlterField(
            model_name='usernotification',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 11, 59, 566000)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 11, 59, 566000)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 11, 59, 566000)),
        ),
    ]
