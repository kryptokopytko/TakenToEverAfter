from rest_framework import viewsets
from .models import BooleanQuestion, BooleanAnswer, StringQuestion, StringAnswer
from .serializers import BooleanQuestionSerializer, BooleanAnswerSerializer, StringQuestionSerializer, StringAnswerSerializer

class BooleanQuestionView(viewsets.ModelViewSet):
    serializer_class = BooleanQuestionSerializer
    queryset = BooleanQuestion.objects.all()

class BooleanAnswerView(viewsets.ModelViewSet):
    serializer_class = BooleanAnswerSerializer
    queryset = BooleanAnswer.objects.all()

class StringQuestionView(viewsets.ModelViewSet):
    serializer_class = StringQuestionSerializer
    queryset = StringQuestion.objects.all()

class StringAnswerView(viewsets.ModelViewSet):
    serializer_class = StringAnswerSerializer
    queryset = StringAnswer.objects.all()
