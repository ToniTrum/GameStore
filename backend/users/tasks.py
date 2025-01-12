from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from .models import User
from games.models import Game
from library.models import Library

@shared_task
def send_subscription_emails():
    subscribers = User.objects.filter(profile__subscribed=True)
    for user in subscribers:
        library = Library.objects.filter(user=user).values_list('game_id', flat=True)
        game = Game.objects.exclude(id__in=library).order_by('?')[:1][0]

        subject = f"Новая игра - {game.name}"
        message = f"""
            Приветстуем, {user.username}!
            
            Сегодня рекомендуем Вам обратить внимание на новую игру:
            
            {game.name}
            {game.description}"""
        html_message = f"""
            <h1>Приветстуем, {user.username}!</h1>
            
            <h2>Сегодня рекомендуем Вам обратить внимание на новую игру:</h2>
            
            <h2>{game.name}</h2>
            <img src="{game.background_image}">
            {game.description}"""
        
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=False,
            html_message=html_message
        )
