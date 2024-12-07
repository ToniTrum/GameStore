from django.core.management.base import BaseCommand
from games.utils import fetch_game_data_by_id

class Command(BaseCommand):
    help = "Fetches game data by ID from RAWG Video Games API"

    def add_arguments(self, parser):
        parser.add_argument(
            'game_id',
            type=int,
            help="The ID of the game to fetch data for"
        )

    def handle(self, *args, **kwargs):
        game_id = kwargs['game_id']
        fetch_game_data_by_id(game_id)
        self.stdout.write(self.style.SUCCESS("Successfully fetched and saved game data by ID."))
