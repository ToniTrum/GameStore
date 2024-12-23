# Generated by Django 5.1.3 on 2024-12-07 09:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Developer',
            fields=[
                ('id', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.RenameField(
            model_name='game',
            old_name='rating',
            new_name='esrb_rating',
        ),
        migrations.AddField(
            model_name='game',
            name='developers',
            field=models.ManyToManyField(to='games.developer'),
        ),
        migrations.CreateModel(
            name='Requirement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('minimal', models.TextField()),
                ('recommended', models.TextField()),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requirements', to='games.game')),
                ('platform', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requirements', to='games.platform')),
            ],
        ),
    ]
