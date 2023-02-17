from django.db import models
from app.models import Author
# from uuid import uuid4

# создаём модели


class Project(models.Model):
    project_title = models.CharField(max_length=255, blank=False,
                                     unique=True, verbose_name="Название проекта")
    repolink = models.URLField(
        max_length=200, verbose_name="Ссылка на репозиторий")
    authors = models.ManyToManyField(Author, verbose_name="Авторы")

    def __str__(self):
        return self.project_title


class TODO(models.Model):
    STATES = (('To Do', 'to do',),
              ('Делается', 'in progress'), ('Сделано', 'done'))
    project = models.ForeignKey(Project, models.PROTECT, verbose_name="Проект")
    note = models.TextField(verbose_name="Текст заметки")
    author = models.ForeignKey(
        Author, on_delete=models.CASCADE, verbose_name="Автор заметки")
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name="Создано")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Обновлено")
    status = models.CharField(
        max_length=11, choices=STATES, default='todo', verbose_name="Статус")
    mark_close = models.BooleanField(default=False)
