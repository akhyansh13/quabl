# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SimplerApp', '0080_firstlogin'),
    ]

    operations = [
        migrations.AddField(
            model_name='highlightq',
            name='assignment',
            field=models.CharField(max_length=20, null=True, blank=True),
            preserve_default=True,
        ),
    ]
