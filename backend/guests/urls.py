from .views import TagView, InvitationView, GuestView
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()

router.register(r'tags', TagView)
router.register(r'invitations', InvitationView)
router.register(r'guests', GuestView)

urlpatterns = router.urls