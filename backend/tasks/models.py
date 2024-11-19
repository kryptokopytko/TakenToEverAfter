from django.db import models
from accounts.models import Account

class ToDoListCategory(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    name = models.CharField(max_length=255)

class Task(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    category = models.ForeignKey(ToDoListCategory, on_delete=models.CASCADE, related_name='tasks')
    name = models.CharField(max_length=255)
    description = models.TextField(null=True)
    deadline = models.DateField(null=True)

class TaskAssignee(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    name = models.CharField(max_length=255)

class TaskAssignment(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE) 
    assignee = models.ForeignKey(TaskAssignee, on_delete=models.CASCADE, related_name='assignments')
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='assignments')
