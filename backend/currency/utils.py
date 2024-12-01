import requests
from django.utils.timezone import now
from .models import CurrencyRate

API_KEY = '0a5cf70bd1e7c0dd7306f278f4a6f829'
API_URL = 'https://api.currencylayer.com/live'

def fetch_currency_data():
    response = requests.get(API_URL, params={'access_key': API_KEY})

    if response.status_code != 200:
        raise Exception(f"API request failed with status code {response.status_code}")

    data = response.json()

    if not data.get('success'):
        raise Exception(f"API error: {data.get('error')}")

    rates = data.get('quotes', {})
    base_currency = data.get('source', 'USD')

    for currency_pair, rate in rates.items():
        currency_code = currency_pair.replace(base_currency, '')
        obj, created = CurrencyRate.objects.update_or_create(
            currency_code=currency_code,
            defaults={'rate': rate, 'updated_at': now()},
        )
        print(f"{'Created' if created else 'Updated'}: {currency_code} -> {rate}")

    CurrencyRate.objects.update_or_create(
        currency_code=base_currency,
        defaults={'rate': 1, 'updated_at': now()},
    )
