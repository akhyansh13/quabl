# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('SimplerApp', '0048_auto_20141210_1512'),
    ]

    operations = [
        migrations.RenameField(
            model_name='simpler',
            old_name='simpler',
            new_name='answer',
        ),
        migrations.AddField(
            model_name='simpler',
            name='question',
            field=models.IntegerField(default=-1),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='highlight',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 33, 8, 19000)),
        ),
        migrations.AlterField(
            model_name='highlightq',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 33, 8, 19000)),
        ),
        migrations.AlterField(
            model_name='post',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 33, 8, 9000)),
        ),
        migrations.AlterField(
            model_name='post',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 33, 8, 9000)),
        ),
        migrations.AlterField(
            model_name='reqbyuser',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 33, 8, 19000)),
        ),
        migrations.AlterField(
            model_name='reqbyuser',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 33, 8, 19000)),
        ),
        migrations.AlterField(
            model_name='simpler',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 33, 8, 19000)),
        ),
        migrations.AlterField(
            model_name='simpler',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 33, 8, 19000)),
        ),
        migrations.AlterField(
            model_name='usernotification',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 33, 8, 19000)),
        ),
        migrations.AlterField(
            model_name='usernotification',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 33, 8, 19000)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 33, 8, 19000)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 10, 15, 33, 8, 19000)),
        ),
    ]
