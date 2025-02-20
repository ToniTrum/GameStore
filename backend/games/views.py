from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import NotFound
from django_filters.rest_framework import DjangoFilterBackend

from .models import Platform, ESRBRating, Genre, Tag, Developer, Screenshot, Game, Requirement
from .serializer import PlatformSerializer, ESRBRatingSerializer, GenreSerializer, TagSerializer, DeveloperSerializer, ScreenshotSerializer, GameSerializer, RequirementSerializer
from .filters import GameFilter
from users.models import User
from library.models import Library

class PlatformView(generics.ListAPIView):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_platform(request, platform_id):    
    platform = Platform.objects.get(id=platform_id)
    serializer = PlatformSerializer(platform)
    return Response(serializer.data, status=status.HTTP_200_OK)

class ESRBRatingView(generics.ListAPIView):
    queryset = ESRBRating.objects.all()
    serializer_class = ESRBRatingSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_esrb_rating(request, esrb_rating_id):
    esrb_rating = ESRBRating.objects.get(id=esrb_rating_id)
    serializer = ESRBRatingSerializer(esrb_rating)
    return Response(serializer.data, status=status.HTTP_200_OK)

class GenreView(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_genre(request, genre_id):
    genre = Genre.objects.get(id=genre_id)
    serializer = GenreSerializer(genre)
    return Response(serializer.data, status=status.HTTP_200_OK)

class TagView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_tag(request, tag_id):
    tag = Tag.objects.get(id=tag_id)
    serializer = TagSerializer(tag)
    return Response(serializer.data, status=status.HTTP_200_OK)

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

class FilteredGameView(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    pagination_class = GamePagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = GameFilter

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        if not user_id:
            raise NotFound("Не указан ID пользователя.")

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise NotFound("Пользователь не найден.")

        library_game_ids = Library.objects.filter(user=user).values_list('game_id', flat=True)
        return Game.objects.exclude(id__in=library_game_ids)
    
@api_view(['GET'])
@permission_classes([AllowAny])
def get_game(request, game_id):
    game = Game.objects.get(id=game_id)
    serializer = GameSerializer(game)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_random_games(request, user_id):
    user = User.objects.get(id=user_id)
    library = Library.objects.filter(user=user).values_list('game_id', flat=True)
    games = Game.objects.exclude(id__in=library).order_by('?')[:6]
    serializer = GameSerializer(games, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def check_game_in_library(request, user_id, game_id):
    user = User.objects.get(id=user_id)
    library = Library.objects.filter(user=user).values_list('game_id', flat=True)
    if game_id in library:
        return Response({'in_library': True}, status=status.HTTP_200_OK)
    return Response({'in_library': False}, status=status.HTTP_200_OK)

class RequirementView(generics.ListAPIView):
    queryset = Requirement.objects.all()
    serializer_class = RequirementSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_requirement(request, game_id):
    game = Game.objects.get(id=game_id)
    requirements = Requirement.objects.filter(game=game)
    serializer = RequirementSerializer(requirements, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
