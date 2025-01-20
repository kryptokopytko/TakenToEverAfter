from rest_framework import serializers
from .models import ExpenseCard, Expense, PotentialExpenseCard, PotentialExpense

class ExpenseSerializer(serializers.ModelSerializer):
    amount = serializers.IntegerField(source='price')
    description = serializers.CharField(source='notes')
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    # expenseCard = serializers.PrimaryKeyRelatedField(source='expense_card', read_only=True)
    expenseCard = serializers.PrimaryKeyRelatedField(source='expense_card', queryset=ExpenseCard.objects.all())

    class Meta:
        model = Expense
        fields = ('id', 'account', 'expenseCard', 'name', 'amount', 'description')

class ExpenseCardSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    category = serializers.CharField(source='name')
    expenses = ExpenseSerializer(many=True, read_only=True)
    
    class Meta:
        model = ExpenseCard
        fields = ('id', 'account', 'category', 'expenses')


class PotentialExpenseSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    amount = serializers.IntegerField(source='price')
    description = serializers.CharField(source='notes')
    pros = serializers.CharField()
    cons = serializers.CharField()

    class Meta:
        model = PotentialExpense
        fields = ('id', 'account', 'expense_card', 'name', 'amount', 'description', 'pros', 'cons')

class PotentialExpenseCardSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    category = serializers.CharField(source='name')
    options = ExpenseSerializer(many=True, read_only=True)

    class Meta:
        model = PotentialExpenseCard
        fields = ('id', 'account', 'category', 'options')

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