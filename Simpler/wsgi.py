activate_this = '/home/simpler/.virtualenvs/django16/bin/activate_this.py'
execfile(activate_this, dict(__file__=activate_this))

import os
import sys

# ADD YOUR PROJECT TO THE PYTHONPATH FOR THE PYTHON INSTANCE
path = '/home/simpler/simplifier/'

if path not in sys.path:
    sys.path.append(path)

os.chdir(path)

# TELL DJANGO WHERE YOUR SETTINGS MODULE IS LOCATED
os.environ['DJANGO_SETTINGS_MODULE'] = 'Simpler.settings'

# IMPORT THE DJANGO WSGI HANDLER TO TAKE CARE OF REQUESTS
from django.core.wsgi import get_wsgi_application
from dj_static import Cling, MediaCling

application = Cling(MediaCling(get_wsgi_application()))