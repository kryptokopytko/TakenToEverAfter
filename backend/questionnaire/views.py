from .models import Question, Answer
from .serializers import QuestionSerializer, AnswerSerializer
from accounts.views import AccountModelViewSet, get_account_from_session
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from guests.models import Guest

class QuestionView(AccountModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()

class AnswerView(AccountModelViewSet):
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()

@api_view(['POST'])
def update_questions(request):
    account = get_account_from_session(request)

    if not account:
        return Response({"error": "User account not found in session."}, status=400)

    try:
        questions_data = json.loads(request.body)

        serializer = QuestionSerializer(data=questions_data, many=True)
        if not serializer.is_valid():
            return Response({"error": "Invalid data", "details": serializer.errors}, status=400)

        Question.objects.filter(account=account).delete()
        for question_data in serializer.validated_data:
            Question.objects.create(account=account, **question_data)

        return Response({"message": "Questions have been updated successfully."}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

class SaveAnswerView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        question_id = request.data.get('questionId')
        guest_id = request.data.get('guestId')
        answer_text = request.data.get('answer')

        if not question_id or not guest_id or not answer_text:
            return Response(
                {"detail": "Missing required parameters."},
                status=400
            )

        try:
            question = Question.objects.get(id=question_id)
            guest = Guest.objects.get(id=guest_id)

            answer, created = Answer.objects.update_or_create(
                account=guest.account,
                question=question,
                guest=guest,
                defaults={'answer': answer_text}
            )

            serializer = AnswerSerializer(answer)

            return Response(serializer.data, status=200)

        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=500
            )