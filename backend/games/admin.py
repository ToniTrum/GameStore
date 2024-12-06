from django.contrib import admin
from .models import Game, Platform

@admin.register(Platform)
class PlatformAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon')
