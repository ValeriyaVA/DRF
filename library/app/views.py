from rest_framework.viewsets import GenericViewSet
from .models import Author
from .serializers import AuthorModelSerializer
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework import mixins
# from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Author
from .serializers import AuthorModelSerializer, AuthorFullModelSerializer

# модель Author: есть возможность просмотра списка и каждого пользователя в отдельности,
# можно вносить изменения, нельзя удалять и создавать

# mixins.CreateModelMixin,


class AuthorModelViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return AuthorFullModelSerializer
        return AuthorModelSerializer
