from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.response import Response

from .models import Game, Platform
from .serializer import PlatformSerializer

class PlatformView(generics.ListAPIView):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer
