from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse

from users.models import User
from currency.models import Country, CurrencyRate
from games.models import Game, ESRBRating, Platform, Genre, Tag, Developer, Screenshot
from library.models import Library


class LibraryTests(APITestCase):
    def setUp(self):
        self.client = APIClient()

        self.currency = CurrencyRate.objects.create(currency_code="RUB", rate=1)
        self.country = Country.objects.create(name_ru="Россия", currency=self.currency, currency_symbol="₽", numeric_code=643)

        self.user = User.objects.create_user(
            username="testuser", password="testpassword", email="testuser@example.com"
        )
        self.client.force_authenticate(user=self.user)

        self.esrb_rating = ESRBRating.objects.create(
            id=1, name_en="Everyone", name_ru="Для всех", image="static/icons/ESRB-E.png", minimum_age=0
        )
        self.platform = Platform.objects.create(id=1, name="Test Platform")
        self.genre = Genre.objects.create(id=1, name="Test Genre")
        self.tag = Tag.objects.create(id=1, name="Test Tag")
        self.developer = Developer.objects.create(id=1, name="Test Developer")
        self.screenshot = Screenshot.objects.create(id=1, image="https://example.com/screenshot.jpg")

        # Создаем игры
        self.game1 = Game.objects.create(
            id=1,
            name="Test Game 1",
            description="Description 1",
            release_date="2022-01-01",
            esrb_rating=self.esrb_rating
        )
        self.game1.platforms.add(self.platform)
        self.game1.genres.add(self.genre)
        self.game1.tags.add(self.tag)
        self.game1.developers.add(self.developer)
        self.game1.screenshots.add(self.screenshot)

        self.game2 = Game.objects.create(
            id=2,
            name="Test Game 2",
            description="Description 2",
            release_date="2022-02-01",
            esrb_rating=self.esrb_rating
        )
        self.game2.platforms.add(self.platform)
        self.game2.genres.add(self.genre)
        self.game2.tags.add(self.tag)
        self.game2.developers.add(self.developer)
        self.game2.screenshots.add(self.screenshot)

        self.library_1 = Library.objects.create(user=self.user, game=self.game1)

    def test_library_model_str(self):
        library = Library.objects.create(user=self.user, game=self.game1)
        self.assertEqual(str(library), f"{self.user.username}: {self.game1.name}")

    def test_library_view_library(self):
        response = self.client.get(reverse("library"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_library_view_get_user_library(self):
        response = self.client.get(reverse("get_user_library", args=[self.user.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 6)
        self.assertEqual(response.data["total_count"], 1)
        self.assertEqual(response.data["total_pages"], 1)
        self.assertEqual(response.data["current_page"], 1)
        self.assertEqual(response.data["next"], None)
        self.assertEqual(response.data["previous"], None)
        self.assertEqual(response.data["results"][0]["name"], "Test Game 1")

    def test_library_view_add_to_library(self):
        response = self.client.post(reverse("add_to_library", args=[self.user.id, self.game2.id]))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["message"], "Game added to library")
        self.assertTrue(Library.objects.filter(user=self.user, game=self.game2).exists())

    def test_library_view_add_to_library_duplicate(self):
        response = self.client.post(reverse("add_to_library", args=[self.user.id, self.game2.id]))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.post(reverse("add_to_library", args=[self.user.id, self.game2.id]))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "This game is already in the library")

    def test_library_view_get_user_library_unauthenticated(self):
        self.client.logout()
        response = self.client.get(reverse("get_user_library", args=[self.user.id]))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
