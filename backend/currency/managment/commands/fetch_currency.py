from django.core.management.base import BaseCommand
from currency.utils import fetch_currency_data

class Command(BaseCommand):
    help = "Fetches currency data from CurrencyLayer API"

    def handle(self, *args, **kwargs):
        fetch_currency_data()
        self.stdout.write(self.style.SUCCESS("Successfully fetched and saved currency rates."))
