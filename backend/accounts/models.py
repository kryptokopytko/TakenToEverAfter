from django.db import models

class Account(models.Model):
    groom_name = models.CharField(max_length=100)
    bride_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    mail_frequency = models.CharField(max_length=10, choices=[('high', 'High'), ('normal', 'Normal'), ('none', 'None')])

class AccountDetails(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    wedding_date = models.DateField(null=True)
    newlyweds_table_id = models.IntegerField(null=True, blank=True)
    budget_limit = models.IntegerField(null=True, blank=True)
    photo_album_url = models.CharField(max_length=100, unique=True)
    invitation_main_text = models.CharField(max_length=250, null=True, blank=True)
    invitation_additional_text = models.CharField(max_length=250, null=True, blank=True)
    invitation_guest_text = models.CharField(max_length=250, null=True, blank=True)
