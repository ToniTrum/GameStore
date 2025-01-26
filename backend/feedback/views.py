from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from .models import Feedback
from .serializer import FeedbackSerializer

from users.models import User

class FeedbackView(generics.ListAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsAdminUser]

class CommonPagination(PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return Response({
            'total_count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_feedback(request, user_id):
    user = User.objects.get(id=user_id)
    feedback = Feedback.objects.filter(user=user)
    serializer = FeedbackSerializer(feedback, many=True)
    paginator = CommonPagination()
    page = paginator.paginate_queryset(serializer.data, request)
    return paginator.get_paginated_response(page)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_feedback_by_id(request, feedback_id):
    feedback = Feedback.objects.get(id=feedback_id)
    serializer = FeedbackSerializer(feedback)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_feedback(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        theme = request.data.get('theme')
        text = request.data.get('text')
        file = request.data.get('file')
        Feedback.objects.create(user=user, theme=theme, text=text, file=file)
        return Response({"message": "Feedback created"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"details": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_feedback(request, feedback_id):
    try:
        theme = request.data.get('theme')
        text = request.data.get('text')
        file = request.data.get('file')

        feedback = Feedback.objects.get(id=feedback_id)
        feedback.theme = theme
        feedback.text = text
        if file is not None:
            feedback.file = file

        feedback.save()
        return Response({"message": "Feedback updated"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"details": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_feedback(request, feedback_id):
    try:
        feedback = Feedback.objects.get(id=feedback_id)
        if feedback.status != "Отправлено":
            return Response({"message": "Feedback can't be deleted"}, status=status.HTTP_400_BAD_REQUEST)
        feedback.delete()
        return Response({"message": "Feedback deleted"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"details": str(e)}, status=status.HTTP_400_BAD_REQUEST)
