from .models import Platform, ESRBRating, Genre, Tag, Game
from rest_framework import serializers

class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ['name', 'icon']

class ESRBRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ESRBRating
        fields = ['id', 'name_en', 'name_ru', 'image']

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'name', 'background_image', 'description', 'rating', 'platforms', 'genres', 'tags']
