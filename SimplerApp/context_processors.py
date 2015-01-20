#This file manages the global TEMPLATE_CONTEXT_PROCESSORS variables.

from models import UserNotification, UserProfile, User

def notifs_processor(request):
    if request.user.is_authenticated():
        unreadnotifs = UserNotification.objects.all().filter(user=request.user).filter(status='unread')
        readnotifs = UserNotification.objects.all().filter(user=request.user).filter(status='read')
        rreadnotifs = reversed(readnotifs)
        runreadnotifs = reversed(unreadnotifs)
        return {'readnotifs': rreadnotifs, 'unreadnotifs': runreadnotifs, 'unotifcount': unreadnotifs.count(), 'notifcount': unreadnotifs.count() + readnotifs.count()}
    else:
        return {'readnotifs': 'none', 'unreadnotifs': 'none', 'unotifcount': 'none', 'notifcount': 'none'}
