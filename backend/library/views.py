from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Library
from .serializer import LibrarySerializer

from users.models import User
from games.models import Game
from games.serializer import GameSerializer

class CommonPagination(PageNumberPagination):
    page_size = 39

    def get_paginated_response(self, data):
        return Response({
            'total_count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        })

class LibraryView(generics.ListAPIView):
    queryset = Library.objects.all()
    serializer_class = LibrarySerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_library(request, user_id):
    user = User.objects.get(id=user_id)
    library = Library.objects.filter(user=user)
    games = Game.objects.filter(id__in=library.values_list('game_id', flat=True))
    serializer = GameSerializer(games, many=True)
    paginator = CommonPagination()
    page = paginator.paginate_queryset(serializer.data, request)
    return paginator.get_paginated_response(page)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_library(request, user_id, game_id):
    user = User.objects.get(id=user_id)
    game = Game.objects.get(id=game_id)

    if Library.objects.filter(user=user, game=game).exists():
        return Response({"error": "This game is already in the library"}, status=status.HTTP_400_BAD_REQUEST)

    Library.objects.create(user=user, game=game)
    return Response({"message": "Game added to library"}, status=status.HTTP_201_CREATED)
