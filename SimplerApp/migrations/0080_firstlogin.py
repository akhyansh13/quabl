# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('SimplerApp', '0079_auto_20150210_1530'),
    ]

    operations = [
        migrations.CreateModel(
            name='firstlogin',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('username', models.CharField(max_length=100000000, null=True, blank=True)),
                ('email', models.CharField(max_length=100000000, null=True, blank=True)),
                ('password', models.CharField(max_length=100000000, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
