from .views import AccountView, AccountDetailsView, check_user_exists, get_user_by_email, update_account_details
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'accounts', AccountView, 'account')
router.register(r'account-details', AccountDetailsView)

urlpatterns = [
    path('', include(router.urls)),
    path('check-user-exists/', check_user_exists, name='check_user_exists'), 
    path('get-user-by-email/', get_user_by_email, name='get_user_by_email'),
    path('update-account-details/', update_account_details, name='update_account_details'),
]