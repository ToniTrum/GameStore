from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from django.urls import reverse

from currency.models import Country, CurrencyRate
from users.models import ConfirmationCode, User, Profile
import random

class UserTests(APITestCase):

    def setUp(self):
        self.currency = CurrencyRate.objects.create(currency_code="RUB", rate=1.0000)
        self.country, created = Country.objects.update_or_create(
            name_ru='Россия', 
            numeric_code=643, 
            currency=self.currency, 
            currency_symbol='₽'
        )

        self.user_data = {
            'password': 'testpassword',
            'first_name': 'Test',
            'last_name': 'User',
            'birthdate': '1990-01-01',
            'country': self.country
        }
        self.user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpassword'
        )
        if hasattr(self.user, 'profile'):
            self.user.profile.delete()

        self.user.profile = Profile.objects.create(
            user=self.user,
            first_name=self.user_data['first_name'],
            last_name=self.user_data['last_name'],
            birthdate=self.user_data['birthdate'],
            country=self.user_data['country']
        )
        self.client.login(username=self.user.username, password=self.user_data['password'])

    def test_users_view_token(self):
        response = self.client.post(reverse('token'), data={'username': self.user.username, 'password': 'testpassword'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.user.username)
        self.assertEqual(response.data['email'], self.user.email)
        self.assertEqual(response.data['first_name'], self.user.profile.first_name)
        self.assertEqual(response.data['last_name'], self.user.profile.last_name)
        self.assertEqual(response.data['birthdate'], self.user.profile.birthdate.strftime('%Y-%m-%d'))
        self.assertEqual(response.data['country'], self.user.profile.country.numeric_code)
        self.assertEqual(response.data['image'], str(self.user.profile.image))
        self.assertEqual(response.data['subscribed'], self.user.profile.subscribed)

    # def test_users_view_register(self):
    #     data = {
    #         'username': 'newuser',
    #         'email': 'newuser@example.com',
    #         'password': 'password123',
    #         'password2': 'password123',
    #         'first_name': 'New',
    #         'last_name': 'User',
    #         'birthdate': '1995-05-15',
    #         'country': self.country.numeric_code
    #     }

    #     response = self.client.post(reverse('register'), data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #     self.assertEqual(get_user_model().objects.count(), 2)

    # def test_users_view_check_password(self):
    #     url = reverse('check_password', kwargs={'user_id': self.user.id})
    #     response = self.client.post(url, {'password': 'tonitrum1'}, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data['details'], 'Password is valid')

    # def test_users_view_check_password_invalid(self):
    #     url = reverse('check_password', kwargs={'user_id': self.user.id})
    #     response = self.client.post(url, {'password': 'wrongpassword'}, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertEqual(response.data['details'], 'Password is invalid')

    # def test_users_view_update_user(self):
    #     url = reverse('update', kwargs={'user_id': self.user.id})
    #     data = {
    #         'password': 'password123',
    #         'username': 'updateduser',
    #         'first_name': 'Updated',
    #         'last_name': 'User',
    #         'birthdate': '1990-01-01',
    #         'country': self.country.name_ru,
    #         'image': None
    #     }
    #     response = self.client.put(url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.user.refresh_from_db()
    #     self.assertEqual(self.user.username, 'updateduser')

    # def test_users_view_subscribe_user(self):
    #     url = reverse('subscribe', kwargs={'user_id': self.user.id})
    #     response = self.client.post(url, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.user.refresh_from_db()
    #     self.assertTrue(self.user.profile.subscribed)

    # def test_users_view_delete_user(self):
    #     url = reverse('delete', kwargs={'user_id': self.user.id})
    #     response = self.client.delete(url, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    #     self.user.refresh_from_db()
    #     self.assertTrue(self.user.deleted)

    # def test_recover_user(self):
    #     url = reverse('recover')
    #     email = self.user.email
    #     self.user.deleted = True
    #     self.user.save()

    #     response = self.client.post(url, {'recover': email}, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.user.refresh_from_db()
    #     self.assertFalse(self.user.deleted)

    # def test_create_confirmation_code(self):
    #     url = reverse('create_confirmation_code')
    #     response = self.client.post(url, {'email': self.user.email}, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     confirmation_code = ConfirmationCode.objects.get(email=self.user.email)
    #     self.assertIsNotNone(confirmation_code.code)

    # def test_check_confirmation_code_valid(self):
    #     code = ''.join(str(random.randint(0, 9)) for _ in range(4))
    #     ConfirmationCode.objects.create(email=self.user.email, code=code)
    #     url = reverse('check_confirmation_code')
    #     response = self.client.post(url, {'email': self.user.email, 'code': code}, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data['details'], 'Confirmation code is valid')

    # def test_check_confirmation_code_invalid(self):
    #     url = reverse('check_confirmation_code')
    #     response = self.client.post(url, {'email': self.user.email, 'code': '1234'}, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertEqual(response.data['details'], 'Confirmation code is invalid')

    # def test_reset_password(self):
    #     code = ''.join(str(random.randint(0, 9)) for _ in range(4))
    #     confirmation_code = ConfirmationCode.objects.create(email=self.user.email, code=code)
    #     url = reverse('reset_password')
    #     response = self.client.put(url, {'email': self.user.email, 'password': 'newpassword123'}, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.user.refresh_from_db()
    #     self.assertTrue(self.user.check_password('newpassword123'))
    #     confirmation_code.refresh_from_db()
    #     self.assertIsNone(confirmation_code.code)

    # def test_change_email(self):
    #     new_email = 'newemail@example.com'
    #     url = reverse('change_email', kwargs={'user_id': self.user.id})
    #     response = self.client.put(url, {'email': new_email}, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.user.refresh_from_db()
    #     self.assertEqual(self.user.email, new_email)

    # def test_check_email_existing(self):
    #     url = reverse('check_email')
    #     response = self.client.post(url, {'email': self.user.email}, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertEqual(response.data['details'], 'Email already exists')

    # def test_check_username_existing(self):
    #     url = reverse('check_username')
    #     response = self.client.post(url, {'username': self.user.username}, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertEqual(response.data['details'], 'Username already exists')
