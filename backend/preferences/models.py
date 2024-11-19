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

class ViewPreferences(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    main_photo = models.URLField(null=True)  
    language = models.CharField(
        max_length = 4,
        choices=[('pl', 'Polish'), ('eng', 'English')],
        default='eng'
    )
    color_theme = models.ForeignKey(ColorTheme, on_delete=models.SET_DEFAULT, default=0) # we need default color_theme
