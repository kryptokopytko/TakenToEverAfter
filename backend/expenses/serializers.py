from rest_framework import serializers
from .models import ExpenseCard, Expense, PotentialExpenseCard, PotentialExpense

class ExpenseCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseCard
        fields = ('id', 'account', 'name')


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('id', 'account', 'expense_card', 'price', 'notes')


class PotentialExpenseCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = PotentialExpenseCard
        fields = ('id', 'account', 'name')


class PotentialExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PotentialExpense
        fields = ('id', 'account', 'expense_card', 'price', 'pros', 'cons', 'notes')
