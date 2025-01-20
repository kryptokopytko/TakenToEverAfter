from .views import ToDoListCategoryView, TaskView, TaskAssigneeView, TaskAssignmentView
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()

router.register(r'todo-list-categories', ToDoListCategoryView, basename='todo-list-category')
router.register(r'tasks', TaskView, basename='task')
router.register(r'task-assignees', TaskAssigneeView, basename='task-assignee')
router.register(r'task-assignments', TaskAssignmentView, basename='task-assignment')

urlpatterns = router.urls