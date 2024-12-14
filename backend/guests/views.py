from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import APIException
from accounts.models import Account
from .models import Tag, Invitation, Guest
from .serializers import TagSerializer, InvitationSerializer, GuestSerializer

class TagView(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

class InvitationView(viewsets.ModelViewSet):
    serializer_class = InvitationSerializer
    queryset = Invitation.objects.all()

class GuestView(viewsets.ModelViewSet):
    serializer_class = GuestSerializer
    queryset = Guest.objects.all()

@api_view(['GET'])
def get_user_guests(request):
    mail = request.session.get('mail')
    if not mail:
        raise APIException("User email not found in session")

    try:
        account = Account.objects.get(email=mail)
    except Account.DoesNotExist:
        raise APIException("Account not found")

    guests = Guest.objects.filter(account=account)
    serialized_guests = GuestSerializer(guests, many=True).data

    return Response({
        "guests": serialized_guests
    })

@api_view(['GET'])
def get_user_tags(request):
    mail = request.session.get('mail')
    if not mail:
        raise APIException("User email not found in session")

    try:
        account = Account.objects.get(email=mail)
    except Account.DoesNotExist:
        raise APIException("Account not found")

    tags = Tag.objects.filter(account=account)
    serialized_tags = TagSerializer(tags, many=True).data

    return Response({
        "tags": serialized_tags
    })

@api_view(['GET'])
def get_user_invitations(request):
    mail = request.session.get('mail')
    if not mail:
        raise APIException("User email not found in session")

    try:
        account = Account.objects.get(email=mail)
    except Account.DoesNotExist:
        raise APIException("Account not found")

    invitations = Invitation.objects.filter(account=account)
    serialized_invitations = InvitationSerializer(invitations, many=True).data

    return Response({
        "invitations": serialized_invitations
    })
