from django.urls import path
from . import views

urlpatterns = [
    path("library/", views.LibraryView.as_view(), name="library"),
    path("library/get/<int:user_id>/", views.get_user_library, name="get_user_library"),
    path("wishlist/", views.WishlistView.as_view(), name="wishlist"),
    path("basket/", views.BasketView.as_view(), name="basket"),
]