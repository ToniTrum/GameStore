# Generated by Django 5.1.3 on 2024-12-07 02:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0003_genre'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=128)),
            ],
        ),
    ]