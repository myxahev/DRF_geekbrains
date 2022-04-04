from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import CustomUser
from .serializers import UsersSerializer, UsersDetailSerializer
from rest_framework import mixins
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

# class UserModelViewSet(ModelViewSet):
#     queryset = CustomUser.objects.all()
#     serializer_class = UserModelSerializer

class UsersCustomViewSet(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UsersSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        if self.request.version == '2':
            return UsersDetailSerializer
        return UsersSerializer