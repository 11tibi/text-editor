from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import (
    RegisterSerializer,
    ThemeSerializer,
    LanguageSerializer
)
from .permissions import IsUnauthenticated
from .models import Theme, Language
from .judge0_api import Judge0


class RegisterView(generics.CreateAPIView):
    permission_classes = [IsUnauthenticated, ]
    serializer_class = RegisterSerializer


class ThemeView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = ThemeSerializer
    queryset = Theme.objects.all()


class LanguageView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = LanguageSerializer
    queryset = Language.objects.all()


class CodeView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request):
        pass

    def post(self, request):
        pass

    def put(self, request):
        pass

    def delete(self, request):
        pass
