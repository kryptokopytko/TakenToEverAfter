from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from accounts.views import get_account_from_session
from .models import ExpenseCard, Expense, PotentialExpenseCard, PotentialExpense
from .serializers import ExpenseCardSerializer, ExpenseSerializer, PotentialExpenseCardSerializer, PotentialExpenseSerializer, \
    EmailExpenseSerializer, EmailExpenseSerializerPl
from emails.email_template import send_generic_email
from accounts.views import AccountModelViewSet


class ExpenseCardView(AccountModelViewSet):
    serializer_class = ExpenseCardSerializer
    queryset = ExpenseCard.objects.all()

class ExpenseView(AccountModelViewSet):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()

    def after_create(self, instance):
        send_generic_email(
            self.request,
            Expense,
            EmailExpenseSerializer,
            EmailExpenseSerializerPl,
            "Expense List", 
            "Lista Wydatków"
        )

class PotentialExpenseCardView(AccountModelViewSet):
    serializer_class = PotentialExpenseCardSerializer
    queryset = PotentialExpenseCard.objects.all()

class PotentialExpenseView(AccountModelViewSet):
    serializer_class = PotentialExpenseSerializer
    queryset = PotentialExpense.objects.all()

@api_view(['POST'])
def add_expense_category(request):
    account = get_account_from_session(request)
    data = request.data
    data['account'] = account.id  

    serializer = ExpenseCardSerializer(data=data)
    if serializer.is_valid():
        expense_card = serializer.save() 
        return Response({"id": expense_card.id}, status=201) 
    return Response(serializer.errors, status=400)
