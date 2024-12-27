from .views import ColorThemeView, ViewPreferencesView, get_user_preferences_and_themes
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()

router.register(r'color-themes', ColorThemeView)
router.register(r'view-preferences', ViewPreferencesView)

urlpatterns = router.urls
urlpatterns += [
    path('user-themes-and-preferences/', get_user_preferences_and_themes, name='user-themes-and-preferences'),
]
