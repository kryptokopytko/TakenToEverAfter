from django.db import models
from accounts.models import Account
from guests.models import Guest

class Table(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    name = models.CharField(max_length=255)
    description = models.TextField(null=True) 
    shape = models.CharField(max_length=12, choices=[
        ('circular', 'Circular'),
        ('rectangular', 'Rectangular'),
    ])
    position_x = models.FloatField()  
    position_y = models.FloatField()  
    seats_number = models.JSONField() 
    fixed = models.BooleanField(default=False) 

class MergedTable(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    primary_table = models.ForeignKey(Table, on_delete=models.CASCADE, related_name='primary_table')
    secondary_table = models.ForeignKey(Table, on_delete=models.CASCADE, related_name='secondary_table')

class Seat(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    table = models.ForeignKey(Table, on_delete=models.CASCADE, related_name='seats')
    seat_number = models.IntegerField()  
    guest = models.OneToOneField(Guest, on_delete=models.CASCADE, related_name='seat')
