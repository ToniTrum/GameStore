from .models import Library, Wishlist
from rest_framework import serializers

class LibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = ['user', 'game']

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['user', 'game']