from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from django.urls import reverse

from currency.models import Country, CurrencyRate
from users.models import ConfirmationCode, User, Profile

from datetime import datetime
import random

class UserProfileTests(APITestCase):

    def setUp(self):
        self.currency = CurrencyRate.objects.create(currency_code="RUB", rate=1.0000)
        self.country, created = Country.objects.update_or_create(
            name_ru='Россия', 
            numeric_code=643, 
            currency=self.currency, 
            currency_symbol='₽'
        )

        self.admin = User.objects.create_superuser(username='admin', password='adminpass', email="admin@mail.ru")
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
        self.client.force_authenticate(user=self.user)
        self.client.force_authenticate(user=self.admin)

    def test_users_view_token(self):
        response = self.client.post(reverse('token'), data={
            'username': self.user.username,
            'password': 'testpassword',
            'email': self.user.email
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_users_view_token_refresh(self):
        response = self.client.post(reverse('token'), data={
            'username': self.user.username,
            'password': 'testpassword',
            'email': self.user.email
        }, format='json')

        refresh_token = response.data.get('refresh')
        if refresh_token:
            refresh_response = self.client.post(reverse('token_refresh'), data={
                'refresh': refresh_token
            }, format='json')

            self.assertEqual(refresh_response.status_code, status.HTTP_200_OK)
            self.assertIn('access', refresh_response.data)
        else:
            self.fail("Refresh token not found")

    def test_users_view_register(self):
        user_data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'tonitrum1',
            'password2': 'tonitrum1',
            'first_name': 'New',
            'last_name': 'User',
            'birthdate': '1995-05-15',
            'country': self.country.numeric_code
        }
        user_data['birthdate'] = datetime.strptime(user_data['birthdate'], '%Y-%m-%d').date()

        response = self.client.post(reverse('register'), user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(get_user_model().objects.count(), 3)

        new_user = get_user_model().objects.last()
        self.assertEqual(new_user.username, user_data['username'])
        self.assertEqual(new_user.email, user_data['email'])

        new_profile = new_user.profile
        self.assertEqual(new_profile.first_name, user_data['first_name'])
        self.assertEqual(new_profile.last_name, user_data['last_name'])
        self.assertEqual(new_profile.birthdate, user_data['birthdate'])
        self.assertEqual(new_profile.country.numeric_code, user_data['country'])

    def test_users_view_check_password(self):
        url = reverse('check_password', kwargs={'user_id': self.user.id})
        response = self.client.post(url, {'password': 'testpassword'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['details'], 'Password is valid')

    def test_users_view_check_password_invalid(self):
        url = reverse('check_password', kwargs={'user_id': self.user.id})
        response = self.client.post(url, {'password': 'wrongpassword'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['details'], 'Password is invalid')

    def test_users_view_check_email(self):
        url = reverse('check_email')
        response = self.client.post(url, data={'email': "free@ya.ru"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['details'], 'Email does not exist')

    def test_users_view_check_email_exists(self):
        url = reverse('check_email')
        response = self.client.post(url, data={'email': self.user.email}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['details'], 'Email already exists')

    def test_users_view_check_email_deleted(self):
        self.user.deleted = True
        self.user.save()

        url = reverse('check_email')
        response = self.client.post(url, data={'email': self.user.email}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['details'], 'User is deleted')

    def test_user_view_check_username(self):
        url = reverse('check_username')
        response = self.client.post(url, data={'username': "freename"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['details'], 'Username does not exist')

    def test_users_view_check_username_exists(self):
        url = reverse('check_username')
        response = self.client.post(url, data={'username': self.user.username}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['details'], 'Username already exists')

    def test_users_view_check_username_deleted(self):
        self.user.deleted = True
        self.user.save()

        url = reverse('check_username')
        response = self.client.post(url, data={'username': self.user.username}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['details'], 'User is deleted')

    def test_users_view_update_user(self):
        url = reverse('update_user', kwargs={'user_id': self.user.id})
        response = self.client.put(url, data={
            'username': "newname",
            'email': self.user.email,
            "password": self.user_data['password'],
            "first_name": self.user_data['first_name'],
            "last_name": self.user_data['last_name'],
            "birthdate": self.user_data['birthdate'],
            "country": self.user_data['country'].name_ru
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['Детали'], 'Данные обновлены')

    def test_users_view_update_user_invalid_password(self):
        url = reverse('update_user', kwargs={'user_id': self.user.id})
        response = self.client.put(url, data={
            'username': "newname",
            'email': self.user.email,
            "password": "wrongpassword",
            "first_name": self.user_data['first_name'],
            "last_name": self.user_data['last_name'],
            "birthdate": self.user_data['birthdate'],
            "country": self.user_data['country'].name_ru
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['Детали'], 'Неверный пароль')

    
    def test_users_view_update_user_invalid_username(self):
        url = reverse('update_user', kwargs={'user_id': self.user.id})
        response = self.client.put(url, data={
            'username': self.admin.username,
            'email': self.user.email,
            "password": self.user_data['password'],
            "first_name": self.user_data['first_name'],
            "last_name": self.user_data['last_name'],
            "birthdate": self.user_data['birthdate'],
            "country": self.user_data['country'].name_ru
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['Детали'], 'Пользователь с таким именем уже существует')

    def test_users_view_subscribe_user(self):
        url = reverse('subscribe_user', kwargs={'user_id': self.user.id})
        response = self.client.put(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['details'], "User subscribed {user.profile.subscribed}")

    def test_users_view_subscribe_user_unsubscribe(self):
        self.user.profile.subscribed = True
        self.user.profile.save()

        url = reverse('subscribe_user', kwargs={'user_id': self.user.id})
        response = self.client.put(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['details'], "User subscribed {user.profile.subscribed}")

    def test_users_view_delete_user(self):
        self.client.force_authenticate(user=self.user)

        url = reverse('delete_user', kwargs={'user_id': self.user.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data['detail'], "User deleted")

    def test_users_view_delete_user_invalid_user(self):
        self.client.force_authenticate(user=self.admin)

        url = reverse('delete_user', kwargs={'user_id': self.user.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data['detail'], "Вы не можете удалить чужой аккаунт.")

    def test_users_view_delete_user_invalid_user(self):
        url = reverse('delete_user', kwargs={'user_id': 999})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'], "Пользователь не найден.")

    def test_users_view_recover_user_by_username(self):
        self.user.deleted = True
        self.user.save()

        url = reverse('recover_user')
        response = self.client.put(url, data={'recover': self.user.username}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['details'], "User recovered")
        self.user.refresh_from_db()
        self.assertEqual(self.user.deleted, False)

    def test_users_view_recover_user_by_email(self):
        self.user.deleted = True
        self.user.save()

        url = reverse('recover_user')
        response = self.client.put(url, data={'recover': self.user.email}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['details'], "User recovered")
        self.user.refresh_from_db()
        self.assertEqual(self.user.deleted, False)

    def test_users_view_recover_user_invalid_value(self):
        url = reverse('recover_user')
        response = self.client.put(url, data={'recover': "freename"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['details'], "User not found")

