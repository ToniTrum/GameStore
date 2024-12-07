from .models import Platform, ESRBRating, Genre, Tag, Developer, Game, Screenshot, Requirement
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

class DeveloperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Developer
        fields = ['id', 'name']

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'name', 'background_image', 'description', 'esrb_rating', 'release_date', 'platforms', 'genres', 'tags', 'developers']

class ScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Screenshot
        fields = ['id', 'image', 'game']

class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = ['id', 'minimal', 'recommended', 'platform', 'game']
