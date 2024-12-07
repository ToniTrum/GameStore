from django.db import models

# class Game(models.Model):
#     name = models.CharField(max_length=256)
#     background_image = models.ImageField(upload_to='media', default='default.svg')


#     def __str__(self):
#         return self.name
    
class Platform(models.Model):
    name = models.CharField(max_length=64)
    icon = models.ImageField(upload_to='static/icons')

    def __str__(self):
        return self.name
    
class ESRBRating(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name_en = models.CharField(max_length=32)
    name_ru = models.CharField(max_length=32)
    image = models.ImageField(upload_to='static/img')

    def __str__(self):
        return self.name_en
    
class Genre(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name

class Tag(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name
