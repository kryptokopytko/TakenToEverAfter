from .views import TagView, InvitationView, GuestView, GetInvitationDetailsView, SetGuestDecisionView
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()

router.register(r'tags', TagView)
router.register(r'invitations', InvitationView)
router.register(r'guests', GuestView)

urlpatterns = router.urls
urlpatterns += [
    path('get-invitation-details-by-url/', GetInvitationDetailsView.as_view(), name='get_invitation_details_by_url'),
    path('set-guest-decision/', SetGuestDecisionView.as_view(), name='set_guest_decision'),
]