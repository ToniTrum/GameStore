from django.contrib import admin
from .models import Library, Wishlist

@admin.register(Library)
class LibraryAdmin(admin.ModelAdmin):
    list_display = ('user', 'game')

@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ('user', 'game')