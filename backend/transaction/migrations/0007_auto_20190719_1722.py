# Generated by Django 2.2.2 on 2019-07-19 15:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0006_auto_20190719_1716'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recurringtransaction',
            name='day_delta',
        ),
        migrations.RemoveField(
            model_name='recurringtransaction',
            name='month_delta',
        ),
    ]
