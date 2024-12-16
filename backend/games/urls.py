from django.urls import path
from . import views


urlpatterns = [
    path("platform/", views.PlatformView.as_view(), name="platform"),

    path("esrb_rating/", views.ESRBRatingView.as_view(), name="esrb_rating"),

    path("genre/", views.GenreView.as_view(), name="genre"),
    path("genre/get/<int:genre_id>/", views.get_genre, name="get_genre"),

    path("tag/", views.TagView.as_view(), name="tag"),

    path("developer/", views.DeveloperView.as_view(), name="developer"),

    path("screenshot/", views.ScreenshotView.as_view(), name="screenshot"),
    path("screenshot/get/<int:screenshot_id>/", views.get_screenshot, name="get_screenshot"),

    path("game/", views.GameView.as_view(), name="game"),
    path("game/get/<int:game_id>/", views.get_game, name="get_game"),
    path("random_games/<int:user_id>", views.get_random_games, name="random_games"),

    path("requirement/", views.RequirementView.as_view(), name="requirement"),
    
]