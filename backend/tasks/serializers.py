from rest_framework import serializers
from .models import ToDoListCategory, Task, TaskAssignee, TaskAssignment

class ToDoListCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoListCategory
        fields = ('id', 'account', 'name')


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'account', 'category', 'name', 'description', 'deadline', 'completed')


class TaskAssigneeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskAssignee
        fields = ('id', 'account', 'name')


class TaskAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskAssignment
        fields = ('id', 'account', 'assignee', 'task')
