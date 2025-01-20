from rest_framework import serializers
from .models import AcceptedPhoto, ToAcceptPhoto

class AcceptedPhotoSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    isVertical = serializers.BooleanField(source='is_vertical')
    
    class Meta:
        model = AcceptedPhoto
        fields = ('id', 'account', 'link', 'description', 'favourite', 'uploader', 'isVertical')


class ToAcceptPhotoSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    isVertical = serializers.BooleanField(source='is_vertical')
    
    class Meta:
        model = ToAcceptPhoto
        fields = ('id', 'account', 'link', 'description', 'uploader', 'isVertical')
