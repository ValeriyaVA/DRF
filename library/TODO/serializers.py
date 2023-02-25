from .models import Author
from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, TODO


class ProjectSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class AuthorShortModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = ['firstname', 'lastname']


# class ProjectSerializerBase(HyperlinkedModelSerializer):
#     authors = AuthorShortModelSerializer(many=True, read_only=True)

#     class Meta:
#         model = Project
#         fields = ['project_title', 'repolink', 'authors']


class TodoSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'
