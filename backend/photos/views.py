from .models import AcceptedPhoto, ToAcceptPhoto
from .serializers import AcceptedPhotoSerializer, ToAcceptPhotoSerializer
from accounts.views import AccountModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError
from accounts.models import AccountDetails


class AcceptedPhotoView(AccountModelViewSet):
    serializer_class = AcceptedPhotoSerializer
    queryset = AcceptedPhoto.objects.all()

class ToAcceptPhotoView(AccountModelViewSet):
    serializer_class = ToAcceptPhotoSerializer
    queryset = ToAcceptPhoto.objects.all()

class AddPhotoToAcceptView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        image_data = request.data.get('photo')
        album_url = request.data.get('uniqueUrl') 

        if not image_data or not album_url:
            return Response({"detail": "The 'photo' and 'uniqueUrl' fields are required."}, status=400)

        try:
            account_details = AccountDetails.objects.get(photo_album_url=album_url)
            account = account_details.account
            
            photo_entry = ToAcceptPhoto.objects.create(
                account=account,
                link=image_data.get('link'),
                description=image_data.get('name', ''),
                uploader=image_data.get('author', ''),
                is_vertical=image_data.get('isVertical', False)
            )
            photo_data = ToAcceptPhotoSerializer(photo_entry).data

            return Response({
                "message": "Photo added successfully.",
                "photo": photo_data
            }, status=201)

        except AccountDetails.DoesNotExist:
            return Response({"detail": f"The album URL '{album_url}' does not exist."}, status=404)
        except Exception as e:
            return Response({"detail": f"An error occurred: {str(e)}"}, status=500)

       