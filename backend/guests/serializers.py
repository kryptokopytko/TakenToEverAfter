from rest_framework import serializers
from .models import Tag, Invitation, Guest

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'account', 'name', 'rank')


class InvitationSerializer(serializers.ModelSerializer):
    handedOut = serializers.CharField(source='handed_out')

    class Meta:
        model = Invitation
        fields = ('id', 'account', 'handedOut', 'guests')


class GuestSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)
    hasPlusOne = serializers.CharField(source='plus_one')

    class Meta:
        model = Guest
        fields = ('id', 'account', 'name', 'tags', 'invitation', 'decision', 'hasPlusOne')
