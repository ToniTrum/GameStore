from django.core.management.base import BaseCommand
from games.utils import fetch_games_price_data

class Command(BaseCommand):
    help = "Fetches games price from CheapShark API"

    def handle(self, *args, **kwargs):
        fetch_games_price_data()
        self.stdout.write(self.style.SUCCESS("Successfully fetched and saved games price."))
