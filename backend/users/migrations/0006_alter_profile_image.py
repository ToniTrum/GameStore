# Generated by Django 5.1.3 on 2024-12-11 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(default='static/img/default-avatar.jpg', upload_to='static/img'),
        ),
    ]