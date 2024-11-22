from rest_framework import viewsets
from .models import Group, Invitation, Guest
from .serializers import GroupSerializer, InvitationSerializer, GuestSerializer

class GroupView(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()

class InvitationView(viewsets.ModelViewSet):
    serializer_class = InvitationSerializer
    queryset = Invitation.objects.all()

class GuestView(viewsets.ModelViewSet):
    serializer_class = GuestSerializer
    queryset = Guest.objects.all()
