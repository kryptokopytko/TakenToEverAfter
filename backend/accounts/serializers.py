from rest_framework import serializers
from .models import Account, AccountDetails
import random
import string

class AccountSerializer(serializers.ModelSerializer):
    groomName = serializers.CharField(source='groom_name')
    brideName = serializers.CharField(source='bride_name')
    mailFrequency = serializers.CharField(source='mail_frequency')

    class Meta:
        model = Account
        fields = ('id', 'groomName', 'brideName', 'email', 'mailFrequency')
    
class AccountDetailsSerializer(serializers.ModelSerializer):
    weddingDate = serializers.DateField(source='wedding_date')
    newlywedsTableId = serializers.IntegerField(source='newlyweds_table_id', allow_null=True)
    budgetLimit = serializers.DecimalField(source='budget_limit', max_digits=10, decimal_places=2, allow_null=True)
    photoAlbumUrl = serializers.CharField(source='photo_album_url', read_only=True)
    invitationMainText = serializers.CharField(source='invitation_main_text', allow_null = True, required=False)
    invitationAdditionalText = serializers.CharField(source='invitation_additional_text', allow_null = True, required=False)
    invitationGuestText = serializers.CharField(source='invitation_guest_text', allow_null = True, required=False)

    class Meta:
        model = AccountDetails
        fields = ('id', 'account', 'weddingDate', 'newlywedsTableId', 'budgetLimit', 'photoAlbumUrl', 
            'invitationMainText', 'invitationAdditionalText', 'invitationGuestText'
        )
  
    def generate_unique_url(self):
        while True:
            random_string = ''.join(random.choices(string.ascii_letters + string.digits, k=16))
            if not AccountDetails.objects.filter(photo_album_url=random_string).exists():
                return random_string
            
    def create(self, validated_data):
        validated_data['photo_album_url'] = self.generate_unique_url()
        return super().create(validated_data)

