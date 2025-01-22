from rest_framework.response import Response
from rest_framework.decorators import api_view
from accounts.models import Account
from django.core.exceptions import ObjectDoesNotExist
from accounts.serializers import AccountSerializer, AccountDetailsSerializer


@api_view(['POST'])
def login(request):
    mail = request.data.get("mail") 
    
    if not mail:
        return Response({"error": "Mail is required"}, status=400)

    _, created = Account.objects.get_or_create(email=mail) 

    request.session['mail'] = mail

    return Response({
        "message": "Logged in successfully",
        "mail": mail,
        "new_user": created
    })

@api_view(['GET'])
def logout(request):
    request.session.flush() 
    response = Response({"message": "Logged out successfully"})
    response.delete_cookie('sessionid') 
    return response

@api_view(['GET'])
def check_session(request):
    mail = request.session.get('mail')  
    if mail:
        try:
            account = Account.objects.get(email=mail)
            account_data = AccountSerializer(account).data
            account_details = account.accountdetails
            account_details_data = AccountDetailsSerializer(account_details).data
            return Response({
                "isAuthenticated": True,
                "account": account_data,
                "accountDetails": account_details_data
            })
        except ObjectDoesNotExist:
            return Response({
                "isAuthenticated": False,
                "error": "Account not found"
            })
    return Response({
        "isAuthenticated": False,
        "error": "No session found"
    })