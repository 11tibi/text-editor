from rest_framework import generics, permissions
from .serializers import RegisterSerializer
from .permissions import IsUnauthenticated


class RegisterView(generics.CreateAPIView):
    permission_classes = [IsUnauthenticated, ]
    serializer_class = RegisterSerializer
