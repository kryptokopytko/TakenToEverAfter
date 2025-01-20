from rest_framework import viewsets
from .models import AcceptedPhoto, ToAcceptPhoto
from .serializers import AcceptedPhotoSerializer, ToAcceptPhotoSerializer
from accounts.views import AccountModelViewSet


class AcceptedPhotoView(AccountModelViewSet):
    serializer_class = AcceptedPhotoSerializer
    queryset = AcceptedPhoto.objects.all()

class ToAcceptPhotoView(AccountModelViewSet):
    serializer_class = ToAcceptPhotoSerializer
    queryset = ToAcceptPhoto.objects.all()
