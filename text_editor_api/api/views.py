from rest_framework import generics, permissions
from .serializers import RegisterSerializer
from .permissions import IsUnauthenticated
from rest_framework.views import APIView


class RegisterView(generics.CreateAPIView):
    permission_classes = [IsUnauthenticated, ]
    serializer_class = RegisterSerializer


class LogoutView(APIView):
    def post(self, request, format=None):
        pass
