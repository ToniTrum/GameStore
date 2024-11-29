from django.contrib import admin
from .models import Profile, User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'first_name', 'last_name', 'birth_day', 'country', 'verified']
    list_editable = ["verified"]
    