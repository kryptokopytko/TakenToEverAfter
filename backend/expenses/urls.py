from .views import ExpenseCardView, ExpenseView, PotentialExpenseCardView, PotentialExpenseView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'expense-cards', ExpenseCardView)
router.register(r'expenses', ExpenseView)
router.register(r'choice-cards', PotentialExpenseCardView)
router.register(r'choices', PotentialExpenseView)

urlpatterns = router.urls
