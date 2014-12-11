# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Simpler.rel_highlightq'
        db.add_column('SimplerApp_simpler', 'rel_highlightq',
                      self.gf('django.db.models.fields.related.ForeignKey')(to=orm['SimplerApp.highlightq'], null=True, blank=True),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Simpler.rel_highlightq'
        db.delete_column('SimplerApp_simpler', 'rel_highlightq_id')


    models = {
        'SimplerApp.highlight': {
            'Meta': {'object_name': 'highlight'},
            'description': ('django.db.models.fields.CharField', [], {'max_length': '10000000'}),
            'highlight': ('django.db.models.fields.CharField', [], {'max_length': '100000000'}),
            'highlight_parent': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "u'highlight_parent'", 'null': 'True', 'to': "orm['SimplerApp.Simpler']"}),
            'highlight_simpler': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['SimplerApp.Simpler']", 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'req_by': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']"}),
            'status': ('django.db.models.fields.IntegerField', [], {})
        },
        'SimplerApp.highlightq': {
            'Meta': {'object_name': 'highlightq'},
            'highlight': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['SimplerApp.highlight']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'question': ('django.db.models.fields.CharField', [], {'max_length': '10000000', 'null': 'True', 'blank': 'True'})
        },
        'SimplerApp.post': {
            'Meta': {'object_name': 'Post'},
            'author': ('django.db.models.fields.CharField', [], {'max_length': '100000'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '1000000000', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'post': ('django.db.models.fields.CharField', [], {'max_length': '10000000'}),
            'topic': ('django.db.models.fields.CharField', [], {'default': "' '", 'max_length': '100000'})
        },
        'SimplerApp.quote': {
            'Meta': {'object_name': 'Quote'},
            'author': ('django.db.models.fields.CharField', [], {'max_length': '1000000'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'quote': ('django.db.models.fields.CharField', [], {'max_length': '10000000'})
        },
        'SimplerApp.simpler': {
            'Meta': {'object_name': 'Simpler'},
            'author': ('django.db.models.fields.CharField', [], {'max_length': '100000'}),
            'coeficient': ('django.db.models.fields.IntegerField', [], {}),
            'display': ('django.db.models.fields.CharField', [], {'default': "' '", 'max_length': '1000'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'parent_list': ('django.db.models.fields.CharField', [], {'max_length': '100000'}),
            'parent_simpler': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'parent'", 'null': 'True', 'to': "orm['SimplerApp.Simpler']"}),
            'post': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['SimplerApp.Post']"}),
            'rel_highlightq': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['SimplerApp.highlightq']", 'null': 'True', 'blank': 'True'}),
            'simpler': ('django.db.models.fields.CharField', [], {'max_length': '10000000'}),
            'simpler_original': ('django.db.models.fields.CharField', [], {'default': "' '", 'max_length': '10000000'})
        },
        'SimplerApp.topic': {
            'Meta': {'object_name': 'topic'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'topic': ('django.db.models.fields.CharField', [], {'default': "'Uncategorized'", 'max_length': '1000000'}),
            'topic_description': ('django.db.models.fields.CharField', [], {'max_length': '10000000', 'null': 'True', 'blank': 'True'})
        },
        'SimplerApp.userprofile': {
            'Meta': {'object_name': 'UserProfile'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'picture': ('django.db.models.fields.files.ImageField', [], {'max_length': '100', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.OneToOneField', [], {'to': "orm['auth.User']", 'unique': 'True'})
        },
        'auth.group': {
            'Meta': {'object_name': 'Group'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        'auth.permission': {
            'Meta': {'ordering': "('content_type__app_label', 'content_type__model', 'codename')", 'unique_together': "(('content_type', 'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['SimplerApp']