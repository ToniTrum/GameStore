from django.db import models

class Game(models.Model):
    title = models.CharField(max_length=256)
    description = models.TextField()
    image = models.ImageField(upload_to='media', default='default.svg')

    def __str__(self):
        return self.title