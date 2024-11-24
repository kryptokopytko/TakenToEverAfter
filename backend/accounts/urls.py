from .views import AccountView, AccountDetailsView, check_user_exists
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'accounts', AccountView, 'account')
router.register(r'account-details', AccountDetailsView)

urlpatterns = [
    path('', include(router.urls)),
    path('check-user-exists/', check_user_exists, name='check_user_exists'), 
]