from .views import AcceptedPhotoView, ToAcceptPhotoView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'accepted-photos', AcceptedPhotoView)
router.register(r'to-accept-photos', ToAcceptPhotoView)

urlpatterns = router.urls
