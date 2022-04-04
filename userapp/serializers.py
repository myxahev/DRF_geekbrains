from rest_framework import serializers
from .models import CustomUser


class UsersSerializer(serializers.HyperlinkedModelSerializer):
    # user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # cat = serializers.StringRelatedField()
    # user_permissions = serializers.StringRelatedField()
    # groups = serializers.StringRelatedField()
    # group-detail = serializers.StringRelatedField()
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'first_name', 'last_name')
        # exclude = ['password', 'is_staff', 'is_superuser']

class UsersDetailSerializer(serializers.HyperlinkedModelSerializer):
    # user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    cat = serializers.StringRelatedField()
    # user_permissions = serializers.StringRelatedField()
    # groups = serializers.StringRelatedField()
    # group-detail = serializers.StringRelatedField()
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'first_name', 'last_name', 'is_superuser', 'is_staff', 'cat')
        # exclude = ['password', 'is_staff', 'is_superuser']
