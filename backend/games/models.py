from django.db import models
    
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
    
    @staticmethod
    def get_default_ratings():
        return ESRBRating.objects.get(id=6)
    
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
    
class Game(models.Model):
    name = models.CharField(max_length=256)
    background_image = models.ImageField(upload_to='media', default='default.svg')
    description = models.TextField()
    rating = models.ForeignKey(ESRBRating, on_delete=models.SET_DEFAULT, default=ESRBRating.get_default_ratings)
    platforms = models.ManyToManyField(Platform)
    genres = models.ManyToManyField(Genre)
    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.name
    
# class Screenshot(models.Model):
#     image = models.ImageField(upload_to='media')
#     game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='screenshots')

#     def __str__(self):
#         return f"{self.game}: {self.image}"
