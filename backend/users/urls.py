from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from . import views

urlpatterns = [
    path("token/", views.TokenView.as_view(), name="token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("check_password/<int:user_id>/", views.check_user_password, name="check_password"),
    path("check_email/", views.check_email, name="check_email"),
    path("check_username/", views.check_username, name="check_username"),
    path("update/<int:user_id>/", views.update_user, name="update_user"),
    path("subscribe/<int:user_id>/", views.subscribe_user, name="subscribe_user"),
    path("delete/<int:user_id>/", views.delete_user, name="delete_user"),
    path("recover/", views.recover_user, name="recover_user"),

    path("create_confirmation_code/", views.create_confirmation_code, name="create_confirmation_code"),
    path("check_confirmation_code/", views.check_confirmation_code, name="check_confirmation_code"),
    path("reset_password/", views.reset_password, name="reset_password"),
    path("change_email/<int:user_id>/", views.change_email, name="change_email"),
]