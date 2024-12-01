# Generated by Django 5.1.3 on 2024-12-01 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('currency', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('numeric_code', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('name_ru', models.CharField(max_length=64)),
                ('currency', models.CharField(max_length=3)),
                ('currency_symbol', models.CharField(max_length=3)),
            ],
        ),
    ]
