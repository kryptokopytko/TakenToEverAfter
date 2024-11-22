from rest_framework import viewsets
from .serializers import (
    ToDoListCategorySerializer,
    TaskSerializer,
    TaskAssigneeSerializer,
    TaskAssignmentSerializer
)
from .models import ToDoListCategory, Task, TaskAssignee, TaskAssignment


class ToDoListCategoryView(viewsets.ModelViewSet):
    serializer_class = ToDoListCategorySerializer
    queryset = ToDoListCategory.objects.all()

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

class TaskAssigneeView(viewsets.ModelViewSet):
    serializer_class = TaskAssigneeSerializer
    queryset = TaskAssignee.objects.all()

class TaskAssignmentView(viewsets.ModelViewSet):
    serializer_class = TaskAssignmentSerializer
    queryset = TaskAssignment.objects.all()
    