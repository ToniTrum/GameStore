from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt
from django.db.utils import IntegrityError

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
import random

from .models import User, Profile, ResetPasswordCode
from currency.models import Country
from .serializer import TokenSerializer, RegisterSerializer, ResetPasswordCodeSerializer

class TokenView(TokenObtainPairView):
    serializer_class = TokenSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        if check_password(request.data.get('password'), user.password):
            user.username = request.data.get('username')
            user.save()

            profile = Profile.objects.get(user=user)
            profile.first_name = request.data.get('first_name')
            profile.last_name = request.data.get('last_name')
            profile.birthdate = request.data.get('birthdate')
            profile.country = Country.objects.get(name_ru=request.data.get('country'))
            if request.FILES.get('image'):
                profile.image = request.FILES['image']
            profile.save()
            
            return Response({
                'Детали': 'Данные обновлены'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'Детали': 'Неверный пароль'
            }, status=status.HTTP_400_BAD_REQUEST)
    except IntegrityError:
        return Response(
            {"Детали": "Пользователь с таким именем уже существует"},
            status=status.HTTP_401_UNAUTHORIZED
        )
    except Exception as e:
        return Response(
            {"Детали": f"Произошла ошибка: \n{str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def subscribe_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user.profile.subscribed = not user.profile.subscribed
        user.profile.save()
        return Response({f"details": "User subscribed {user.profile.subscribed}"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"details": f"error: \n{str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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

@api_view(["POST"])
@permission_classes([AllowAny])
def create_reset_password_code(request):
    try:
        email = request.data.get('email')
        user = User.objects.get(email=email)
        code = ''.join(str(random.randint(0, 9)) for _ in range(4))
        reset_password_code, created = ResetPasswordCode.objects.update_or_create(
            user=user,
            defaults={'code': code}
        )
        reset_password_code.send_code_to_email()
        return Response({"details": "Reset password code sent"}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"details": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"details": f"error: \n{str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["POST"])
@permission_classes([AllowAny])
def check_reset_password_code(request):
    try:
        email = request.data.get('email')
        user = User.objects.get(email=email)
        code = request.data.get('code')
        reset_password_code = ResetPasswordCode.objects.get(user=user)
        if reset_password_code.code == code:
            return Response({"details": "Reset password code is valid"}, status=status.HTTP_200_OK)
        else:
            return Response({"details": "Reset password code is invalid"}, status=status.HTTP_400_BAD_REQUEST)
    except ResetPasswordCode.DoesNotExist:
        return Response({"details": "Reset password code not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"details": f"error: \n{str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@csrf_exempt
@api_view(["PUT"])
@permission_classes([AllowAny])
def reset_password(request):
    try:
        email = request.data.get('email')
        user = User.objects.get(email=email)
        reset_password_code = ResetPasswordCode.objects.get(user=user)
        user.set_password(request.data.get('password'))
        user.save()
        reset_password_code.delete()
        return Response({f"details": "Password changed"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"details": f"error: \n{str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)