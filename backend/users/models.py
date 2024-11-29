from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator

# class User(AbstractUser):
#     username = models.CharField(max_length=64, validators=[MinValueValidator(8)], unique=True)
#     email = models.EmailField(unique=True)
#     first_name = models.CharField(max_length=64)
#     last_name = models.CharField(max_length=124)
#     birth_day = models.DateField(null=False)
#     country = models.PositiveIntegerField(null=False)
#     image = models.ImageField(upload_to='media', default='default.svg')

#     def __str__(self):
#         return self.username
