from django.contrib import admin
from django.conf import settings

from .models import Feedback

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('theme', 'status', 'created_at', 'updated_at', 'user')

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        return form
    
    class Media:
        js = (settings.STATIC_URL + 'js/admin_feedback.js',)
