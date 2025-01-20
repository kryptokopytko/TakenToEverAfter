from rest_framework import viewsets
from .models import BooleanQuestion, BooleanAnswer, StringQuestion, StringAnswer
from .serializers import BooleanQuestionSerializer, BooleanAnswerSerializer, StringQuestionSerializer, StringAnswerSerializer
from accounts.views import AccountModelViewSet

class BooleanQuestionView(AccountModelViewSet):
    serializer_class = BooleanQuestionSerializer
    queryset = BooleanQuestion.objects.all()

class BooleanAnswerView(AccountModelViewSet):
    serializer_class = BooleanAnswerSerializer
    queryset = BooleanAnswer.objects.all()

class StringQuestionView(AccountModelViewSet):
    serializer_class = StringQuestionSerializer
    queryset = StringQuestion.objects.all()

class StringAnswerView(AccountModelViewSet):
    serializer_class = StringAnswerSerializer
    queryset = StringAnswer.objects.all()
