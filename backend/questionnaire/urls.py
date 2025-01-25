from .views import QuestionView, AnswerView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'questions', QuestionView)
router.register(r'answers', AnswerView)

urlpatterns = router.urls
