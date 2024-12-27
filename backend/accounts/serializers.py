from rest_framework import serializers
from .models import Account, AccountDetails

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

    class Meta:
        model = AccountDetails
        fields = ('id', 'account', 'weddingDate', 'newlywedsTableId', 'budgetLimit')
