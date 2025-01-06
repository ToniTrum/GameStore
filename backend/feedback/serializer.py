from .models import Feedback
from rest_framework import serializers

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'theme', 'text', 'status', 'created_at', 'updated_at', 'user']
