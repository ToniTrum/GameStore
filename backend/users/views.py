from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response


from .models import User
from .serializer import TokenSerializer, RegisterSerializer

class TokenView(TokenObtainPairView):
    serializer_class = TokenSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    if request.method == 'GET':
        context = f"Hello {request.user}"
        return Response({
            'response': context
        }, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        response = f"Hello {text}"
        return Response({
            'response': response
        }, status=status.HTTP_200_OK)
    else:
        return Response({}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_user(request, user_id):
    print("Заголовок Authorization:", request.headers.get("Authorization"))
    try:
        user = User.objects.get(id=user_id)

        if request.user != user:
            return Response(
                {"detail": "Вы не можете удалить чужой аккаунт."},
                status=status.HTTP_403_FORBIDDEN
            )

        user.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)
    except User.DoesNotExist:
        return Response(
            {"detail": "Пользователь не найден."},
            status=status.HTTP_404_NOT_FOUND
        )

    except Exception as e:
        return Response(
            {"detail": f"Произошла ошибка: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )