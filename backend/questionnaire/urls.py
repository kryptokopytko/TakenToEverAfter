from .views import QuestionView, AnswerView, update_questions, SaveAnswerView
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()

router.register(r'questions', QuestionView)
router.register(r'answers', AnswerView)

urlpatterns = router.urls

urlpatterns += [
    path('update-questions/', update_questions, name='update_questions'),
    path('save-answer/', SaveAnswerView.as_view(), name='save_answer'),
]