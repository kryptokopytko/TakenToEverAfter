from .views import ExpenseCardView, ExpenseView, PotentialExpenseCardView, PotentialExpenseView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'expense-cards', ExpenseCardView)
router.register(r'expenses', ExpenseView)
router.register(r'potential-expense-cards', PotentialExpenseCardView)
router.register(r'potential-expenses', PotentialExpenseView)

urlpatterns = router.urls
