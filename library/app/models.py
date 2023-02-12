from django.db import models
from uuid import uuid4


class Author(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    author_name = models.CharField(max_length=64)
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
    birthday_year = models.PositiveIntegerField()
    email = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.author_name
