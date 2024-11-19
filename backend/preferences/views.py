from rest_framework import viewsets
from .models import ColorTheme, ViewPreferences
from .serializers import ColorThemeSerializer, ViewPreferencesSerializer

class ColorThemeView(viewsets.ModelViewSet):
    serializer_class = ColorThemeSerializer
    queryset = ColorTheme.objects.all()

class ViewPreferencesView(viewsets.ModelViewSet):
    serializer_class = ViewPreferencesSerializer
    queryset = ViewPreferences.objects.all()
