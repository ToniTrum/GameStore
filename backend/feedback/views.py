from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from .models import Feedback
from .serializer import FeedbackSerializer

from users.models import User

class FeedbackView(generics.ListAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsAdminUser]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_feedback(request, user_id):
    user = User.objects.get(id=user_id)
    feedback = Feedback.objects.filter(user=user)
    serializer = FeedbackSerializer(feedback, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_feedback(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        theme = request.data.get('theme')
        text = request.data.get('text')
        Feedback.objects.create(user=user, theme=theme, text=text)
        return Response({"message": "Feedback created"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"details": str(e)}, status=status.HTTP_400_BAD_REQUEST)

