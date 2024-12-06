from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.response import Response

from .models import Platform, ESRBRating, Genre
from .serializer import PlatformSerializer, ESRBRatingSerializer, GenreSerializer

class PlatformView(generics.ListAPIView):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer

class ESRBRatingView(generics.ListAPIView):
    queryset = ESRBRating.objects.all()
    serializer_class = ESRBRatingSerializer

class GenreView(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
