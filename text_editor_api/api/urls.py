from django.urls import path
from rest_framework import routers
from .views import (
    RegisterView,
    ThemeView,
    LanguageView,
    CodeView,
    CodeSubmitView,
    AuthenticatedUserView,
    UserCodeView,
)

router = routers.SimpleRouter()
router.register('code', CodeView, basename='code')

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('theme/', ThemeView.as_view()),
    path('language/', LanguageView.as_view()),
    path('submit/', CodeSubmitView.as_view()),
    path('user/', AuthenticatedUserView.as_view()),
    path('user/code/', UserCodeView.as_view()),
]

urlpatterns += router.urls
