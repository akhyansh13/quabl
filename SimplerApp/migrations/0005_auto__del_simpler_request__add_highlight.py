# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'simpler_request'
        db.delete_table(u'SimplerApp_simpler_request')

        # Adding model 'highlight'
        db.create_table(u'SimplerApp_highlight', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('highlight', self.gf('django.db.models.fields.CharField')(max_length=100000000)),
            ('simpler', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['SimplerApp.Simpler'])),
            ('status', self.gf('django.db.models.fields.IntegerField')()),
            ('req_by', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('description', self.gf('django.db.models.fields.CharField')(max_length=10000000)),
        ))
        db.send_create_signal(u'SimplerApp', ['highlight'])


    def backwards(self, orm):
        # Adding model 'simpler_request'
        db.create_table(u'SimplerApp_simpler_request', (
            ('status', self.gf('django.db.models.fields.IntegerField')()),
            ('req_by', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('simpler', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['SimplerApp.Simpler'])),
        ))
        db.send_create_signal(u'SimplerApp', ['simpler_request'])

        # Deleting model 'highlight'
        db.delete_table(u'SimplerApp_highlight')


    models = {
        u'SimplerApp.highlight': {
            'Meta': {'object_name': 'highlight'},
            'description': ('django.db.models.fields.CharField', [], {'max_length': '10000000'}),
            'highlight': ('django.db.models.fields.CharField', [], {'max_length': '100000000'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'req_by': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"}),
            'simpler': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['SimplerApp.Simpler']"}),
            'status': ('django.db.models.fields.IntegerField', [], {})
        },
        u'SimplerApp.post': {
            'Meta': {'object_name': 'Post'},
            'author': ('django.db.models.fields.CharField', [], {'max_length': '100000'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'levels_simplified': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'}),
            'post': ('django.db.models.fields.CharField', [], {'max_length': '10000000'}),
            'topic': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['SimplerApp.topic']", 'null': 'True', 'blank': 'True'})
        },
        u'SimplerApp.simpler': {
            'Meta': {'object_name': 'Simpler'},
            'author': ('django.db.models.fields.CharField', [], {'max_length': '100000'}),
            'coeficient': ('django.db.models.fields.IntegerField', [], {}),
            'display': ('django.db.models.fields.CharField', [], {'default': "' '", 'max_length': '1000'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'parent_list': ('django.db.models.fields.CharField', [], {'max_length': '100000'}),
            'parent_simpler': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'parent'", 'null': 'True', 'to': u"orm['SimplerApp.Simpler']"}),
            'post': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['SimplerApp.Post']"}),
            'simpler': ('django.db.models.fields.CharField', [], {'max_length': '10000000'})
        },
        u'SimplerApp.topic': {
            'Meta': {'object_name': 'topic'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'topic': ('django.db.models.fields.CharField', [], {'default': "'Uncategorized'", 'max_length': '1000000'}),
            'topic_description': ('django.db.models.fields.CharField', [], {'max_length': '10000000', 'null': 'True', 'blank': 'True'})
        },
        u'SimplerApp.userprofile': {
            'Meta': {'object_name': 'UserProfile'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'picture': ('django.db.models.fields.files.ImageField', [], {'max_length': '100', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['auth.User']", 'unique': 'True'})
        },
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "u'user_set'", 'blank': 'True', 'to': u"orm['auth.Group']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "u'user_set'", 'blank': 'True', 'to': u"orm['auth.Permission']"}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['SimplerApp']