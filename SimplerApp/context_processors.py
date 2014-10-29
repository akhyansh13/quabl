#This file manages the global TEMPLATE_CONTEXT_PROCESSORS variables.

from models import UserNotification

def notifs_processor(request):
        notifs = UserNotification.objects.all().filter(user=request.user.username).filter(status='unread')
        return {'notifs': notifs, 'notifcount': notifs.count()}
