from .views import ColorThemeView, ViewPreferencesView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'color-themes', ColorThemeView)
router.register(r'view-preferences', ViewPreferencesView)

urlpatterns = router.urls
