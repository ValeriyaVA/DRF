from django.db import models
from uuid import uuid4


class Author(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
    date = models.PositiveIntegerField()
