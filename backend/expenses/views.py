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
