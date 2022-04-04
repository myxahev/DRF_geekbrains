from rest_framework import serializers
from .models import CustomUser


class UserModelSerializer(serializers.HyperlinkedModelSerializer):
    cat = serializers.StringRelatedField()
    user_permissions = serializers.StringRelatedField()
    groups = serializers.StringRelatedField()
    class Meta:
        model = CustomUser
        # fields = "__all__"
        exclude = ['password']
