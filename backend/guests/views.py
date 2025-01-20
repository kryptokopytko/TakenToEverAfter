from accounts.views import AccountModelViewSet
from .models import Tag, Invitation, Guest
from .serializers import TagSerializer, InvitationSerializer, GuestSerializer, EmailGuestSerializer, EmailGuestSerializerPl
from emails.email_template import send_generic_email

class TagView(AccountModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

class InvitationView(AccountModelViewSet):
    serializer_class = InvitationSerializer
    queryset = Invitation.objects.all()

class GuestView(AccountModelViewSet):
    serializer_class = GuestSerializer
    queryset = Guest.objects.all()

    def after_create(self, instance):
        send_generic_email(
            self.request,
            Guest,
            EmailGuestSerializer,
            EmailGuestSerializerPl,
            "Guest List",
            "Lista Gości"
        )
