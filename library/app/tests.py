import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from TODO.serializers import ProjectSerializer
from .views import AuthorModelViewSet
from .models import Author
from TODO.models import Project, TODO


class TestAuthorViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/authors/')
        view = AuthorModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors', {
            'firstname': 'Андрей',
            'lastname': 'Пушчь',
            'birthday_year': 1996,
            'email': 'qq@mail.ru'
        })
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_detail(self):
        author = Author.objects.create(
            firstname='Александр', lastname='Пушчь', birthday_year=1996, email='qq@mail.ru')
        client = APIClient()
        response = client.get(f'/api/authors/{author.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestProjectViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/project/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_mixer(self):
        mission = mixer.blend(TODO)
        admin = User.objects.create_superuser(
            'admin', 'admin@admin.com', 'admin')
        self.client.login(username='admin', password='admin')
        response = self.client.get(f'/api/todo/{mission.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
