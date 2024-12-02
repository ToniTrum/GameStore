import requests
from django.utils.timezone import now
from .models import CurrencyRate, Country

def fetch_currency_data():
    API_KEY = '0a5cf70bd1e7c0dd7306f278f4a6f829'
    API_URL = 'https://api.currencylayer.com/live'

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

def fetch_country_data():
    API_URL = "https://restcountries.com/v3.1/all"

    response = requests.get(API_URL)
    response.raise_for_status()
    countries = response.json()

    for country in countries:
        name_ru = country['translations'].get('rus', {}).get('common', country['name']['common'])
        numeric_code = country.get('ccn3', None)
        currencies = country.get('currencies', {})

        if currencies is None or numeric_code is None or not list(currencies):
            continue

        currency_code = list(currencies)[0]
        currency_symbol = list(currencies.values())[0]['symbol']

        try:
            currency = CurrencyRate.objects.get(currency_code=currency_code)
        except CurrencyRate.DoesNotExist:
            print(f"----Currency {currency_code} does not exist for country {name_ru}----")
            currency = None

        defaults = {
            "name_ru": name_ru, 
            "currency_symbol": currency_symbol
        }
        if currency is not None:
            defaults["currency"] = currency

        obj, created = Country.objects.update_or_create(
            numeric_code=int(numeric_code),
            defaults=defaults,
        )

        print(f"{'Created' if created else 'Updated'}: {numeric_code} -> {name_ru} {currency.currency_code if currency else None} {currency_symbol}")
