from accounts.views import AccountModelViewSet
from .models import Tag, Invitation, Guest, Couple
from .serializers import TagSerializer, InvitationSerializer, GuestSerializer, EmailGuestSerializer, EmailGuestSerializerPl, \
    CoupleSerializer
from emails.email_template import send_generic_email
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from questionnaire.models import Question
from questionnaire.serializers import QuestionSerializer

class TagView(AccountModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

class InvitationView(AccountModelViewSet):
    serializer_class = InvitationSerializer
    queryset = Invitation.objects.all()

class GuestView(AccountModelViewSet):
    serializer_class = GuestSerializer
    queryset = Guest.objects.all()

    def after_create(self, instance):
        send_generic_email(
            self.request,
            Guest,
            EmailGuestSerializer,
            EmailGuestSerializerPl,
            "Guest List",
            "Lista Gości"
        )

class CoupleView(AccountModelViewSet):
    serializer_class = CoupleSerializer
    queryset = Couple.objects.all()

class GetInvitationDetailsView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        confirmation_url = request.data.get('confirmationUrl')

        if not confirmation_url:
            return Response({"detail": "The 'confirmationUrl' parameter is required."}, status=400)

        try:
            invitation = Invitation.objects.get(confirmation_url=confirmation_url)
            guests = invitation.guests.all()
            account = invitation.account
            account_details = account.accountdetails
            questions = Question.objects.filter(account=account)

            guest_list_with_modified_plus_one = []

            for guest in guests:
                modified_has_plus_one = guest.plus_one and not Couple.objects.filter(Q(guest1=guest) | Q(guest2=guest)).exists()

                guest_list_with_modified_plus_one.append({
                    **GuestSerializer(guest).data,  
                    "hasPlusOne": modified_has_plus_one, 
                })

            invitation_data = {
                "invitationId": invitation.id,
                "brideName": invitation.account.bride_name,
                "groomName": invitation.account.groom_name,
                "date" : account_details.wedding_date,
                "mainText": account_details.invitation_main_text,
                "additionalText": account_details.invitation_additional_text,
                "guestText": account_details.invitation_guest_text,
            }

            return Response({
                "invitation": invitation_data,
                "guests": guest_list_with_modified_plus_one,
                "questions": QuestionSerializer(questions, many=True).data
            }, status=200)

        except ObjectDoesNotExist:
            return Response({"detail": f"The invitation with URL '{confirmation_url}' does not exist."}, status=404)
        except Exception as e:
            return Response({"detail": f"An error occurred: {str(e)}"}, status=500)
        
class SetGuestDecisionView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        guest_id = request.data.get('guestId')
        decision = request.data.get('decision')

        if not guest_id:
            return Response({"detail": "The 'guestId' parameter is required."}, status=400)

        if decision not in ['yes', 'no']:
            return Response({"detail": "The 'decision' parameter must be either 'yes' or 'no'."}, status=400)

        try:
            guest = Guest.objects.get(id=guest_id)
            guest.decision = decision
            guest.save()

            return Response({
                "message": f"Guest decision has been set to {decision}.",
            }, status=200)

        except Guest.DoesNotExist:
            return Response({"detail": f"The guest with ID '{guest_id}' does not exist in this invitation."}, status=404)
        except Exception as e:
            return Response({"detail": f"An error occurred: {str(e)}"}, status=500)


class UpdatePlusOneView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            guest_id = request.data.get("guestId")
            has_plus_one = request.data.get("hasPlusOne")
            partner_name = request.data.get("partnerName")

            guest = Guest.objects.get(id=guest_id)
            guest.plus_one = has_plus_one
            guest.save()

            partner_id = None

            if has_plus_one and partner_name:
                invitation = guest.invitation
                partner = Guest.objects.create(
                    name=partner_name,
                    invitation=invitation,
                    plus_one=False,
                    decision="yes",
                    account=guest.account
                )
                partner_id = partner.id

                Couple.objects.create(account=guest.account, guest1=guest, guest2=partner)

            return Response(
                {"guestId": guest.id, "partnerId": partner_id},
                status=200,
            )
        except Guest.DoesNotExist:
            return Response(
                {"detail": f"The guest with ID '{guest_id}' does not exist in this invitation."},
                status=404,
            )
        except Exception as e:
            return Response(
                {"detail": f"An error occurred: {str(e)}"},
                status=500,
            )
