from .models import User, ResetPasswordCode
from currency.models import Country

from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from datetime import date


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class TokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email

        token['first_name'] = user.profile.first_name
        token['last_name'] = user.profile.last_name

        birthdate = user.profile.birthdate
        token['birthdate'] = birthdate.strftime('%Y-%m-%d') if isinstance(birthdate, date) else None

        token['country'] = user.profile.country.numeric_code
        token['image'] = str(user.profile.image)
        token['subscribed'] = user.profile.subscribed

        return token
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(write_only=True, required=True)
    last_name = serializers.CharField(write_only=True, required=True)
    birthdate = serializers.DateField(write_only=True, required=True)
    country = serializers.PrimaryKeyRelatedField(
        queryset=Country.objects.all(), write_only=True, required=True
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'first_name', 'last_name', 'birthdate', 'country']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Пароль не соответствует!"})

        return attrs
    
    def create(self, validated_data):
        profile_data = {
            'first_name': validated_data.pop('first_name'),
            'last_name': validated_data.pop('last_name'),
            'birthdate': validated_data.pop('birthdate'),
            'country': validated_data.pop('country'),
        }

        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()

        profile = user.profile
        for key, value in profile_data.items():
            setattr(profile, key, value)
        profile.save()

        return user
    
class ResetPasswordCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResetPasswordCode
        fields = ['user', 'code', 'created_at']