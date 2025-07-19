def get_assessor_invitation_html(
    invite_url: str,
    company: dict,
    assessor_name: str | None = None,
) -> str:
    """
    Build assessor invitation email HTML.

    Args:
        invite_url (str): The invitation link.
        company (dict): Dictionary with 'name', 'logo_url', 'size', 'turnover'.
        assessor_name (str | None): Optional name of assessor.

    Returns:
        str: HTML content.
    """
    greeting = f"Hello {assessor_name}," if assessor_name else "Hello,"
    company_name = company.get("name", "The Company")
    logo_url = company.get("logo_url", "")
    size = company.get("size", "N/A")
    turnover = company.get("turnover", "N/A")

    return f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You're Invited!</title>
    <style>
        body {{
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            color: #333333;
        }}
        .container {{
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }}
        .header {{
            text-align: center;
            padding: 30px 0 20px;
            border-bottom: 1px solid #eeeeee;
        }}
        .header img {{
            width: 80px;
            height: 80px;
            border-radius: 8px;
        }}
        .company-info {{
            background-color: #f8f9fa;
            padding: 15px;
            margin: 20px 0;
            border-left: 4px solid #007bff;
        }}
        .company-info h2 {{
            margin: 0;
            font-size: 20px;
            color: #007bff;
        }}
        .company-info p {{
            margin: 5px 0;
            font-size: 14px;
        }}
        .invite-button {{
            display: block;
            width: fit-content;
            margin: 30px auto;
            padding: 12px 25px;
            background-color: #007bff;
            color: white !important;
            font-size: 16px;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
        }}
        .footer {{
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
            font-size: 12px;
            color: #777777;
            text-align: center;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="{logo_url}" alt="{company_name} Logo">
            <h1>You're Invited to Join {company_name}</h1>
        </div>

        <div class="company-info">
            <h2>{company_name}</h2>
            <p><strong>Company Size:</strong> {size}</p>
            <p><strong>Turnover:</strong> {turnover}</p>
        </div>

        <p>{greeting}</p>

        <p>You have been invited to join <strong>{company_name}</strong> as an assessor. Click the button below to accept your invitation and set up your account:</p>

        <a href="{invite_url}" class="invite-button">Accept Invitation</a>

        <p>Best regards,<br>The Business Health Checker Team</p>

        <div class="footer">
            <p>&copy; 2025 Business Health Checker. All rights reserved.</p>
            <p>Need help? Just reply to this email.</p>
        </div>
    </div>
</body>
</html>"""
