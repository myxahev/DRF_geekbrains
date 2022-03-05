from django.db import models
from userapp.models import CustomUser

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=150)
    repo_url = models.CharField(max_length=350)
    users = models.ManyToManyField(CustomUser)


class ToDo(models.Model):
    title = models.CharField(max_length=150)
    text = models.TextField()
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    project = models.ForeignKey(Project, models.PROTECT)
    author = models.OneToOneField(CustomUser, on_delete=models.CASCADE)