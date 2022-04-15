from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, \
    APIClient, APITestCase
from mixer.backend.django import mixer
from .views import ToDoViewSet, ProjectViewSet
from .models import ToDo, Project

User = get_user_model()


class TestProjectViewSetTC(TestCase):
    # Установим предварительные настройки
    def setUp(self) -> None:
        self.admin = User.objects.create_superuser('admin', 'admin@mail.ru', '354657')  # создадим администратора
        self.project = Project.objects.create(name='Тестовый проект', repo_url='https://balalaka.com/')
        self.todos = ToDo.objects.create(title='Тестовая заметка', text='текст', author=self.admin,
                                         project=self.project)

    # Тест создания просмотра детальной информации о проекте неавторизованному пользователю
    def test_get_detail(self):
        client = APIClient()
        response = client.get(f'/api/projects/{self.project.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestProjectViewSetAPITC(APITestCase):
    # Установим предварительные настройки
    def setUp(self) -> None:
        self.admin = User.objects.create_superuser('admin', 'admin@mail.ru', '354657')  # создадим администратора
        self.project = Project.objects.create(name='Тестовый проект', repo_url='https://balalaka.com/')
        self.todos = ToDo.objects.create(title='Тестовая заметка', text='текст', author=self.admin,
                                         project=self.project)

    # Тест получения списка заметок
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/todos/')
        view = ToDoViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Тест изменения проекта авторизованным пользователем и проверка на изменение
    def test_edit_mixer(self):
        proj = mixer.blend(Project)
        self.client.login(username='admin', password='354657')
        response = self.client.put(f'/api/projects/{proj.id}/',
                                   {'name': 'имя', 'repo_url': 'https://balalaka.com/', 'users': []})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        proj = Project.objects.get(id=proj.id)
        self.assertEqual(proj.name, 'имя')

    # Тест создания заметки авторизованным пользователем
    def test_create_Project_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/projects/', {'name': 'имя', 'repo_url': 'https://balalaka.com/'})
        force_authenticate(request, self.admin)
        view = ProjectViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # Тест создания просмотра детальной информации о проекте неавторизованному пользователю
    def test_get_detail(self):
        # client = APIClient()
        response = self.client.get(f'/api/projects/{self.project.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)