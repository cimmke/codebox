from .serializers import VisitorSerializer
from rest_framework import generics


class VisitorCreate(generics.CreateAPIView):
    serializer_class = VisitorSerializer
