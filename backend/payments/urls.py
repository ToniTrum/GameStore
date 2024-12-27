from django.urls import path

from . import views

urlpatterns = [
    path("test_payment/", views.test_payment, name="test_payment"),
    path("save_stripe_info/", views.save_stripe_info, name="save_stripe_info"),
]