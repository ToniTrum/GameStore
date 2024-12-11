from .models import Library
from rest_framework import serializers

class LibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = ['user', 'game']