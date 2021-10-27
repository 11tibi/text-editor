from django.urls import path
from .views import (
    RegisterView,
    ThemeView,
    LanguageView,
    CodeView
)

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('theme/', ThemeView.as_view()),
    path('language/', LanguageView.as_view()),
    path('code/', CodeView.as_view()),
]
