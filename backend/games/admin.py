from django.contrib import admin
from .models import Platform, ESRBRating, Genre, Tag

@admin.register(Platform)
class PlatformAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon')

@admin.register(ESRBRating)
class ESRBRatingAdmin(admin.ModelAdmin):
    list_display = ('id', 'name_en', 'name_ru', 'image')

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')