from rest_framework import serializers
from .models import Table, Seat
from guests.serializers import GuestSerializer

class TableSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    seatsNumber = serializers.SerializerMethodField()
    x = serializers.IntegerField(source="position_x")
    y = serializers.IntegerField(source="position_y")

    class Meta:
        model = Table
        fields = (
            'id', 'account', 'name', 'shape',
            'x', 'y', 'seatsNumber'
        )

    def get_seatsNumber(self, obj):
        if obj.shape == 'circular':
            return obj.seats_number
        elif obj.shape == 'rectangular':
            return {
                "length": obj.seats_number.get("length"),
                "width": obj.seats_number.get("width")
            }
        return None

class SeatSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    table = TableSerializer(read_only=True)
    guest = GuestSerializer(read_only=True)
    seatNumer = serializers.IntegerField(source="seat_number")

    class Meta:
        model = Seat
        fields = ('id', 'account', 'table', 'seatNumber', 'guest')
