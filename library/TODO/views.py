from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from .models import Project, TODO
from .serializers import ProjectSerializer, TodoSerializer
from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter
from rest_framework.response import Response


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20

# модель Project: доступны все варианты запросов; для постраничного вывода
# установить размер страницы 10 записей; добавить фильтрацию по совпадению части
# названия проекта


class ProjectViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter

# модель ToDo: доступны все варианты запросов; при удалении не удалять ToDo, а
# выставлять признак, что оно закрыто; добавить фильтрацию по проекту; для
# постраничного вывода установить размер страницы 20


class TodoViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = TODO.objects.all()
    serializer_class = TodoSerializer
    pagination_class = TodoLimitOffsetPagination
    filterset_fields = ['project']

    # переопределяем метод удаления заметок, в mark_close меняем статус на true

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.mark_close is False:
            instance.mark_close = True
            instance.save()
            return Response()
        return Response()
