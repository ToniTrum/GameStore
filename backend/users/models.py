from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator


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
    birth_day = models.DateField(null=True)
    country = models.PositiveIntegerField(default=1)
    image = models.ImageField(upload_to='media', default='default.svg')
    verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()

models.signals.post_save.connect(create_user_profile, sender=User)
models.signals.post_save.connect(save_user_profile, sender=User)