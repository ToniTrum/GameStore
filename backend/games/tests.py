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