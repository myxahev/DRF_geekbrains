# Generated by Django 4.0.2 on 2022-03-09 14:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='birthday_year',
            field=models.PositiveIntegerField(null=True),
        ),
    ]
