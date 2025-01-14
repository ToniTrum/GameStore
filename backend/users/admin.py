from django.contrib import admin
from .models import User, Profile, ResetPasswordCode

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email')

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'birthdate', 'country', 'image', 'subscribed')
    list_editable = ['subscribed']

@admin.register(ResetPasswordCode)
class ResetPasswordCodeAdmin(admin.ModelAdmin):
    list_display = ('user', 'code', 'created_at')
