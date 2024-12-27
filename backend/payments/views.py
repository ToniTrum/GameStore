import stripe
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_stripe_info(request):
    data = request.data
    email = data['email']
    payment_method_id = data['payment_method_id']
    extra_msg = ''
    customer_data = stripe.Customer.list(email=email).data
    
    if len(customer_data) == 0:
        customer = stripe.Customer.create(
        email=email, payment_method=payment_method_id)
    else:
        customer = customer_data[0]
        extra_msg = "Customer already existed."
    
    stripe.PaymentIntent.create(
        customer=customer, 
        payment_method=payment_method_id,  
        currency='usd',
        amount=999,
        confirm=True,
        return_url='http://localhost:5173/user/id/16/payment'
    )

    return Response(status=status.HTTP_200_OK, 
        data={'message': 'Success', 'data': {
        'customer_id': customer.id, 'extra_msg': extra_msg}
    })