# Generated by Django 4.1.4 on 2022-12-31 10:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('matches', '0009_alter_matches_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tickets',
            options={'ordering': ['match']},
        ),
    ]
