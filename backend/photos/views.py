from rest_framework import viewsets
from .models import AcceptedPhoto, ToAcceptPhoto
from .serializers import AcceptedPhotoSerializer, ToAcceptPhotoSerializer

class AcceptedPhotoView(viewsets.ModelViewSet):
    serializer_class = AcceptedPhotoSerializer
    queryset = AcceptedPhoto.objects.all()

class ToAcceptPhotoView(viewsets.ModelViewSet):
    serializer_class = ToAcceptPhotoSerializer
    queryset = ToAcceptPhoto.objects.all()
