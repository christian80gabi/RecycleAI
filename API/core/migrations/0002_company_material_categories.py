# Generated by Django 4.2.11 on 2024-04-28 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="company",
            name="material_categories",
            field=models.CharField(blank=True, default="OTHER", max_length=500),
        ),
    ]