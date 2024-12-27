from .views import TableView, MergedTableView, SeatView, CoupleView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'tables', TableView)
router.register(r'merged-tables', MergedTableView)
router.register(r'seats', SeatView)
router.register(r'couples', CoupleView)

urlpatterns = router.urls
