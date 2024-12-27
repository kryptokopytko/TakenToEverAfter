from django.db import models
from accounts.models import Account

class ColorTheme(models.Model):  
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    name = models.CharField(max_length=100)
    primary = models.CharField(max_length=7)
    secondary = models.CharField(max_length=7)
    tertiary = models.CharField(max_length=7)
    light = models.CharField(max_length=7)
    dark = models.CharField(max_length=7)
    body = models.CharField(max_length=7)
    hue = models.IntegerField()
    saturation = models.IntegerField()
    lightness = models.IntegerField()

class ViewPreferences(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    language = models.CharField(
        max_length = 8,
        choices=[('polish', 'polish'), ('english', 'english')],
        default='english'
    )
    color_theme = models.ForeignKey(ColorTheme, on_delete=models.SET_DEFAULT, default=None, null=True)
    font_size = models.IntegerField(default=16)
