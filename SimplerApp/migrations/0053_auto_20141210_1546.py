# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('SimplerApp', '0052_auto_20141210_1535'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='highlight',
            name='highlight_simpler',
        ),
        migrations.AlterField(
            model_name='highlight',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 46, 59, 416000)),
        ),
        migrations.AlterField(
            model_name='highlightq',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 46, 59, 416000)),
        ),
        migrations.AlterField(
            model_name='post',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 46, 59, 416000)),
        ),
        migrations.AlterField(
            model_name='post',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 46, 59, 416000)),
        ),
        migrations.AlterField(
            model_name='reqbyuser',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 46, 59, 426000)),
        ),
        migrations.AlterField(
            model_name='reqbyuser',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 46, 59, 426000)),
        ),
        migrations.AlterField(
            model_name='simpler',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 46, 59, 416000)),
        ),
        migrations.AlterField(
            model_name='simpler',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 46, 59, 416000)),
        ),
        migrations.AlterField(
            model_name='usernotification',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 46, 59, 426000)),
        ),
        migrations.AlterField(
            model_name='usernotification',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 46, 59, 426000)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 46, 59, 426000)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 46, 59, 426000)),
        ),
    ]
