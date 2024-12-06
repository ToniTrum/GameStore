from django.core.management.base import BaseCommand
from currency.utils import fetch_country_data

class Command(BaseCommand):
    help = "Fetches country data from RESTCountry API"

    def handle(self, *args, **kwargs):
        fetch_country_data()
        self.stdout.write(self.style.SUCCESS("Successfully fetched and saved country data."))
