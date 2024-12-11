from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Platform, ESRBRating, Genre, Tag, Developer, Screenshot, Game, Requirement
from .serializer import PlatformSerializer, ESRBRatingSerializer, GenreSerializer, TagSerializer, DeveloperSerializer, ScreenshotSerializer, GameSerializer, RequirementSerializer

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

class ScreenshotView(generics.ListAPIView):
    queryset = Screenshot.objects.all()
    serializer_class = ScreenshotSerializer

class GamePagination(PageNumberPagination):
    page_size = 40
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'total_count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        })

class GameView(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    pagination_class = GamePagination

class RequirementView(generics.ListAPIView):
    queryset = Requirement.objects.all()
    serializer_class = RequirementSerializer

class RandomGamesView(generics.ListAPIView):
    queryset = Game.objects.all().order_by('?')[:4]
    serializer_class = GameSerializer
