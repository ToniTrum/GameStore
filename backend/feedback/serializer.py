from .models import Feedback
from rest_framework import serializers

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['theme', 'text', 'status', 'created_at', 'user', 'admin']