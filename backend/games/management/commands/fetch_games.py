from django.core.management.base import BaseCommand
from games.utils import fetch_games_data

class Command(BaseCommand):
    help = "Fetches games base data from Giant Bomb API"

    def handle(self, *args, **kwargs):
        fetch_games_data()
        self.stdout.write(self.style.SUCCESS("Successfully fetched and saved games base data."))
