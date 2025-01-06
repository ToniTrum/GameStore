from django.db import models
from users.models import User

STATUS_CHOICES = (
    ("Отправлено", "Отправлено"),
    ("На рассмотрении", "На рассмотрении"),
    ("Принято", "Принято"),
    ("Отклонено", "Отклонено"),
)

class Feedback(models.Model):
    theme = models.CharField(max_length=128)
    text = models.TextField()
    status = models.CharField(max_length=32, choices=STATUS_CHOICES, default="Отправлено")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.theme

