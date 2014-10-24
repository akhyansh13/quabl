# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SimplerApp', '0006_auto_20141024_1839'),
    ]

    operations = [
        migrations.AddField(
            model_name='usernotification',
            name='postid',
            field=models.IntegerField(default=-1),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='usernotification',
            name='simplerid',
            field=models.IntegerField(default=-1),
            preserve_default=True,
        ),
    ]
