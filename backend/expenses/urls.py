from .views import ExpenseCardView, ExpenseView, PotentialExpenseCardView, PotentialExpenseView, get_user_expenses
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()

router.register(r'expense-cards', ExpenseCardView)
router.register(r'expenses', ExpenseView)
router.register(r'potential-expense-cards', PotentialExpenseCardView)
router.register(r'potential-expenses', PotentialExpenseView)

urlpatterns = router.urls
urlpatterns += [
    path('user-expenses/', get_user_expenses, name='user-expenses')
]