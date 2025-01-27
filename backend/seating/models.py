from django.db import models
from accounts.models import Account
from guests.models import Guest

class Table(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    name = models.CharField(max_length=255)
    shape = models.CharField(max_length=12, choices=[
        ('circular', 'Circular'),
        ('rectangular', 'Rectangular'),
    ])
    position_x = models.IntegerField()  
    position_y = models.IntegerField()  
    width = models.IntegerField()  
    length = models.IntegerField(null=True)  

class Seat(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    table = models.ForeignKey(Table, on_delete=models.CASCADE, related_name='seats')
    seat_number = models.IntegerField()  
    guest = models.OneToOneField(Guest, on_delete=models.CASCADE, related_name='seat')
