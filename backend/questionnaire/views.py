from .models import Question, Answer
from .serializers import QuestionSerializer, AnswerSerializer
from accounts.views import AccountModelViewSet

class QuestionView(AccountModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()

class AnswerView(AccountModelViewSet):
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()