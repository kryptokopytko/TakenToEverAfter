from rest_framework import serializers
from .models import ColorTheme, ViewPreferences

class ColorThemeSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(read_only=True) 

    class Meta:
        model = ColorTheme
        fields = ('id', 'account', 'name', 'primary', 'secondary', 'tertiary', 'light', 'dark', 'body', 
                  'hue', 'saturation', 'lightness')


class ViewPreferencesSerializer(serializers.ModelSerializer):
    colorTheme = ColorThemeSerializer(source='color_theme', allow_null=True)
    fontSize = serializers.CharField(source='font_size')
    account = serializers.PrimaryKeyRelatedField(read_only=True) 

    class Meta:
        model = ViewPreferences
        fields = ('id', 'account', 'language', 'colorTheme', 'fontSize')
