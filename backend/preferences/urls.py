from .views import ColorThemeView, ViewPreferencesView, get_user_preferences_and_themes, pick_theme, delete_color_theme, change_font_size
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()

router.register(r'color-themes', ColorThemeView)
router.register(r'view-preferences', ViewPreferencesView)

urlpatterns = router.urls
urlpatterns += [
    path('user-themes-and-preferences/', get_user_preferences_and_themes, name='user-themes-and-preferences'),
    path('pick-theme/<str:theme_key>/', pick_theme, name='pick-theme'),
    path('delete-theme/<str:theme_name>/', delete_color_theme, name='delete-color-theme'),
    path('change-font-size/', change_font_size, name='change-font-size'),

]
