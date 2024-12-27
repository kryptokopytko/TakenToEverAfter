from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import APIException
from accounts.views import get_account_from_session
from .models import ColorTheme, ViewPreferences
from .serializers import ColorThemeSerializer, ViewPreferencesSerializer

class ColorThemeView(viewsets.ModelViewSet):
    serializer_class = ColorThemeSerializer
    queryset = ColorTheme.objects.all()

class ViewPreferencesView(viewsets.ModelViewSet):
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

