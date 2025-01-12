from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from .models import User

@shared_task
def send_subscription_emails():
    subscribers = User.objects.filter(profile__subscribed=True)
    for user in subscribers:
        send_mail(
            subject="Ваша подписка",
            message="Это ваша регулярная рассылка.",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=False,
        )
