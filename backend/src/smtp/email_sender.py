import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os

from src.smtp.html_builder import (
    get_verify_code_for_create_account_html,
    get_verify_code_for_reset_password_html,
    get_assessor_invitation_html
)
from src.config import settings


def get_smtp_credentials():
    return settings.EMAIL_ADDRESS, settings.APP_PASSWORD


def send_email_with_attachment(
    sender_email: str,
    sender_password: str,
    recipient_email: str,
    subject: str,
    body: str,
    html_body: str | None = None,
    attachment_path: str | None = None,
) -> None:
    """
    Sends an email with optional HTML body and attachment.
    """
    message = MIMEMultipart('alternative')
    message['From'] = sender_email
    message['To'] = recipient_email
    message['Subject'] = subject

    # Attach plain text body
    message.attach(MIMEText(body, 'plain'))

    # Attach HTML version
    if html_body:
        message.attach(MIMEText(html_body, 'html'))

    # Attach file if exists
    if attachment_path and os.path.exists(attachment_path):
        with open(attachment_path, "rb") as attachment:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header(
            'Content-Disposition',
            f'attachment; filename={os.path.basename(attachment_path)}',
        )
        message.attach(part)

    # Send email
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(message)


def send_verification_email_for_create_account(
    recipient_email: str,
    verification_code: int
) -> None:
    """
    Sends an account creation verification email with a numeric code.
    """
    sender_email, sender_password = get_smtp_credentials()
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


def send_verification_email_for_reset_password(
    recipient_email: str,
    verification_code: int
) -> None:
    """
    Sends a password reset verification email with a numeric code.
    """
    sender_email, sender_password = get_smtp_credentials()
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


def send_assessor_invitation_email(
    recipient_email: str,
    invite_url: str,
    company: dict,
    assessor_name: str | None = None
) -> None:
    """
    Sends an invitation email to an assessor from a company.
    """
    sender_email, sender_password = get_smtp_credentials()
    subject = f"You're Invited to Join {company.get('name', 'our platform')}"

    html_content = get_assessor_invitation_html(
        invite_url=invite_url,
        company=company,
        assessor_name=assessor_name
    )
    text_content = f"""
{f"Hello {assessor_name}," if assessor_name else "Hello,"}

You have been invited to join {company.get('name', 'Business Health Checker')} as an assessor.

Click the link below to accept the invitation:
{invite_url}

Best regards,
The Business Health Checker Team
"""

    send_email_with_attachment(
        sender_email=sender_email,
        sender_password=sender_password,
        recipient_email=recipient_email,
        subject=subject,
        body=text_content,
        html_body=html_content
    )
