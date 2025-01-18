from django.db import models
from accounts.models import Account

class ExpenseCard(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    name = models.CharField(max_length=255)

class Expense(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    expense_card = models.ForeignKey(ExpenseCard, on_delete=models.CASCADE, related_name='expenses')
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    notes = models.TextField(null=True, blank=True)

class PotentialExpenseCard(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    name = models.CharField(max_length=255)

class PotentialExpense(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    expense_card = models.ForeignKey(PotentialExpenseCard, on_delete=models.CASCADE, related_name='options')
    name = models.CharField(max_length=255)
    price = models.IntegerField(null=True)
    pros = models.TextField(null=True)
    cons = models.TextField(null=True)
    notes = models.TextField(null=True)
