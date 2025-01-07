from django.db import models
import os
from django.db.models.signals import pre_delete
from django.dispatch import receiver

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
    file = models.FileField(upload_to='static/files', null=True, blank=True)
    status = models.CharField(max_length=32, choices=STATUS_CHOICES, default="Отправлено")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.theme
    
@receiver(pre_delete, sender=Feedback)
def delete_feedback_file(sender, instance, **kwargs):
    if instance.file:
        if os.path.isfile(instance.file.path):
            os.remove(instance.file.path)

