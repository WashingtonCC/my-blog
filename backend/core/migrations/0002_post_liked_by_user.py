# Generated by Django 4.1.5 on 2023-02-01 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='liked_by_user',
            field=models.BooleanField(null=True),
        ),
    ]