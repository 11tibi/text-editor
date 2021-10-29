from rest_framework import generics, permissions, viewsets
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    RegisterSerializer,
    ThemeSerializer,
    LanguageSerializer,
    CodeSerializer
)
from .permissions import IsUnauthenticated
from .models import Theme, Language, Code
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


class CodeView(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = Code.objects.all()

    def retrieve(self, request, pk=None):
        item = get_object_or_404(self.queryset, pk=pk)
        serializer = CodeSerializer(item)
        return Response(serializer.data)

    def create(self, request):
        serializer = CodeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        if Code.objects.filter(user_id=request.user.id).exists():
            pass
        else:
            return Response(
                {'Access forbidden': 'You don\'t have permission to access this resource'},
                status=status.HTTP_403_FORBIDDEN
            )

    def delete(self, request, pk=None):
        pass
