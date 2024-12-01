from django.contrib import admin
from .models import CurrencyRate, Country


@admin.register(CurrencyRate)
class CurrencyRateAdmin(admin.ModelAdmin):
    list_display = ('currency_code', 'rate', 'updated_at')

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('numeric_code', 'name_ru', 'currency', 'currency_symbol')
