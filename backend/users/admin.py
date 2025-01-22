from django.contrib import admin
from .models import User, Profile, ConfirmationCode

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'deleted', 'deleted_at')
    list_editable = ['deleted']

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'birthdate', 'country', 'image', 'subscribed')
    list_editable = ['subscribed']

@admin.register(ConfirmationCode)
class ConfirmationCodeAdmin(admin.ModelAdmin):
    list_display = ('email', 'code', 'created_at')
