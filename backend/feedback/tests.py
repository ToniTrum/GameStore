from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from .models import Feedback
from users.models import User
from currency.models import Country, CurrencyRate

class FeedbackTests(TestCase):
    def setUp(self):
        self.currency = CurrencyRate.objects.create(currency_code="RUB", rate=1)
        self.country = Country.objects.create(name_ru="Россия", currency=self.currency, currency_symbol="₽", numeric_code=643)

        self.user = User.objects.create_user(username='user', password='userpass', email="user@mail.ru")
        self.admin = User.objects.create_superuser(username='admin', password='adminpass', email="admin@mail.ru")

        self.feedback_1 = Feedback.objects.create(
            theme="Test Theme 1",
            text="Test Text 1",
            user=self.user,
            status="Отправлено"
        )
        self.feedback_2 = Feedback.objects.create(
            theme="Test Theme 2",
            text="Test Text 2",
            user=self.user,
            status="На рассмотрении"
        )

        self.client = APIClient()

    def authenticate(self, user):
        self.client.force_authenticate(user=user)

    def test_feedback_view_feedback(self):
        self.authenticate(self.admin)
        response = self.client.get(reverse('feedback'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_feedback_view_get_feedback(self):
        self.authenticate(self.user)
        response = self.client.get(reverse('get_feedback', args=[self.user.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)

    def test_feedback_view_get_feedback_by_id(self):
        self.authenticate(self.user)
        response = self.client.get(reverse('get_feedback_by_id', args=[self.feedback_1.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['theme'], "Test Theme 1")
        self.assertEqual(response.data['text'], "Test Text 1")

    def test_feedback_view_create_feedback(self):
        self.authenticate(self.user)
        data = {
            "theme": "New Theme",
            "text": "New Text",
        }
        response = self.client.post(reverse('create_feedback', args=[self.user.id]), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Feedback.objects.count(), 3)

    def test_feedback_view_create_feedback_invalid_user(self):
        self.authenticate(self.user)
        data = {
            "theme": "New Theme",
            "text": "New Text",
        }
        response = self.client.post(reverse('create_feedback', args=[999]), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_feedback(self):
        self.authenticate(self.user)
        data = {
            "theme": "Updated Theme",
            "text": "Updated Text",
        }
        response = self.client.put(reverse('update_feedback', args=[self.feedback_1.id]), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.feedback_1.refresh_from_db()
        self.assertEqual(self.feedback_1.theme, "Updated Theme")
        self.assertEqual(self.feedback_1.text, "Updated Text")

    def test_feedback_view_update_feedback_invalid_feedback(self):
        self.authenticate(self.user)
        data = {
            "theme": "Updated Theme",
            "text": "Updated Text",
        }
        response = self.client.put(reverse('update_feedback', args=[999]), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_feedback_view_delete_feedback(self):
        self.authenticate(self.user)
        response = self.client.delete(reverse('delete_feedback', args=[self.feedback_1.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Feedback.objects.count(), 1)

    def test_feedback_view_delete_feedback_invalid_status(self):
        self.authenticate(self.user)
        response = self.client.delete(reverse('delete_feedback', args=[self.feedback_2.id]))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Feedback.objects.count(), 2)

    def test_delete_feedback_invalid_feedback(self):
        self.authenticate(self.user)
        response = self.client.delete(reverse('delete_feedback', args=[999]))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_feedback_filter_get_feedback(self):
        self.authenticate(self.user)
        response = self.client.get(reverse('get_feedback', args=[self.user.id]), {'status': 'На рассмотрении'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['status'], 'На рассмотрении')

    def test_unauthenticated_access(self):
        response = self.client.get(reverse('feedback'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authenticated_user_access(self):
        self.authenticate(self.user)
        response = self.client.get(reverse('feedback'))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_authenticated_admin_access(self):
        self.authenticate(self.admin)
        response = self.client.get(reverse('feedback'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
