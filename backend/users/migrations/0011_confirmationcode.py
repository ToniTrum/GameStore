# Generated by Django 5.1.3 on 2025-01-20 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_resetpasswordcode'),
    ]

    operations = [
        migrations.CreateModel(
            name='ConfirmationCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('code', models.CharField(max_length=4)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
