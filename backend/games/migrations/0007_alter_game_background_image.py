# Generated by Django 5.1.3 on 2024-12-08 00:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0006_game_price_in_cent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='background_image',
            field=models.URLField(default='https://t3.ftcdn.net/jpg/04/84/88/76/360_F_484887682_Mx57wpHG4lKrPAG0y7Q8Q7bJ952J3TTO.jpg'),
        ),
    ]