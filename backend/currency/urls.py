from django.urls import path
from . import views

urlpatterns = [
    path("currency_rates/", views.CurrencyRateView.as_view(), name="currency_rates"),
    path("currency_rates/get/<str:currency_code>/", views.get_currency_rate, name="get_currency_rate"),
    path("country/", views.CountryView.as_view(), name="country"),
    path("country/get/<int:numeric_code>/", views.CountryView.get_country, name="get_country"),
]