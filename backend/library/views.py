from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Library, Wishlist
from .serializer import LibrarySerializer, WishlistSerializer

class LibraryView(generics.ListAPIView):
    queryset = Library.objects.all()
    serializer_class = LibrarySerializer

class WishlistView(generics.ListAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
