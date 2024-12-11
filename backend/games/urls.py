from django.urls import path
from . import views


urlpatterns = [
    path("platform/", views.PlatformView.as_view(), name="platform"),
    path("esrb_rating/", views.ESRBRatingView.as_view(), name="esrb_rating"),
    path("genre/", views.GenreView.as_view(), name="genre"),
    path("tag/", views.TagView.as_view(), name="tag"),
    path("developer/", views.DeveloperView.as_view(), name="developer"),
    path("screenshot/", views.ScreenshotView.as_view(), name="screenshot"),
    path("game/", views.GameView.as_view(), name="game"),
    path("requirement/", views.RequirementView.as_view(), name="requirement"),
    path("random_games/", views.RandomGamesView.as_view(), name="random_games"),
]