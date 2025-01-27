from unittest import mock
from rest_framework import status
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient

from users.models import User
from currency.models import Country, CurrencyRate


class PaymentTests(APITestCase):
    def setUp(self):
        self.client = APIClient()

        self.currency = CurrencyRate.objects.create(currency_code="RUB", rate=1.0000)
        self.country = Country.objects.create(name_ru="Россия", currency=self.currency, currency_symbol="₽", numeric_code=840)

        self.user = User.objects.create_user(username='testuser', password='testpassword', email='testuser@example.com')
        self.client.force_authenticate(user=self.user)

    @mock.patch('stripe.Customer.list')
    @mock.patch('stripe.PaymentIntent.create')
    @mock.patch('stripe.Customer.create')
    def test_save_stripe_info(self, mock_customer_create, mock_payment_intent_create, mock_customer_list):
        mock_customer_list.return_value = mock.MagicMock(data=[])
        mock_customer_create.return_value = mock.MagicMock(id='cus_test_id')
        mock_payment_intent_create.return_value = {'id': 'pi_test_id'}

        data = {
            'email': 'testuser@example.com',
            'payment_method_id': 'pm_test_id',
            'price': 1000
        }

        response = self.client.post(reverse('save_stripe_info'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.assertEqual(response.data['message'], 'Success')
        self.assertEqual(response.data['data']['customer_id'], mock.ANY)
        self.assertEqual(response.data['data']['extra_msg'], '')

        mock_customer_list.assert_called_with(email='testuser@example.com')
        mock_payment_intent_create.assert_called_with(
            customer=mock.ANY,
            payment_method='pm_test_id',
            currency='usd',
            amount=1000,
            confirm=True,
            return_url='http://localhost:5173/user/id/16/payment'
        )
