from django.db import models

class Account(models.Model):
    groom_name = models.CharField(max_length=100)
    bride_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    mail_frequency = models.CharField(max_length=10, choices=[('high', 'High'), ('normal', 'Normal'), ('none', 'None')])

class AccountDetails(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    wedding_date = models.DateField(null=True)
    newlyweds_table_id = models.IntegerField(null=True)
    budget_limit = models.IntegerField(null=True)
