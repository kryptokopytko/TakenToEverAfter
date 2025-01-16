from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from accounts.views import get_account_from_session, AccountModelViewSet
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

@api_view(['GET'])
def get_user_guests(request):
    account = get_account_from_session(request)
    guests = Guest.objects.filter(account=account)
    serialized_guests = GuestSerializer(guests, many=True).data

    return Response({
        "guests": serialized_guests
    })

@api_view(['GET'])
def get_user_tags(request):
    account = get_account_from_session(request)
    tags = Tag.objects.filter(account=account)
    serialized_tags = TagSerializer(tags, many=True).data

    return Response({
        "tags": serialized_tags
    })

@api_view(['GET'])
def get_user_invitations(request):
    account = get_account_from_session(request)
    invitations = Invitation.objects.filter(account=account)
    serialized_invitations = InvitationSerializer(invitations, many=True).data

    return Response({
        "invitations": serialized_invitations
    })

