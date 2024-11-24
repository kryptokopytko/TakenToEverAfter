from .views import GroupView, InvitationView, GuestView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'groups', GroupView)
router.register(r'invitations', InvitationView)
router.register(r'guests', GuestView)

urlpatterns = router.urls
