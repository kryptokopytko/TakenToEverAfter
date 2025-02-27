from .models import Table, Seat
from .serializers import TableSerializer, SeatSerializer
from accounts.views import AccountModelViewSet
from rest_framework.response import Response
from accounts.views import get_account_from_session
from seating_algorithms.assign_guests import assign
from django.db import transaction
from guests.models import Guest, Tag
from rest_framework.decorators import api_view

class TableView(AccountModelViewSet):
    serializer_class = TableSerializer
    queryset = Table.objects.all()

class SeatView(AccountModelViewSet):
    serializer_class = SeatSerializer
    queryset = Seat.objects.all()

@api_view(['GET'])
def assign_guests_to_seats(request, fast_alg):
    account = get_account_from_session(request)

    if not account:
        return Response({"error": "User account not found in session."}, status=400)
    
    fast_algorithm = fast_alg.lower() == 'true'
    
    guests = Guest.objects.filter(account=account)
    guests_list = list(guests.values_list('id', flat=True))

    tags = Tag.objects.filter(account=account)

    tags_with_guests = {}
    weights = {}

    for tag in tags:
        tags_with_guests[tag.id] = list(tag.guests.values_list('id', flat=True))
        weights[tag.id] = tag.rank

    tables = Table.objects.filter(account=account)
    tables_list = []

    for table in tables:
        if table.shape == 'rectangular':
            seats_count = (table.width + table.length) * 2
        elif table.shape == 'circular':
            seats_count = table.width

        tables_list.append({
            "id": table.id,
            "seats": seats_count
        })

    seatings = assign(guests_list, tags_with_guests, weights, tables_list, fast_algorithm)
    
    Seat.objects.filter(account=account).delete()
    
    with transaction.atomic():
        for guest_id, table_id, seat_number in seatings:
            Seat.objects.update_or_create(
                account=account,
                table_id=table_id,
                seat_number=seat_number,
                defaults={'guest_id': guest_id}
            )


    return Response(seatings)

