from rest_framework import serializers
from .models import Question, Answer
from guests.models import Guest

class QuestionSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    options = serializers.ListField(
        child=serializers.CharField(),
        required=False,
        allow_null=True
    )

    class Meta:
        model = Question
        fields = ('id', 'account', 'text', 'type', 'options')

class AnswerSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())
    guest = serializers.PrimaryKeyRelatedField(queryset=Guest.objects.all())

    class Meta:
        model = Answer
        fields = ('id', 'account', 'question', 'guest', 'answer')