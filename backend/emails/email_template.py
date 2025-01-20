from .mail_sender import send_excel_email
from django.http import HttpResponse
from accounts.views import get_account_from_session
from preferences.views import is_user_language_english

def send_generic_email(request, model, serializer_eng, serializer_pl, email_subject_eng, email_subject_pl):
    try:
        account = get_account_from_session(request)
        if (account.mail_frequency == "None"):
            return HttpResponse("Sending emails for this account is disabled.")

        is_english = is_user_language_english(request)

        objects = model.objects.filter(account = account)
        if (account.mail_frequency == "Normal" and len(objects) % 5 != 0):
            return HttpResponse("Mail frequency is not set to frequent, so emails are not being sent.")

        serializer = serializer_eng(objects, many=True) if is_english else serializer_pl(objects, many=True)
        
        data = serializer.data
        email_subject = email_subject_eng if is_english else email_subject_pl
        email_body = ""
        recipient = account.email

        send_excel_email(data, email_subject, email_body, [recipient])
        return HttpResponse("Email sent successfully!")
    except Exception as e:
        return HttpResponse(f"Failed to send email: {e}")