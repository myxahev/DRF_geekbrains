from django.shortcuts import render
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo
from .serializers import ProjectSerializer, ToDoSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class ProjectViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        name = self.request.query_params.get('name', '')
        projects = Project.objects.all()
        if name:
            projects = projects.filter(name__contains=name)
        return projects


class ToDoViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer