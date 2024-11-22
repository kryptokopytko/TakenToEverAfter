"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from accounts.views import AccountView, AccountDetailsView
from expenses.views import ExpenseCardView, ExpenseView, PotentialExpenseCardView, PotentialExpenseView
from guests.views import GroupView, InvitationView, GuestView
from photos.views import AcceptedPhotoView, ToAcceptPhotoView
from preferences.views import ColorThemeView, ViewPreferencesView
from questionnaire.views import BooleanQuestionView, BooleanAnswerView, StringQuestionView, StringAnswerView
from seating.views import TableView, MergedTableView, SeatView, CoupleView
from tasks.views import ToDoListCategoryView, TaskView, TaskAssigneeView, TaskAssignmentView

router = routers.DefaultRouter()

router.register(r'accounts', AccountView, 'account')
router.register(r'account-details', AccountDetailsView)

router.register(r'expense-cards', ExpenseCardView)
router.register(r'expenses', ExpenseView)
router.register(r'potential-expense-cards', PotentialExpenseCardView)
router.register(r'potential-expenses', PotentialExpenseView)

router.register(r'groups', GroupView)
router.register(r'invitations', InvitationView)
router.register(r'guests', GuestView)

router.register(r'accepted-photos', AcceptedPhotoView)
router.register(r'to-accept-photos', ToAcceptPhotoView)

router.register(r'color-themes', ColorThemeView)
router.register(r'view-preferences', ViewPreferencesView)

router.register(r'boolean-questions', BooleanQuestionView)
router.register(r'boolean-answers', BooleanAnswerView)
router.register(r'string-questions', StringQuestionView)
router.register(r'string-answers', StringAnswerView)

router.register(r'tables', TableView)
router.register(r'merged-tables', MergedTableView)
router.register(r'seats', SeatView)
router.register(r'couples', CoupleView)

router.register(r'todo-list-categories', ToDoListCategoryView, basename='todo-list-category')
router.register(r'tasks', TaskView, basename='task')
router.register(r'task-assignees', TaskAssigneeView, basename='task-assignee')
router.register(r'task-assignments', TaskAssignmentView, basename='task-assignment')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
