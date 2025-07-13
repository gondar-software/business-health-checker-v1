def get_verify_code_for_create_account_html(code: int) -> str:
    return f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verification</title>
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
        }}
        .verification-code {{
            background-color: #f8f9fa;
            border: 1px dashed #cccccc;
            padding: 15px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 2px;
            margin: 25px 0;
            color: #2c3e50;
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
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" alt="Business Health Icon">
            <h1>Welcome to Business Health Checker</h1>
        </div>

        <p>Hello,</p>

        <p>Thanks for registering with <strong>Business Health Checker</strong>! To complete your account setup, please enter the verification code below:</p>

        <div class="verification-code">
            {code}
        </div>

        <p>This code is valid for 15 minutes. If you didn't initiate this request, you can safely ignore this email.</p>

        <p>Best regards,<br>The Business Health Checker Team</p>

        <div class="footer">
            <p>&copy; 2025 Business Health Checker. All rights reserved.</p>
            <p>Need help? Just reply to this email.</p>
        </div>
    </div>
</body>
</html>"""

def get_verify_code_for_reset_password_html(code: int) -> str:
    return f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
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
        }}
        .verification-code {{
            background-color: #f8f9fa;
            border: 1px dashed #cccccc;
            padding: 15px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 2px;
            margin: 25px 0;
            color: #2c3e50;
        }}
        .footer {{
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
            font-size: 12px;
            color: #777777;
            text-align: center;
        }}
        .urgent {{
            color: #e74c3c;
            font-weight: bold;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png" alt="Password Reset Icon">
            <h1>Reset Your Password</h1>
        </div>

        <p>Hello,</p>

        <p>We received a request to reset your Business Health Checker password. Use the code below to continue:</p>

        <div class="verification-code">
            {code}
        </div>

        <p class="urgent">This code will expire in 15 minutes. If you didn't request a password reset, please ignore this email or contact support immediately.</p>

        <p>Security tips:</p>
        <ul>
            <li>Never share this code with anyone</li>
            <li>Use a strong and unique password</li>
            <li>Update your password regularly</li>
        </ul>

        <p>Best regards,<br>The Business Health Checker Team</p>

        <div class="footer">
            <p>&copy; 2025 Business Health Checker. All rights reserved.</p>
            <p>Need help? Just reply to this email.</p>
        </div>
    </div>
</body>
</html>"""
