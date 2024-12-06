from models import Game, Platform
from rest_framework import serializers

class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ['name', 'icon']
