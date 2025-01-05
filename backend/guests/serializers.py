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

class EmailTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name',)


class EmailGuestSerializer(serializers.ModelSerializer):
    tags = EmailTagSerializer(many=True)

    class Meta:
        model = Guest
        fields = ('name', 'tags', 'decision', 'plus_one')

DECISIONS_TO_PL = {
    'yes': 'Tak',
    'no': 'Nie',
    'unknown': 'Nieznane',
}

class EmailGuestSerializerPl(serializers.ModelSerializer):
    tagi = EmailTagSerializer(many=True)
    osoba_towarzysząca = serializers.CharField(source='plus_one')
    decyzja = serializers.SerializerMethodField()

    class Meta:
        model = Guest
        fields = ('imię', 'tagi', 'decyzja', 'osoba_towarzysząca') 

    def get_decyzja(self, obj):
        return DECISIONS_TO_PL.get(obj.decision, obj.decision)