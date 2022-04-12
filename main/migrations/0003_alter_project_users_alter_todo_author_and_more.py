# Generated by Django 4.0.2 on 2022-04-11 16:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='users',
            field=models.ManyToManyField(blank=True, null=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='todo',
            name='author',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='todo',
            name='title',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
