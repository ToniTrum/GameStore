from django.db import models
from users.models import User

STATUS_CHOICES = (
    ("sended", "Отправлено"),
    ("under consideration", "На рассмотрении"),
    ("accepted", "Принято"),
    ("rejected", "Отклонено"),
)


class Feedback(models.Model):
    theme = models.CharField(max_length=128)
    text = models.TextField()
    status = models.CharField(max_length=32, choices=STATUS_CHOICES, default="sended")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.theme

