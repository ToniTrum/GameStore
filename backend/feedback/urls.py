from django.urls import path
from . import views

urlpatterns = [
    path("feedback/", views.FeedbackView.as_view(), name="feedback"),

    path("feedback/get/<int:user_id>/", views.get_feedback, name="get_feedback"),
    path("feedback/get_by_id/<int:feedback_id>/", views.get_feedback_by_id, name="get_feedback_by_id"),

    path("feedback/create/<int:user_id>/", views.create_feedback, name="create_feedback"),
]