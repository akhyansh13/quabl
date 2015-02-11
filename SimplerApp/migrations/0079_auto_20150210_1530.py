# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SimplerApp', '0078_auto_20150210_0911'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='simpler',
            name='author',
        ),
        migrations.RemoveField(
            model_name='simpler',
            name='display',
        ),
        migrations.AddField(
            model_name='simpler',
            name='answerto',
            field=models.CharField(max_length=10000000, null=True, blank=True),
            preserve_default=True,
        ),
    ]
