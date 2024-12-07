from django.contrib import admin
from .models import Platform, ESRBRating, Genre, Tag, Game, Screenshot

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

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'background_image', 'description', 'rating', 'release_date', 'get_platforms', 'get_genres', 'get_tags')

    def get_platforms(self, obj):
        return ", ".join([platform.name for platform in obj.platforms.all()])
    get_platforms.short_description = "Platforms"

    def get_genres(self, obj):
        return ", ".join([genre.name for genre in obj.genres.all()])
    get_genres.short_description = "Genres"

    def get_tags(self, obj):
        return ", ".join([tag.name for tag in obj.tags.all()])
    get_tags.short_description = "Tags"

@admin.register(Screenshot)
class ScreenshotAdmin(admin.ModelAdmin):
    list_display = ('id', 'image', 'game')
