from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import CurrencyRate, Country
from .serializer import CurrencyRateSerializer, CountrySerializer

@api_view(['GET'])
def get_currency_rates(request, currency_code):
    currency_rate = CurrencyRate.objects.get(currency_code=currency_code)
    serializer = CurrencyRateSerializer(currency_rate)
    return Response(serializer.data, status=status.HTTP_200_OK)

def get_country(request):
    countries = Country.objects.all()
    serializer = CountrySerializer(countries, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)