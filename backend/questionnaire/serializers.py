from rest_framework import serializers
from .models import BooleanQuestion, BooleanAnswer, StringQuestion, StringAnswer

class BooleanQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BooleanQuestion
        fields = ('id', 'account', 'content')


class BooleanAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = BooleanAnswer
        fields = ('id', 'account', 'boolean_question', 'guest', 'answer')


class StringQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StringQuestion
        fields = ('id', 'account', 'content')


class StringAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = StringAnswer
        fields = ('id', 'account', 'string_question', 'guest', 'answer')
