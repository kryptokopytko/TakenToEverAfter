from django.db import models
from accounts.models import Account

class AcceptedPhoto(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    link = models.URLField(max_length=200)  
    description = models.TextField(null=True)  
    favourite = models.BooleanField(default=False)  
    uploader = models.CharField(max_length=255, null=True)  

class ToAcceptPhoto(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    link = models.URLField(max_length=200)  
    description = models.TextField(null=True)  
    uploader = models.CharField(max_length=255, null=True)
