from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from accounts.views import get_account_from_session
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
    
@api_view(['GET'])
def get_user_tasks(request):
    account = get_account_from_session(request)
    categories = ToDoListCategory.objects.filter(account=account)

    task_cards = []
    for category in categories:
        tasks = Task.objects.filter(category=category)
        serialized_tasks = TaskSerializer(tasks, many=True).data
        category_data = ToDoListCategorySerializer(category).data
        category_data['tasks'] = serialized_tasks 

        task_cards.append(category_data)

    return Response({
        "taskCards": task_cards
    })
