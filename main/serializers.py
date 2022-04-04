from rest_framework import serializers
from .models import Project, ToDo


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.StringRelatedField()

    class Meta:
        model = ToDo
        exclude = ['is_active']

class ToDoSerializerBase(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'