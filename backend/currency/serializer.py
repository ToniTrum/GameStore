from .models import CurrencyRate, Country
from rest_framework import serializers

class CurrencyRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyRate
        fields = ['currency_code', 'rate', 'updated_at']

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['numeric_code', 'name_ru', 'currency_symbol', 'currency']