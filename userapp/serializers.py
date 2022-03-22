from rest_framework import serializers
from .models import CustomUser


class UserModelSerializer(serializers.HyperlinkedModelSerializer):
    cat = serializers.StringRelatedField()
    class Meta:
        model = CustomUser
        fields = "__all__"
