from .views import TableView, SeatView, assign_guests_to_seats
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()

router.register(r'tables', TableView)
router.register(r'seats', SeatView)

urlpatterns = router.urls
urlpatterns += [
    path('assign_guests/', assign_guests_to_seats, name='assign_guests'),
]
