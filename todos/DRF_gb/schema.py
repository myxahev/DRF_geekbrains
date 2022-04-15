import graphene
from graphene_django import DjangoObjectType
from main.models import ToDo, Project
from userapp.models import CustomUser

class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser

    fields = '__all__'

class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo

    fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todos = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)
    todo_by_id = graphene.Field(ToDoType, id=graphene.Int(required=True))
    todo_by_author_name = graphene.List(ToDoType,
                                         name=graphene.String(required=False))

    def resolve_all_users(root, info):
        return CustomUser.objects.all()


    def resolve_all_todos(root, info):
        return ToDo.objects.all()


    def resolve_all_projects(root, info):
        return Project.objects.all()


    def resolve_todo_by_id(self, info, id):
        try:
            return ToDo.objects.get(id=id)
        except ToDo.DoesNotExist:
            return None


    def resolve_todos_by_project_name(self, info, name=None):
        todos = ToDo.objects.all()

        if name:
            todos = todos.filter(project__name=name)
        return todos


schema = graphene.Schema(query=Query)

