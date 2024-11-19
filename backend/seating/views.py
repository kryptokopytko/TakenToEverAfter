from rest_framework import viewsets
from .models import Table, MergedTable, Seat, Couple
from .serializers import TableSerializer, MergedTableSerializer, SeatSerializer, CoupleSerializer

class TableView(viewsets.ModelViewSet):
    serializer_class = TableSerializer
    queryset = Table.objects.all()

class MergedTableView(viewsets.ModelViewSet):
    serializer_class = MergedTableSerializer
    queryset = MergedTable.objects.all()

class SeatView(viewsets.ModelViewSet):
    serializer_class = SeatSerializer
    queryset = Seat.objects.all()

class CoupleView(viewsets.ModelViewSet):
    serializer_class = CoupleSerializer
    queryset = Couple.objects.all()
