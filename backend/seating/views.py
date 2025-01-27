from .models import Table, Seat
from .serializers import TableSerializer, SeatSerializer
from accounts.views import AccountModelViewSet
from rest_framework.response import Response
from accounts.views import get_account_from_session
from seating_algorithms import assign_guests
from django.db import transaction

class TableView(AccountModelViewSet):
    serializer_class = TableSerializer
    queryset = Table.objects.all()

class SeatView(AccountModelViewSet):
    serializer_class = SeatSerializer
    queryset = Seat.objects.all()

def assign_guests_to_seats(request):
    account = get_account_from_session(request)

    if not account:
        return Response({"error": "User account not found in session."}, status=400)
    
    guests = account.guests.all()
    guests_list = list(guests.values_list('id', flat=True))

    tags = account.tags.all()
    weights = list(tags.values_list('rank', flat=True))

    tags_with_guests = {}

    for tag in tags:
        tags_with_guests[tag.id] = list(tag.guests.values_list('id', flat=True))

    tables = account.tables.all()
    tables_list = []

    for table in tables:
        if table.shape == 'rectangular':
            seats_count = table.seats_number[0] * table.seats_number[1] if table.seats_number else 0
        elif table.shape == 'circular':
            seats_count = table.seats_number if table.seats_number else 0

        tables_list.append({
            "id": table.id,
            "seats": seats_count
        })

    seatings = assign_guests(guests_list, tags_with_guests, weights, tables_list)
    
    with transaction.atomic():
        for guest_id, table_id, seat_number in seatings:
            Seat.objects.create(
                account=account,
                table_id=table_id,
                seat_number=seat_number,
                guest_id=guest_id
            )


    return Response(seatings)

