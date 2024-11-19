from rest_framework import serializers
from .models import ColorTheme, ViewPreferences

class ColorThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColorTheme
        fields = ('id', 'account', 'name', 'primary', 'secondary', 'tertiary', 'light', 'dark', 'body')


class ViewPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewPreferences
        fields = ('id', 'account', 'main_photo', 'language', 'color_theme')
