from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from . import views

urlpatterns = [
    path("token/", views.TokenView.as_view(), name="token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("check_password/<int:user_id>/", views.check_user_password, name="check_password"),
    path("update/<int:user_id>/", views.update_user, name="update"),
    path("subscribe/<int:user_id>/", views.subscribe_user, name="subscribe"),
    path("delete/<int:user_id>/", views.delete_user, name="delete"),

    path("create_reset_code/", views.create_reset_password_code, name="create_reset_code"),
    path("check_reset_code/", views.check_reset_password_code, name="check_reset_code"),
    path("reset_password/", views.reset_password, name="reset_password"),
]