from .models import Platform, ESRBRating, Genre, Tag, Developer, Screenshot, Game, Requirement
from rest_framework import serializers

class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ['id', 'name', 'icon']

class ESRBRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ESRBRating
        fields = ['id', 'name_en', 'name_ru', 'image', 'minimum_age']

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class DeveloperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Developer
        fields = ['id', 'name']

class ScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Screenshot
        fields = ['id', 'image']

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = [
            'id', 'name', 'background_image', 'description', 
            'esrb_rating', 'release_date', 'price_in_cents',
            'platforms', 'genres', 'tags', 'screenshots', 'developers'
        ]

class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = ['id', 'minimum', 'recommended', 'platform', 'game']
