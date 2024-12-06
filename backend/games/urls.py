from django.urls import path
from . import views


urlpatterns = [
    # path("game/", views.GameView.as_view(), name="game"),
    path("platform/", views.PlatformView.as_view(), name="platform"),
    path("esrb_rating/", views.ESRBRatingView.as_view(), name="esrb_rating"),
    path("genre/", views.GenreView.as_view(), name="genre"),
]