from rest_framework import viewsets
from .models import Table, MergedTable, Seat
from .serializers import TableSerializer, MergedTableSerializer, SeatSerializer
from accounts.views import AccountModelViewSet

class TableView(AccountModelViewSet):
    serializer_class = TableSerializer
    queryset = Table.objects.all()

class MergedTableView(AccountModelViewSet):
    serializer_class = MergedTableSerializer
    queryset = MergedTable.objects.all()

class SeatView(AccountModelViewSet):
    serializer_class = SeatSerializer
    queryset = Seat.objects.all()