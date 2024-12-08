from django.db import models
    
class Platform(models.Model):
    id = models.SmallIntegerField(primary_key=True)
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
    def get_default_rating():
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
    
class Developer(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name
    
class Screenshot(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    image = models.URLField()

    def __str__(self):
        return f"{self.image}"
    
class Game(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=256)
    background_image = models.URLField(default="https://t3.ftcdn.net/jpg/04/84/88/76/360_F_484887682_Mx57wpHG4lKrPAG0y7Q8Q7bJ952J3TTO.jpg")
    description = models.TextField()
    esrb_rating = models.ForeignKey(ESRBRating, on_delete=models.SET_DEFAULT, default=ESRBRating.get_default_rating)
    release_date = models.DateField()
    platforms = models.ManyToManyField(Platform)
    genres = models.ManyToManyField(Genre)
    tags = models.ManyToManyField(Tag)
    screenshots = models.ManyToManyField(Screenshot)
    developers = models.ManyToManyField(Developer)
    price_in_cents = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name
    
class Requirement(models.Model):
    minimum = models.TextField()
    recommended = models.TextField()
    platform = models.ForeignKey(Platform, on_delete=models.CASCADE, related_name='requirements')
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='requirements')

    def __str__(self):
        return f"{self.game}: {self.platform}"
