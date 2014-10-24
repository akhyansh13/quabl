# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SimplerApp', '0005_auto_20141024_1819'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='followed_posts',
            field=models.CharField(default=b'-1;-1', max_length=10000000),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='followed_simplers',
            field=models.CharField(default=b'-1;-1', max_length=10000000),
        ),
    ]
