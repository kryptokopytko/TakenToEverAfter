from django.db import models
from accounts.models import Account

class Group(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    name = models.CharField(max_length=150) 
    rank = models.IntegerField(default=1)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['account', 'name'], name='unique_account_name')  
        ]

class Invitation(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    handed_out = models.BooleanField(default=False) 

class Guest(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    name = models.CharField(max_length=150)  
    group_numbers = models.JSONField()  # Lista numerów grupy (w przypadku liczby całkowitej)
    invitation = models.ForeignKey(Invitation, null=True, on_delete=models.SET_NULL, related_name="guests") 
    confirmation = models.CharField(
        max_length=8,
        choices=[
        ('yes', 'Yes'),
        ('no', 'No'),
        ('unknown', 'Unknown'),
        ],
        default='unknown'
    ) 
    plus_one = models.BooleanField(default=False) 
