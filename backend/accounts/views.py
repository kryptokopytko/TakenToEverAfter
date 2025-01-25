from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Account, AccountDetails
from .serializers import AccountSerializer, AccountDetailsSerializer
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import APIException
import json

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

def get_account_from_session(request):
    mail = request.session.get('mail')
    if not mail:
        raise APIException("User email not found in session")

    try:
        account = Account.objects.get(email=mail)
        return account
    except Account.DoesNotExist:
        raise APIException("Account not found")
    
class AccountModelViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        account = get_account_from_session(self.request)
        return self.queryset.filter(account=account)

    def perform_create(self, serializer):
        account = get_account_from_session(self.request)
        serializer.save(account=account)
        self.after_create(serializer.instance)

    def perform_update(self, serializer):
        instance = serializer.save()
        self.after_update(instance)

    def after_create(self, instance):
        pass

    def after_update(self, instance):
        pass

@api_view(['POST'])
def update_account_details(request):
    account = get_account_from_session(request)

    if not account:
        return Response({"error": "User account not found in session."}, status=400)

    data = json.loads(request.body)

    account_details, created = AccountDetails.objects.get_or_create(account=account)

    serializer = AccountDetailsSerializer(account_details, data=data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Account details have been updated."}, status=200)
    else:
        return Response(serializer.errors, status=400)
