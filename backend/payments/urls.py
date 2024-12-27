from django.urls import path

from . import views

urlpatterns = [
    path("save_stripe_info/", views.save_stripe_info, name="save_stripe_info"),
]