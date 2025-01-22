from rest_framework import serializers
from .models import Tag, Invitation, Guest
import random
import string

class TagSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    
    class Meta:
        model = Tag
        fields = ('id', 'account', 'name', 'rank')


class InvitationSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    handedOut = serializers.BooleanField(source='handed_out', required=False)
    confirmationUrl = serializers.CharField(source='confirmation_url', read_only=True)

    class Meta:
        model = Invitation
        fields = ('id', 'account', 'handedOut', 'confirmationUrl')

    def generate_unique_url():
        while True:
            random_string = ''.join(random.choices(string.ascii_letters + string.digits, k=25))
            if not Invitation.objects.filter(confirmation_url=random_string).exists():
                return random_string
            
    def create(self, validated_data):
        validated_data['confirmation_url'] = self.generate_unique_url()
        return super().create(validated_data)


class GuestSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)
    hasPlusOne = serializers.BooleanField(source='plus_one')
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    invitationId = serializers.PrimaryKeyRelatedField(queryset=Invitation.objects.all(), source='invitation')

    class Meta:
        model = Guest
        fields = ('id', 'account', 'name', 'tags', 'invitationId', 'decision', 'hasPlusOne')

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