from django.urls import path
from . import views


urlpatterns = [
    path("platform/", views.PlatformView.as_view(), name="platform"),
    # path("game/", views.GameView.as_view(), name="game"),
]