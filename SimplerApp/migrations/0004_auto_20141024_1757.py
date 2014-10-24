# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SimplerApp', '0003_auto_20141021_1620'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='followed_posts',
            field=models.CharField(default=b'', max_length=10000000),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='userprofile',
            name='followed_simplers',
            field=models.CharField(default=b'', max_length=10000000),
            preserve_default=True,
        ),
    ]
