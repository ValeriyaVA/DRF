from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from .models import Project, TODO


class ProjectSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

# class PostSerializer(serializers.ModelSerializer):
#     tag = TagSerializer(read_only=True, many=True)

#     class Meta:
#         model = Post
#         fields = ('tag', 'text',)


class TodoSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'
