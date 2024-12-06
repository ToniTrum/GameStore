from django.db import models

class Game(models.Model):
    name = models.CharField(max_length=256)
    deck = models.TextField()
    description = models.TextField()
    image = models.ImageField(upload_to='media', default='default.svg')

    def __str__(self):
        return self.name
    
class Platform(models.Model):
    name = models.CharField(max_length=64)
    icon = models.ImageField(upload_to='static/icons')

    def __str__(self):
        return self.name