from django.test import TestCase
from django.urls import reverse
from django.conf import settings

from rest_framework.test import APIClient
from rest_framework import status

from .models import Platform, ESRBRating, Genre, Tag, Developer, Screenshot, Game, Requirement
from users.models import User
from currency.models import CurrencyRate, Country
from library.models import Library

class PlatformTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.platform_1 = Platform.objects.create(id=1, name="Test Platform 1", icon="static/icons/windows-icon.png")
        self.platform_2 = Platform.objects.create(id=2, name="Test Platform 2", icon="static/icons/windows-icon.png")

    def test_platform_model_str(self):
        self.assertEqual(str(self.platform_1), "Test Platform 1")
        self.assertEqual(str(self.platform_2), "Test Platform 2")
        
    def test_platform_view_platform(self):
        response = self.client.get(reverse('platform'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_platform_view_get_platform(self):
        response = self.client.get(reverse('get_platform', args=[self.platform_1.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Test Platform 1")
        self.assertEqual(response.data['icon'], "/static/icons/windows-icon.png")

class ESRBRatingTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.esrb_rating_1 = ESRBRating.objects.create(id=1, name_en="Mature Rating", name_ru="С 17 лет", image="static/icons/ESRB-Mature.png", minimum_age=17)
        self.esrb_rating_2 = ESRBRating.objects.create(id=2, name_en="Only Adults", name_ru="Только для взрослых", image="static/icons/ESRB-Adults-Only-18.png", minimum_age=18)

    def test_esrb_rating_model_str(self):
        self.assertEqual(str(self.esrb_rating_1), "Mature Rating")
        self.assertEqual(str(self.esrb_rating_2), "Only Adults")
        
    def test_esrb_rating_view_esrb_rating(self):
        response = self.client.get(reverse('esrb_rating'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_esrb_rating_view_get_esrb_rating(self):
        response = self.client.get(reverse('get_esrb_rating', args=[self.esrb_rating_1.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name_en'], "Mature Rating")
        self.assertEqual(response.data['name_ru'], "С 17 лет")
        self.assertEqual(response.data['image'], "/static/icons/ESRB-Mature.png")
        self.assertEqual(response.data['minimum_age'], 17)

class GenreTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.genre_1 = Genre.objects.create(id=1, name="Test Genre 1")
        self.genre_2 = Genre.objects.create(id=2, name="Test Genre 2")

    def test_genre_model_str(self):
        self.assertEqual(str(self.genre_1), "Test Genre 1")
        self.assertEqual(str(self.genre_2), "Test Genre 2")
        
    def test_genre_view_genre(self):
        response = self.client.get(reverse('genre'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_genre_view_get_genre(self):
        response = self.client.get(reverse('get_genre', args=[self.genre_1.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Test Genre 1")

class TagTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.tag_1 = Tag.objects.create(id=1, name="Test Tag 1")
        self.tag_2 = Tag.objects.create(id=2, name="Test Tag 2")

    def test_tag_model_str(self):
        self.assertEqual(str(self.tag_1), "Test Tag 1")
        self.assertEqual(str(self.tag_2), "Test Tag 2")
        
    def test_tag_view_tag(self):
        response = self.client.get(reverse('tag'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_tag_view_get_tag(self):
        response = self.client.get(reverse('get_tag', args=[self.tag_1.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Test Tag 1")

class DeveloperTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.developer_1 = Developer.objects.create(id=1, name="Test Developer 1")
        self.developer_2 = Developer.objects.create(id=2, name="Test Developer 2")

    def test_developer_model_str(self):
        self.assertEqual(str(self.developer_1), "Test Developer 1")
        self.assertEqual(str(self.developer_2), "Test Developer 2")
        
    def test_developer_view_developer(self):
        response = self.client.get(reverse('developer'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_developer_view_get_developer(self):
        response = self.client.get(reverse('get_developer', args=[self.developer_1.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Test Developer 1")

class ScreenShotTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.screenshot_1 = Screenshot.objects.create(id=1, image="http://test.com/test.png")
        self.screenshot_2 = Screenshot.objects.create(id=2, image="http://test2.com/test.png")

    def test_screenshot_model_str(self):
        self.assertEqual(str(self.screenshot_1), "http://test.com/test.png")
        self.assertEqual(str(self.screenshot_2), "http://test2.com/test.png")
        
    def test_screenshot_view_screenshot(self):
        response = self.client.get(reverse('screenshot'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_screenshot_view_get_screenshot(self):
        response = self.client.get(reverse('get_screenshot', args=[self.screenshot_1.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['image'], "http://test.com/test.png")

class GameTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.platform_1 = Platform.objects.create(id=1, name="Test Platform 1")
        self.platform_2 = Platform.objects.create(id=2, name="Test Platform 2")

        self.esrb_rating = ESRBRating.objects.create(id=1, name_en="Mature Rating", name_ru="С 17 лет", image="static/icons/ESRB-Mature.png", minimum_age=17)

        self.genre_1 = Genre.objects.create(id=1, name="Test Genre 1")
        self.genre_2 = Genre.objects.create(id=2, name="Test Genre 2")

        self.tag_1 = Tag.objects.create(id=1, name="Test Tag 1")
        self.tag_2 = Tag.objects.create(id=2, name="Test Tag 2")

        self.developer_1 = Developer.objects.create(id=1, name="Test Developer 1")
        self.developer_2 = Developer.objects.create(id=2, name="Test Developer 2")

        self.screenshot_1 = Screenshot.objects.create(id=1, image="http://test.com/test.png")
        self.screenshot_2 = Screenshot.objects.create(id=2, image="http://test2.com/test.png")

        self.currency = CurrencyRate.objects.create(currency_code="RUB", rate=1)
        self.country = Country.objects.create(name_ru="Россия", currency=self.currency, currency_symbol="₽", numeric_code=643)
        self.user = User.objects.create_user(username='user', password='userpass', email="user@mail.ru")


        self.game_1 = Game.objects.create(
            id=1,
            name="Test Game 1",
            description="Test Description 1",
            release_date="2023-01-01",
            esrb_rating=self.esrb_rating
        )
        self.game_1.platforms.set([self.platform_1, self.platform_2])
        self.game_1.genres.set([self.genre_1, self.genre_2])
        self.game_1.tags.set([self.tag_1, self.tag_2])
        self.game_1.developers.set([self.developer_1, self.developer_2])
        self.game_1.screenshots.set([self.screenshot_1, self.screenshot_2])

        self.game_2 = Game.objects.create(
            id=2,
            name="Test Game 2",
            description="Test Description 2",
            release_date="2023-01-02",
            esrb_rating=self.esrb_rating
        )
        self.game_2.platforms.set([self.platform_1, self.platform_2])
        self.game_2.genres.set([self.genre_1, self.genre_2])
        self.game_2.tags.set([self.tag_1, self.tag_2])
        self.game_2.developers.set([self.developer_1, self.developer_2])
        self.game_2.screenshots.set([self.screenshot_1, self.screenshot_2])

        self.game_3 = Game.objects.create(
            id=3,
            name="Test Game 3",
            description="Test Description 3",
            release_date="2023-01-03",
            esrb_rating=self.esrb_rating
        )
        self.game_3.platforms.set([self.platform_1, self.platform_2])
        self.game_3.genres.set([self.genre_1, self.genre_2])
        self.game_3.tags.set([self.tag_1, self.tag_2])
        self.game_3.developers.set([self.developer_1, self.developer_2])
        self.game_3.screenshots.set([self.screenshot_1, self.screenshot_2])

        self.game_4 = Game.objects.create(
            id=4,
            name="Test Game 4",
            description="Test Description 4",
            release_date="2023-01-04",
            esrb_rating=self.esrb_rating
        )
        self.game_4.platforms.set([self.platform_1, self.platform_2])
        self.game_4.genres.set([self.genre_1, self.genre_2])
        self.game_4.tags.set([self.tag_1, self.tag_2])
        self.game_4.developers.set([self.developer_1, self.developer_2])
        self.game_4.screenshots.set([self.screenshot_1, self.screenshot_2])

        self.game_5 = Game.objects.create(
            id=5,
            name="Test Game 5",
            description="Test Description 5",
            release_date="2022-01-05",
            esrb_rating=self.esrb_rating
        )
        self.game_5.platforms.set([self.platform_1, self.platform_2])
        self.game_5.genres.set([self.genre_1, self.genre_2])
        self.game_5.tags.set([self.tag_1, self.tag_2])
        self.game_5.developers.set([self.developer_1, self.developer_2])
        self.game_5.screenshots.set([self.screenshot_1, self.screenshot_2])

        self.game_6 = Game.objects.create(
            id=6,
            name="Test Game 6",
            description="Test Description 6",
            release_date="2022-01-06",
            esrb_rating=self.esrb_rating
        )
        self.game_6.platforms.set([self.platform_1, self.platform_2])
        self.game_6.genres.set([self.genre_1, self.genre_2])
        self.game_6.tags.set([self.tag_1, self.tag_2])
        self.game_6.developers.set([self.developer_1, self.developer_2])
        self.game_6.screenshots.set([self.screenshot_1, self.screenshot_2])

        self.game_7 = Game.objects.create(
            id=7,
            name="Test Game 7",
            description="Test Description 7",
            release_date="2022-01-07",
            esrb_rating=self.esrb_rating
        )
        self.game_7.platforms.set([self.platform_1, self.platform_2])
        self.game_7.genres.set([self.genre_1, self.genre_2])
        self.game_7.tags.set([self.tag_1, self.tag_2])
        self.game_7.developers.set([self.developer_1, self.developer_2])
        self.game_7.screenshots.set([self.screenshot_1, self.screenshot_2])

    def test_game_model_str(self):
        self.assertEqual(str(self.game_1), "Test Game 1")
        self.assertEqual(str(self.game_2), "Test Game 2")
        self.assertEqual(str(self.game_3), "Test Game 3")
        self.assertEqual(str(self.game_4), "Test Game 4")
        self.assertEqual(str(self.game_5), "Test Game 5")
        self.assertEqual(str(self.game_6), "Test Game 6")
        self.assertEqual(str(self.game_7), "Test Game 7")

    def test_game_view_game(self):
        response = self.client.get(reverse('game'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_count'], 7)
        self.assertEqual(response.data['total_pages'], 1)
        self.assertEqual(response.data['page'], 1)
        self.assertEqual(response.data['next'], None)
        self.assertEqual(response.data['previous'], None)
        self.assertEqual(len(response.data['results']), 7)

    def test_game_view_get_games(self):
        response = self.client.get(reverse('get_games', args=[self.user.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_count'], 7)
        self.assertEqual(response.data['total_pages'], 1)
        self.assertEqual(response.data['page'], 1)
        self.assertEqual(response.data['next'], None)
        self.assertEqual(response.data['previous'], None)
        self.assertEqual(len(response.data['results']), 7)

    def test_game_view_get_game(self):
        response = self.client.get(reverse('get_game', args=[self.game_1.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Test Game 1")
        self.assertEqual(response.data['description'], "Test Description 1")
        self.assertEqual(response.data['release_date'], "2023-01-01")
        self.assertEqual(response.data['esrb_rating'], self.esrb_rating.id)
        self.assertEqual(response.data['platforms'], [self.platform_1.id, self.platform_2.id])
        self.assertEqual(response.data['genres'], [self.genre_1.id, self.genre_2.id])
        self.assertEqual(response.data['tags'], [self.tag_1.id, self.tag_2.id])
        self.assertEqual(response.data['developers'], [self.developer_1.id, self.developer_2.id])
        self.assertEqual(response.data['screenshots'], [self.screenshot_1.id, self.screenshot_2.id])

    def test_game_view_get_random_games(self):
        response = self.client.get(reverse('get_random_games', args=[self.user.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 6)

    def test_game_view_check_game_in_library(self):
        response = self.client.get(reverse('check_game_in_library', args=[self.user.id, self.game_1.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['in_library'], False)

    def test_game_view_check_game_in_library_true(self):
        library = Library.objects.create(user=self.user, game=self.game_1)
        response = self.client.get(reverse('check_game_in_library', args=[self.user.id, self.game_1.id]))    
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['in_library'], True)
