from django.urls import path
from . import views

urlpatterns = [
    path("feedback/", views.FeedbackView.as_view(), name="feedback"),
    path("feedback/get/<int:user_id>/", views.get_feedback, name="get_feedback"),
    path("feedback/create/<int:user_id>/", views.create_feedback, name="create_feedback"),
]