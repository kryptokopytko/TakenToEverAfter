from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .session import login, logout, check_session

router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/expenses/', include('expenses.urls')),
    path('api/guests/', include('guests.urls')),
    path('api/photos/', include('photos.urls')),
    path('api/preferences/', include('preferences.urls')),
    path('api/questionnaire/', include('questionnaire.urls')),
    path('api/seating/', include('seating.urls')),
    path('api/tasks/', include('tasks.urls')),
    path('api/login/', login, name='login'),
    path('api/logout/', logout, name='logout'),
    path('api/check-session/', check_session, name='check_session'), 
]
