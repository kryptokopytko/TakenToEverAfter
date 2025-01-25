from django.db import models
from accounts.models import Account
from guests.models import Guest

class Question(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    content = models.TextField()
    type = models.CharField(max_length=7, choices=[('choice', 'Choice'), ('yes/no', 'Yes/No')])
    options = models.JSONField(null=True, blank=True) 

class Answer(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    guest = models.ForeignKey(Guest, on_delete=models.CASCADE, related_name='answers')
    answer = models.TextField() 