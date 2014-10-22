# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SimplerApp', '0002_reqbyuser_usernotification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usernotification',
            name='user',
            field=models.CharField(max_length=1000000),
        ),
    ]
