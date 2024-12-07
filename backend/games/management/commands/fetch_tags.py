from django.core.management.base import BaseCommand
from games.utils import fetch_tags_data

class Command(BaseCommand):
    help = "Fetches tags data from RAWG Video Games API"

    def handle(self, *args, **kwargs):
        fetch_tags_data()
        self.stdout.write(self.style.SUCCESS("Successfully fetched and saved tags data."))
