# Generated by Django 5.1.3 on 2025-01-26 10:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0006_feedback_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='comment',
            field=models.TextField(blank=True, null=True),
        ),
    ]
