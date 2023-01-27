from rest_framework.viewsets import GenericViewSet
from .models import Author
from .serializers import AuthorModelSerializer
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework import mixins

# модель Author: есть возможность просмотра списка и каждого пользователя в отдельности,
# можно вносить изменения, нельзя удалять и создавать


class AuthorModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer
