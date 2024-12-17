from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import APIException
from accounts.models import Account
from .models import ExpenseCard, Expense, PotentialExpenseCard, PotentialExpense
from .serializers import ExpenseCardSerializer, ExpenseSerializer, PotentialExpenseCardSerializer, PotentialExpenseSerializer

class ExpenseCardView(viewsets.ModelViewSet):
    serializer_class = ExpenseCardSerializer
    queryset = ExpenseCard.objects.all()

class ExpenseView(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()

class PotentialExpenseCardView(viewsets.ModelViewSet):
    serializer_class = PotentialExpenseCardSerializer
    queryset = PotentialExpenseCard.objects.all()

class PotentialExpenseView(viewsets.ModelViewSet):
    serializer_class = PotentialExpenseSerializer
    queryset = PotentialExpense.objects.all()

@api_view(['GET'])
def get_user_expenses(request):
    mail = request.session.get('mail')
    if not mail:
        raise APIException("User email not found in session")

    try:
        account = Account.objects.get(email=mail)
    except Account.DoesNotExist:
        raise APIException("Account not found")

    expense_cards = ExpenseCard.objects.filter(account=account)
    expense_cards_data = []
    for expense_card in expense_cards:
        expenses = Expense.objects.filter(expense_card=expense_card)
        serialized_expenses = ExpenseSerializer(expenses, many=True).data
        card_data = ExpenseCardSerializer(expense_card).data
        card_data['expenses'] = serialized_expenses
        expense_cards_data.append(card_data)

    potential_expense_cards = PotentialExpenseCard.objects.filter(account=account)
    potential_expense_cards_data = []
    for potential_expense_card in potential_expense_cards:
        potential_expenses = PotentialExpense.objects.filter(expense_card=potential_expense_card)
        serialized_options = PotentialExpenseSerializer(potential_expenses, many=True).data
        choice_data = PotentialExpenseCardSerializer(potential_expense_card).data
        choice_data['options'] = serialized_options
        potential_expense_cards_data.append(choice_data)

    return Response({
        "expenseCards": expense_cards_data,
        "choices": potential_expense_cards_data
    })

