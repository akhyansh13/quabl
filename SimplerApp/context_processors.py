#This file manages the global TEMPLATE_CONTEXT_PROCESSORS variables.

from models import UserNotification

def notifs_processor(request):
        unreadnotifs = UserNotification.objects.all().filter(user=request.user.username).filter(status='unread')
        readnotifs = UserNotification.objects.all().filter(user=request.user.username).filter(status='read')
        return {'readnotifs': readnotifs, 'unreadnotifs': unreadnotifs, 'unotifcount': unreadnotifs.count(), 'notifcount': unreadnotifs.count() + readnotifs.count()}
