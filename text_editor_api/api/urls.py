from django.urls import path
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    RegisterView,
    ThemeView,
    LanguageView,
    CodeView,
    CodeSubmitView,
    AuthenticatedUserView,
    UserCodeView,
    UserDeleteView,
    UpdateUserView,
    ChangePasswordView,
    UserImageView,
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
    path('user/delete/', UserDeleteView.as_view()),
    path('user/update/', UpdateUserView.as_view()),
    path('user/change-password/', ChangePasswordView.as_view()),
    path('user/image/<int:pk>/', UserImageView.as_view()),
]

urlpatterns += router.urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
