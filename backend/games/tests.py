from django.test import TestCase
from django.urls import reverse
from django.conf import settings

from rest_framework.test import APIClient
from rest_framework import status

from .models import Platform, ESRBRating, Genre, Tag, Developer, Screenshot, Game, Requirement

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