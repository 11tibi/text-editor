from rest_framework import generics, permissions
from .serializers import RegisterSerializer, ThemeSerializer
from .permissions import IsUnauthenticated
from .models import Theme
from rest_framework.views import APIView


class RegisterView(generics.CreateAPIView):
    permission_classes = [IsUnauthenticated, ]
    serializer_class = RegisterSerializer


class ThemeView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = ThemeSerializer
    queryset = Theme.objects.all()
