from rest_framework import serializers
from .models import Group, Invitation, Guest

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'account', 'name', 'rank')


class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = ('id', 'account', 'handed_out', 'guests')


class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = ('id', 'account', 'name', 'group_numbers', 'invitation', 'confirmation', 'plus_one')
