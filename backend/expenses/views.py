from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from accounts.views import get_account_from_session
from .models import ExpenseCard, Expense, PotentialExpenseCard, PotentialExpense
from .serializers import ExpenseCardSerializer, ExpenseSerializer, PotentialExpenseCardSerializer, PotentialExpenseSerializer, \
    EmailExpenseSerializer, EmailExpenseSerializerPl
from emails.email_template import send_generic_email

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

@api_view(['POST'])
def add_expense(request):
    account = get_account_from_session(request)
    data = request.data
    data['account'] = account.id

    serializer = ExpenseSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        send_generic_email(request, Expense, EmailExpenseSerializer, EmailExpenseSerializerPl, "Expense List", "Lista Wydatków")
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

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

@api_view(['GET'])
def get_user_expenses(request):
    account = get_account_from_session(request)
    
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

