from .views import ExpenseCardView, ExpenseView, PotentialExpenseCardView, PotentialExpenseView, get_user_expenses, add_expense, add_expense_category
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()

router.register(r'expense-cards', ExpenseCardView)
router.register(r'expenses', ExpenseView)
router.register(r'potential-expense-cards', PotentialExpenseCardView)
router.register(r'potential-expenses', PotentialExpenseView)

urlpatterns = router.urls
urlpatterns += [
    path('user-expenses/', get_user_expenses, name='user-expenses'),
    path('add-expense/', add_expense, name='add-expense'),
    path('add-expense-category/', add_expense_category, name='add-expense-category')
]