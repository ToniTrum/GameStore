from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response

from .models import Platform, ESRBRating, Genre, Tag, Developer, Game, Screenshot
from .serializer import PlatformSerializer, ESRBRatingSerializer, GenreSerializer, TagSerializer, DeveloperSerializer, GameSerializer, ScreenshotSerializer

class PlatformView(generics.ListAPIView):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer

class ESRBRatingView(generics.ListAPIView):
    queryset = ESRBRating.objects.all()
    serializer_class = ESRBRatingSerializer

class GenreView(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class TagView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class DeveloperView(generics.ListAPIView):
    queryset = Developer.objects.all()
    serializer_class = DeveloperSerializer

class GameView(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class ScreenshotView(generics.ListAPIView):
    queryset = Screenshot.objects.all()
    serializer_class = ScreenshotSerializer
