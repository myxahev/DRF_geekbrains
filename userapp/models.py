from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4

from django.db.models.fields import UUIDField


class CustomUser(AbstractUser):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150, blank=True)
    birthday_year = models.PositiveIntegerField(null=True)
    email = models.EmailField(unique=True)
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    cat = models.ForeignKey('Category', on_delete=models.PROTECT, null=True)

    def __str__(self):
        return self.last_name + " " + self.first_name

class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True)

    def __str__(self):
        return self.name
