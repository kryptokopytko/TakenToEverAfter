from rest_framework import serializers
from .models import ColorTheme, ViewPreferences

class ColorThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColorTheme
        fields = ('id', 'account', 'name', 'primary', 'secondary', 'tertiary', 'light', 'dark', 'body', 
                  'hue', 'saturation', 'lightness')


class ViewPreferencesSerializer(serializers.ModelSerializer):
    colorTheme = serializers.CharField(source='color_theme', allow_null=True)
    fontSize = serializers.CharField(source='font_size')

    class Meta:
        model = ViewPreferences
        fields = ('id', 'account', 'language', 'colorTheme', 'fontSize')
