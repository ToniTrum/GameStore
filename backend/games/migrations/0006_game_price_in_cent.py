# Generated by Django 5.1.3 on 2024-12-08 00:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0005_alter_screenshot_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='price_in_cent',
            field=models.PositiveIntegerField(default=0),
        ),
    ]