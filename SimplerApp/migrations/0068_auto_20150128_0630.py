# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('SimplerApp', '0067_auto_20150122_0827'),
    ]

    operations = [
        migrations.CreateModel(
            name='activity',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('activity', models.CharField(max_length=10000000)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='reqbyuser',
            name='user',
        ),
        migrations.DeleteModel(
            name='ReqByUser',
        ),
        migrations.AlterField(
            model_name='highlight',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 28, 6, 30, 9, 720009)),
        ),
        migrations.AlterField(
            model_name='highlightq',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 28, 6, 30, 9, 720882)),
        ),
        migrations.AlterField(
            model_name='post',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 28, 6, 30, 9, 716973)),
        ),
        migrations.AlterField(
            model_name='post',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 28, 6, 30, 9, 717018)),
        ),
        migrations.AlterField(
            model_name='simpler',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 28, 6, 30, 9, 718957)),
        ),
        migrations.AlterField(
            model_name='simpler',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 28, 6, 30, 9, 718987)),
        ),
        migrations.AlterField(
            model_name='usernotification',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 28, 6, 30, 9, 722569)),
        ),
        migrations.AlterField(
            model_name='usernotification',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 28, 6, 30, 9, 722601)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 28, 6, 30, 9, 721680)),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2015, 1, 28, 6, 30, 9, 721717)),
        ),
    ]
