# Generated by Django 5.1.3 on 2025-01-12 01:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_alter_profile_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='verified',
            new_name='subscribed',
        ),
    ]
