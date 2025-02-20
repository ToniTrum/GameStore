from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from .models import CurrencyRate, Country
from .serializer import CurrencyRateSerializer, CountrySerializer

class CurrencyRateView(generics.ListAPIView):
    queryset = CurrencyRate.objects.all()
    serializer_class = CurrencyRateSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_currency_rate(request, currency_code):
    currency_rate = CurrencyRate.objects.get(currency_code=currency_code)
    serializer = CurrencyRateSerializer(currency_rate)
    return Response(serializer.data, status=status.HTTP_200_OK)

class CountryView(generics.ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_country(request, numeric_code):
    country = Country.objects.get(numeric_code=numeric_code)
    serializer = CountrySerializer(country)
    return Response(serializer.data, status=status.HTTP_200_OK)