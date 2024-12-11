from django.urls import path
from . import views

urlpatterns = [
    path("library/", views.LibraryView.as_view(), name="library"),
    path("wishlist/", views.WishlistView.as_view(), name="wishlist"),
    path("basket/", views.BasketView.as_view(), name="basket"),
]