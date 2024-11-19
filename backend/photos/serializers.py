from rest_framework import serializers
from .models import AcceptedPhoto, ToAcceptPhoto

class AcceptedPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcceptedPhoto
        fields = ('id', 'account', 'link', 'description', 'favourite', 'uploader')


class ToAcceptPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToAcceptPhoto
        fields = ('id', 'account', 'link', 'description', 'uploader')
