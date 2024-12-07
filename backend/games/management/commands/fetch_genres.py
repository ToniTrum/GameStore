from django.core.management.base import BaseCommand
from games.utils import fetch_genres_data

class Command(BaseCommand):
    help = "Fetches genres data from RAWG Video Games API"

    def handle(self, *args, **kwargs):
        fetch_genres_data()
        self.stdout.write(self.style.SUCCESS("Successfully fetched and saved genres data."))
