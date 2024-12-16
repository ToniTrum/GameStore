from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from .models import Platform, ESRBRating, Genre, Tag, Developer, Screenshot, Game, Requirement
from .serializer import PlatformSerializer, ESRBRatingSerializer, GenreSerializer, TagSerializer, DeveloperSerializer, ScreenshotSerializer, GameSerializer, RequirementSerializer
from users.models import User
from library.models import Library

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

@api_view(['GET'])
@permission_classes([AllowAny])
def get_developer(request, developer_id):    
    developer = Developer.objects.get(id=developer_id)
    serializer = DeveloperSerializer(developer)
    return Response(serializer.data, status=status.HTTP_200_OK)

class ScreenshotView(generics.ListAPIView):
    queryset = Screenshot.objects.all()
    serializer_class = ScreenshotSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_screenshot(request, screenshot_id):
    screenshot = Screenshot.objects.get(id=screenshot_id)
    serializer = ScreenshotSerializer(screenshot)
    return Response(serializer.data, status=status.HTTP_200_OK)

class GamePagination(PageNumberPagination):
    page_size = 39

    def get_paginated_response(self, data):
        return Response({
            'total_count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'page': self.page.number,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        })

class GameView(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    pagination_class = GamePagination

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        response.set_cookie(
            key='key',
            value='value',
            samesite='None',
            secure=True
        )
        return response
    
@api_view(['GET'])
@permission_classes([AllowAny])
def get_game(request, game_id):
    game = Game.objects.get(id=game_id)
    serializer = GameSerializer(game)
    return Response(serializer.data, status=status.HTTP_200_OK)

class RequirementView(generics.ListAPIView):
    queryset = Requirement.objects.all()
    serializer_class = RequirementSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_genre(request, genre_id):
    genre = Genre.objects.get(id=genre_id)
    serializer = GenreSerializer(genre)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_random_games(request, user_id):
    user = User.objects.get(id=user_id)
    library = Library.objects.filter(user=user).values_list('game_id', flat=True)
    games = Game.objects.exclude(id__in=library).order_by('?')[:6]
    serializer = GameSerializer(games, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
