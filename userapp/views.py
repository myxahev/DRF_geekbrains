from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import CustomUser
from .serializers import UserModelSerializer
from rest_framework import mixins
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer


# class UserModelViewSet(ModelViewSet):
#     queryset = CustomUser.objects.all()
#     serializer_class = UserModelSerializer

class UsersCustomViewSet(mixins.RetrieveModelMixin,
                           mixins.UpdateModelMixin,
                           mixins.ListModelMixin,
                           GenericViewSet):
   queryset = CustomUser.objects.all()
   serializer_class = UserModelSerializer
   renderer_classes = [JSONRenderer, BrowsableAPIRenderer]