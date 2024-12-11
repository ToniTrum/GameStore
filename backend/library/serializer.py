from .models import Library, Wishlist, Basket
from rest_framework import serializers

class LibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = ['user', 'game']

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['user', 'game']

class BasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Basket
        fields = ['user', 'game']