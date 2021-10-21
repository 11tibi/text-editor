from django.urls import path
from .views import RegisterView, ThemeView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('theme/', ThemeView.as_view()),
]
