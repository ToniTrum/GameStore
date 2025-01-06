from django.contrib import admin

from .models import Feedback

admin.site.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('theme', 'status', 'created_at', 'user')
