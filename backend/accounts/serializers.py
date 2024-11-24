from rest_framework import serializers
from .models import Account, AccountDetails

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'groom_name', 'bride_name', 'email', 'mail_frequency')
    
class AccountDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountDetails
        fields = ('id', 'account', 'wedding_date', 'newlyweds_table_id', 'budget_limit')
