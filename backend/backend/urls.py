from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('currency/', include('currency.urls')),
    path("games/", include("games.urls")),
    path("library/", include("library.urls")),
    path("payments/", include("payments.urls")),
    path("feedback/", include("feedback.urls")),
]
