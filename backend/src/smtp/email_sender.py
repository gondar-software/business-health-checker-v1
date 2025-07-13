import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os

from src.smtp.html_builder import (
    get_verify_code_for_create_account_html,
    get_verify_code_for_reset_password_html
)
from src.config import settings

def send_email_with_attachment(sender_email, sender_password, recipient_email, 
                               subject, body, html_body=None, attachment_path=None):
    message = MIMEMultipart('alternative')
    message['From'] = sender_email
    message['To'] = recipient_email
    message['Subject'] = subject

    message.attach(MIMEText(body, 'plain'))

    if html_body:
        message.attach(MIMEText(html_body, 'html'))

    if attachment_path and os.path.exists(attachment_path):
        with open(attachment_path, "rb") as attachment:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header(
            'Content-Disposition',
            f'attachment; filename= {os.path.basename(attachment_path)}',
        )
        message.attach(part)

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(message)

def send_verification_email_for_create_account(recipient_email: str, verification_code: int):
    sender_email = settings.EMAIL_ADDRESS
    sender_password = settings.APP_PASSWORD
    subject = "Verify your email for Business Health Checker"

    html_content = get_verify_code_for_create_account_html(verification_code)
    text_content = f"""
Welcome to Business Health Checker!

Your verification code is: {verification_code}

This code will expire in 15 minutes.

If you didn't request this, you can safely ignore this email.
"""

    send_email_with_attachment(
        sender_email=sender_email,
        sender_password=sender_password,
        recipient_email=recipient_email,
        subject=subject,
        body=text_content,
        html_body=html_content
    )

def send_verification_email_for_reset_password(recipient_email: str, verification_code: int):
    sender_email = settings.EMAIL_ADDRESS
    sender_password = settings.APP_PASSWORD
    subject = "Password Reset Verification - Business Health Checker"

    html_content = get_verify_code_for_reset_password_html(verification_code)
    text_content = f"""
Password Reset Request - Business Health Checker

Your verification code is: {verification_code}

This code will expire in 15 minutes.

If you didn't request a password reset, please ignore this email or contact our support.

Security tips:
- Never share this code with anyone
- Use a strong and unique password
- Update your password regularly
"""

    send_email_with_attachment(
        sender_email=sender_email,
        sender_password=sender_password,
        recipient_email=recipient_email,
        subject=subject,
        body=text_content,
        html_body=html_content
    )
