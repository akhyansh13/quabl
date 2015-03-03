import os, sys
sys.path.append('/home/ubuntu/public_html/quabl.com/')
sys.path.append('/home/ubuntu/public_html/quabl.com/Simpler')
os.environ['DJANGO_SETTINGS_MODULE'] = 'Simpler.settings'

from django.core.wsgi import get_wsgi_application
from dj_static import Cling, MediaCling

application = Cling(MediaCling(get_wsgi_application()))
