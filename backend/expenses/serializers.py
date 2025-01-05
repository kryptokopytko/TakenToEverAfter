from rest_framework import serializers
from .models import ExpenseCard, Expense, PotentialExpenseCard, PotentialExpense

class ExpenseCardSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='name')

    class Meta:
        model = ExpenseCard
        fields = ('id', 'account', 'category')


class ExpenseSerializer(serializers.ModelSerializer):
    amount = serializers.IntegerField(source='price')
    description = serializers.CharField(source='notes')

    class Meta:
        model = Expense
        fields = ('id', 'account', 'expense_card', 'name', 'amount', 'description')


class PotentialExpenseCardSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='name')

    class Meta:
        model = PotentialExpenseCard
        fields = ('id', 'account', 'category')


class PotentialExpenseSerializer(serializers.ModelSerializer):
    amount = serializers.IntegerField(source='price')
    description = serializers.CharField(source='notes')
    pros = serializers.CharField()
    cons = serializers.CharField()

    class Meta:
        model = PotentialExpense
        fields = ('id', 'account', 'expense_card', 'name', 'amount', 'description', 'pros', 'cons')

class EmailExpenseSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='expense_card.name')
    amount = serializers.IntegerField(source='price')
    description = serializers.CharField(source='notes')
    pros = serializers.CharField()
    cons = serializers.CharField()

    class Meta:
        model = Expense
        fields = ('name', 'category', 'amount', 'description', 'pros', 'cons')

class EmailExpenseSerializerPl(serializers.ModelSerializer):
    kategoria = serializers.CharField(source='expense_card.name') 
    kwota = serializers.IntegerField(source='price')
    opis = serializers.CharField(source='notes') 
    zalety = serializers.CharField()
    wady = serializers.CharField()

    class Meta:
        model = Expense
        fields = ('name', 'kategoria', 'kwota', 'opis', 'zalety', 'wady') 