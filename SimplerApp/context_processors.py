#This file manages the global TEMPLATE_CONTEXT_PROCESSORS variables.

from models import UserNotification

def notifs_processor(request):
        unreadnotifs = UserNotification.objects.all().filter(user=request.user.username).filter(status='unread')
        readnotifs = UserNotification.objects.all().filter(user=request.user.username).filter(status='read')
        rreadnotifs = reversed(readnotifs)
        runreadnotifs = reversed(unreadnotifs)
        return {'readnotifs': rreadnotifs, 'unreadnotifs': runreadnotifs, 'unotifcount': unreadnotifs.count(), 'notifcount': unreadnotifs.count() + readnotifs.count()}
