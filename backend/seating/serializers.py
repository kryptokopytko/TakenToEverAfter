from rest_framework import serializers
from .models import Table, Seat
from guests.serializers import GuestSerializer

class TableSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    x = serializers.IntegerField(source="position_x")
    y = serializers.IntegerField(source="position_y")
    length = serializers.IntegerField(required=False)  

    class Meta:
        model = Table
        fields = (
            'id', 'account', 'name', 'shape',
            'x', 'y', 'width', 'length'
        )

class SeatSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    table = TableSerializer(read_only=True)
    guest = GuestSerializer(read_only=True)
    seatNumber = serializers.IntegerField(source="seat_number")

    class Meta:
        model = Seat
        fields = ('id', 'account', 'table', 'seatNumber', 'guest')
