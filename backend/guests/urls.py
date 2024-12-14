from .views import TagView, InvitationView, GuestView, get_user_tags, get_user_guests, get_user_invitations
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()

router.register(r'groups', TagView)
router.register(r'invitations', InvitationView)
router.register(r'guests', GuestView)

urlpatterns = router.urls
urlpatterns += [
    path('user-tags/', get_user_tags, name='user-tags'),
    path('user-guests/', get_user_guests, name='user-guests'),
    path('user-invitations/', get_user_invitations, name='user-invitations')
]
