# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SimplerApp', '0082_auto_20150219_1727'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='feedback',
            new_name='fback',
        ),
        migrations.RenameField(
            model_name='fback',
            old_name='feedback',
            new_name='fback',
        ),
    ]
