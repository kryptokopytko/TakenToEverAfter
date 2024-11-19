from rest_framework import viewsets
from .models import Account, AccountDetails
from .serializers import AccountSerializer, AccountDetailsSerializer

class AccountView(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()

class AccountDetailsView(viewsets.ModelViewSet):
    serializer_class = AccountDetailsSerializer
    queryset = AccountDetails.objects.all()
