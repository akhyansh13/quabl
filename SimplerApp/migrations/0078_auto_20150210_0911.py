# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('SimplerApp', '0077_auto_20150208_1048'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='activity',
            name='activity',
        ),
        migrations.AddField(
            model_name='activity',
            name='answer',
            field=models.ForeignKey(blank=True, to='SimplerApp.Simpler', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='activity',
            name='question',
            field=models.ForeignKey(blank=True, to='SimplerApp.highlightq', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='activity',
            name='user',
            field=models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
    ]
