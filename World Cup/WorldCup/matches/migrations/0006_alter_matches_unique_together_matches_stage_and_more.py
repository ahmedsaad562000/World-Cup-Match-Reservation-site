# Generated by Django 4.1.4 on 2022-12-29 19:32

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('matches', '0005_alter_teams_link'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='matches',
            unique_together=set(),
        ),
        migrations.AddField(
            model_name='matches',
            name='stage',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='matches',
            unique_together={('h_team', 'a_team', 'stadium', 'date', 'time', 'stage', 'ref', 'line1', 'line2')},
        ),
        migrations.AlterUniqueTogether(
            name='tickets',
            unique_together={('match', 'user', 'row', 'seat')},
        ),
    ]
