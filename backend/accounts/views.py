from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Account, AccountDetails
from .serializers import AccountSerializer, AccountDetailsSerializer
from django.shortcuts import get_object_or_404

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

@api_view(['GET'])
def get_user_by_email(request):
    email = request.GET.get('email')  
    if not email:
        return Response({'error': 'Email parameter is required'}, status=400)

    user = get_object_or_404(Account, email=email)
    return Response({
        'account_id': user.id,
        'groom_name': user.groom_name,
        'bride_name': user.bride_name,
        'email': user.email,
        'mail_frequency': user.mail_frequency,
    })