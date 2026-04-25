import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта архитектурного бюро на email."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    email = body.get("email", "").strip()
    message = body.get("message", "").strip()
    service = body.get("service", "Не указана").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}, ensure_ascii=False),
        }

    smtp_email = os.environ["SMTP_EMAIL"]
    smtp_password = os.environ["SMTP_PASSWORD"]

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка с сайта — {name}"
    msg["From"] = smtp_email
    msg["To"] = smtp_email

    html_body = f"""
    <html><body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
      <div style="background: #1a1a1a; color: white; padding: 24px; margin-bottom: 24px;">
        <h2 style="margin: 0; font-weight: 400; letter-spacing: 0.1em;">НОВАЯ ЗАЯВКА</h2>
        <p style="margin: 4px 0 0; opacity: 0.6; font-size: 13px;">Архитектурное бюро · Сайт</p>
      </div>
      <div style="padding: 0 24px 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #999; width: 140px;">Имя</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 500;">{name}</td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #999;">Телефон</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><a href="tel:{phone}" style="color: #1a1a1a;">{phone}</a></td></tr>
          {"<tr><td style='padding: 12px 0; border-bottom: 1px solid #eee; color: #999;'>Email</td><td style='padding: 12px 0; border-bottom: 1px solid #eee;'>" + email + "</td></tr>" if email else ""}
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #999;">Услуга</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee;">{service}</td></tr>
          {"<tr><td style='padding: 12px 0; color: #999; vertical-align: top;'>Сообщение</td><td style='padding: 12px 0;'>" + message + "</td></tr>" if message else ""}
        </table>
      </div>
    </body></html>
    """

    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(smtp_email, smtp_password)
        server.sendmail(smtp_email, smtp_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"success": True}, ensure_ascii=False),
    }
