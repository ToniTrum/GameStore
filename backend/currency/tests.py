from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from .models import CurrencyRate, Country

class CurrencyRateTests(TestCase):
    def setUp(self):
        CurrencyRate.objects.create(currency_code="USD", rate=1.0000)
        CurrencyRate.objects.create(currency_code="EUR", rate=0.8500)

    def test_currency_rate_model_str(self):
        usd = CurrencyRate.objects.get(currency_code="USD")
        self.assertEqual(str(usd), "USD: 1.000000")

    def test_currency_rate_view_currency_rates(self):
        client = APIClient()
        response = client.get(reverse('currency_rates'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_get_currency_view_get_currency_rate(self):
        client = APIClient()
        response = client.get(reverse('get_currency_rate', args=["USD"]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["currency_code"], "USD")
        self.assertEqual(float(response.data["rate"]), 1.0000)


class CountryTests(TestCase):
    def setUp(self):
        usd = CurrencyRate.objects.create(currency_code="USD", rate=1.0000)
        eur = CurrencyRate.objects.create(currency_code="EUR", rate=0.8500)
        Country.objects.create(numeric_code=840, name_ru="США", currency=usd, currency_symbol="$")
        Country.objects.create(numeric_code=978, name_ru="Еврозона", currency=eur, currency_symbol="€")

    def test_country_model_str(self):
        usa = Country.objects.get(numeric_code=840)
        self.assertEqual(str(usa), "США (USD: $)")

    def test_country_view_country(self):
        client = APIClient()
        response = client.get(reverse('country'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_country_view_get_country(self):
        client = APIClient()
        response = client.get(reverse('get_country', args=[840]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name_ru"], "США")
        self.assertEqual(response.data["currency_symbol"], "$")
        self.assertEqual(response.data["currency"], "USD")

