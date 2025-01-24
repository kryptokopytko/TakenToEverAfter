from rest_framework import serializers
from .models import Table, MergedTable, Seat

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = (
            'id', 'account', 'name', 'description', 'shape',
            'position_x', 'position_y', 'seats_number', 'fixed'
        )


class MergedTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = MergedTable
        fields = ('id', 'account', 'primary_table', 'secondary_table')


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ('id', 'account', 'table', 'seat_number', 'guest')
