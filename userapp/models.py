from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4

from django.db.models.fields import UUIDField


class CustomUser(AbstractUser):
    uuid = UUIDField(primary_key=True, default=uuid4)
    email = models.EmailField(unique=True)