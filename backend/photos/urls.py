from .views import AcceptedPhotoView, ToAcceptPhotoView, AddPhotoToAcceptView
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()

router.register(r'accepted-photos', AcceptedPhotoView)
router.register(r'to-accept-photos', ToAcceptPhotoView)

urlpatterns = router.urls
urlpatterns += [
    path('add-photo-to-accept/', AddPhotoToAcceptView.as_view(), name='add-photo-to-accept'),
]