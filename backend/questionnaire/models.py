from django.db import models
from accounts.models import Account
from guests.models import Guest

class BooleanQuestion(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    content = models.TextField()

class BooleanAnswer(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    boolean_question = models.ForeignKey(BooleanQuestion, on_delete=models.CASCADE, related_name='answers')
    guest = models.ForeignKey(Guest, on_delete=models.CASCADE, related_name='boolean_answers')
    answer = models.BooleanField()

class StringQuestion(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    content = models.TextField()

class StringAnswer(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    string_question = models.ForeignKey(StringQuestion, on_delete=models.CASCADE, related_name='answers')
    guest = models.ForeignKey(Guest, on_delete=models.CASCADE, related_name='string_answers')
    answer = models.TextField()
