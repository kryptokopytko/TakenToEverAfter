from rest_framework import viewsets
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
