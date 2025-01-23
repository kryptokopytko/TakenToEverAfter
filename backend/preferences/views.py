from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import APIException
from accounts.views import get_account_from_session
from .models import ColorTheme, ViewPreferences
from .serializers import ColorThemeSerializer, ViewPreferencesSerializer
from accounts.models import Account, AccountDetails
from accounts.views import AccountModelViewSet
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from guests.models import Invitation

class ColorThemeView(AccountModelViewSet):
    serializer_class = ColorThemeSerializer
    queryset = ColorTheme.objects.all()

class ViewPreferencesView(AccountModelViewSet):
    serializer_class = ViewPreferencesSerializer
    queryset = ViewPreferences.objects.all()

@api_view(['GET'])
def get_user_preferences_and_themes(request):
    account = get_account_from_session(request)

    try:
        preferences = ViewPreferences.objects.get(account=account)
    except ViewPreferences.DoesNotExist:
        raise APIException("View preferences not found for this account")

    themes = ColorTheme.objects.filter(account=account)

    return Response({
        "preferences": ViewPreferencesSerializer(preferences).data,
        "themes": ColorThemeSerializer(themes, many=True).data
    })

def is_user_language_english(request):
    mail = request.session.get('mail')
    if not mail:
        raise APIException("User email not found in session")
    try:
        account = Account.objects.get(email=mail)
        preferences = ViewPreferences.objects.get(account=account)
        return preferences.language == 'english'
    except (Account.DoesNotExist, ViewPreferences.DoesNotExist):
        raise APIException("Account or ViewPreferences not found")

@api_view(['DELETE'])
def delete_color_theme(request, theme_name):
    account = get_account_from_session(request)

    try:
        theme = ColorTheme.objects.get(account=account, name=theme_name)
        theme.delete()
    except ColorTheme.DoesNotExist:
        raise APIException("Theme not found for this account")

    return Response({
        "ok"
    })

@api_view(['POST'])
def pick_theme(request, theme_key):
    account = get_account_from_session(request)

    try:
        theme = ColorTheme.objects.get(account=account, name=theme_key)
    except ColorTheme.DoesNotExist:
        raise APIException("Theme not found for this account")

    preferences = ViewPreferences.objects.get(account=account)
    preferences.color_theme = theme
    preferences.save()

    return Response({
        "ok"
    })

@api_view(['POST'])
def change_font_size(request):
    account = get_account_from_session(request)
    new_font_size = request.data.get('fontSize', None)

    if new_font_size is None:
        raise APIException("fontSize is required.")

    preferences = ViewPreferences.objects.get(account=account)
    preferences.font_size = new_font_size
    preferences.save()

    serializer = ViewPreferencesSerializer(preferences)
    return Response(serializer.data)

class GetPreferencesByAlbumUrlView(APIView):
    permission_classes = [AllowAny] 

    def post(self, request, *args, **kwargs):
        photo_album_url = request.data.get('photoAlbumUrl')
        try:
            account_details = AccountDetails.objects.get(photo_album_url=photo_album_url)
            view_preferences = account_details.account.viewpreferences
            
            theme_data = ColorThemeSerializer(view_preferences.color_theme).data if view_preferences.color_theme else None
            
            return Response({
                "theme": theme_data,
                "language": view_preferences.language
            })
        
        except ObjectDoesNotExist:
            return Response({"detail": f"The album URL '{photo_album_url}' does not exist."}, status=404)
        
class GetPreferencesByInvitationUrlView(APIView):
    permission_classes = [AllowAny] 

    def post(self, request, *args, **kwargs):
        confirmation_url = request.data.get('confirmationUrl')
        try:
            account = Invitation.objects.get(confirmation_url=confirmation_url).account
            view_preferences = account.viewpreferences
            
            theme_data = ColorThemeSerializer(view_preferences.color_theme).data if view_preferences.color_theme else None
            
            return Response({
                "theme": theme_data,
                "language": view_preferences.language
            })
        
        except ObjectDoesNotExist:
            return Response({"detail": f"The confirmation URL '{confirmation_url}' does not exist."}, status=404)