# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('SimplerApp', '0060_auto_20150114_0343'),
    ]

    operations = [
        migrations.AlterField(
            model_name='highlight',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 15, 52, 37, 339673)),
        ),
        migrations.AlterField(
            model_name='highlightq',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 15, 52, 37, 341600)),
        ),
        migrations.AlterField(
            model_name='post',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 15, 52, 37, 334266)),
        ),
        migrations.AlterField(
            model_name='post',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 15, 52, 37, 334339)),
        ),
        migrations.AlterField(
            model_name='reqbyuser',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 15, 52, 37, 348826)),
        ),
        migrations.AlterField(
            model_name='reqbyuser',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 15, 52, 37, 348905)),
        ),
        migrations.AlterField(
            model_name='simpler',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 15, 52, 37, 337185)),
        ),
        migrations.AlterField(
            model_name='simpler',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 15, 52, 37, 337264)),
        ),
        migrations.AlterField(
            model_name='usernotification',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 15, 52, 37, 345597)),
        ),
        migrations.AlterField(
            model_name='usernotification',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 15, 52, 37, 346059)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 15, 52, 37, 343384)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 18, 15, 52, 37, 343453)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='picture',
            field=models.ImageField(null=True, upload_to=b'profile_images', blank=True),
        ),
    ]
