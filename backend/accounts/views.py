from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Account, AccountDetails
from .serializers import AccountSerializer, AccountDetailsSerializer


class AccountView(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()

class AccountDetailsView(viewsets.ModelViewSet):
    serializer_class = AccountDetailsSerializer
    queryset = AccountDetails.objects.all()

@api_view(['GET'])
def check_user_exists(request):
    email = request.query_params.get('email')
    if email and Account.objects.filter(email=email).exists():
        return Response({"exists": True}, status=200)
    return Response({"exists": False}, status=200)