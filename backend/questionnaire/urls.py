from .views import BooleanQuestionView, BooleanAnswerView, StringAnswerView, StringQuestionView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'boolean-questions', BooleanQuestionView)
router.register(r'boolean-answers', BooleanAnswerView)
router.register(r'string-questions', StringQuestionView)
router.register(r'string-answers', StringAnswerView)

urlpatterns = router.urls
