# Generated by Django 3.2 on 2023-03-19 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('slug', models.SlugField(unique=True)),
                ('cover_img', models.ImageField(upload_to='images/')),
                ('content', models.TextField()),
                ('author_name', models.CharField(max_length=255)),
                ('author_description', models.TextField()),
            ],
        ),
    ]