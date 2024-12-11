from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Library, Wishlist, Basket
from .serializer import LibrarySerializer, WishlistSerializer, BasketSerializer

from users.models import User
from games.models import Game
from games.serializer import GameSerializer

class LibraryView(generics.ListAPIView):
    queryset = Library.objects.all()
    serializer_class = LibrarySerializer

class WishlistView(generics.ListAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer

class BasketView(generics.ListAPIView):
    queryset = Basket.objects.all()
    serializer_class = BasketSerializer

class CommonPagination(PageNumberPagination):
    page_size = 40

    def get_paginated_response(self, data):
        return Response({
            'total_count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        })

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
