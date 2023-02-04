from django_filters import rest_framework as filters
from .models import Project


class ProjectFilter(filters.FilterSet):
    project_title = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['project_title']


# class TodoFilter(filters.FilterSet):
