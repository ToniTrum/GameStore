from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
import os

from currency.models import Country

class User(AbstractUser):
    username = models.CharField(max_length=64, unique=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=124)
    birthdate = models.DateField(null=True)
    country = models.ForeignKey(Country, on_delete=models.SET_DEFAULT, default=Country.get_default_country, related_name="users")
    image = models.ImageField(upload_to='static/img', default='static/icons/default-avatar.png')
    subscribed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class ResetPasswordCode(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=4)
    created_at = models.DateTimeField(auto_now_add=True)

    def send_code_to_email(self):
        send_mail(
            "Сброс пароля",
            f"Ваш код сброса пароля: {self.code}",
            settings.EMAIL_HOST_USER,
            [self.user.email],
            fail_silently=False
        )

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()

@receiver(models.signals.post_delete, sender=Profile)
def delete_file_on_delete(sender, instance, **kwargs):
    if instance.image and os.path.isfile(instance.image.path):
        os.remove(instance.image.path)

models.signals.post_save.connect(create_user_profile, sender=User)
models.signals.post_save.connect(save_user_profile, sender=User)