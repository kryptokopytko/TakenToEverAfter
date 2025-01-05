import os
from openpyxl import Workbook
from django.conf import settings
from django.core.mail import EmailMessage

def send_excel_email(data, email_subject, email_body, recipient_list):
    wb = Workbook()
    ws = wb.active
    ws.title = "Data"

    if len(data) > 0:
        headers = list(data[0].keys())
        ws.append(headers)

        for row in data:
            ws.append(list(row.values()))  

    file_path = "tmp.xlsx"
    wb.save(file_path)

    try:
        email = EmailMessage(
            subject=email_subject,
            body=email_body,
            from_email=settings.EMAIL_HOST_USER,
            to=recipient_list,
        )

        email.attach_file(file_path)
        email.send()
        os.remove(file_path)

        return "Email sent successfully."
    except Exception as e:
        return f"Failed to send email: {e}"
