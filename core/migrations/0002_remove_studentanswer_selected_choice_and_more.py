# Generated by Django 5.2.1 on 2025-05-11 19:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studentanswer',
            name='selected_choice',
        ),
        migrations.RemoveField(
            model_name='course',
            name='teacher',
        ),
        migrations.RemoveField(
            model_name='quiz',
            name='course',
        ),
        migrations.RemoveField(
            model_name='studentanswer',
            name='question',
        ),
        migrations.RemoveField(
            model_name='studentanswer',
            name='student',
        ),
        migrations.RemoveField(
            model_name='feedback',
            name='student',
        ),
        migrations.RemoveField(
            model_name='feedback',
            name='text',
        ),
        migrations.RemoveField(
            model_name='question',
            name='text',
        ),
        migrations.RemoveField(
            model_name='quiz',
            name='title',
        ),
        migrations.AddField(
            model_name='feedback',
            name='etudiant',
            field=models.ForeignKey(default=1, limit_choices_to={'role': 'student'}, on_delete=django.db.models.deletion.CASCADE, to='core.profile', verbose_name='Étudiant'),
        ),
        migrations.AddField(
            model_name='feedback',
            name='texte',
            field=models.TextField(blank=True, null=True, verbose_name='Feedback'),
        ),
        migrations.AddField(
            model_name='question',
            name='texte',
            field=models.TextField(default='Question par défaut', verbose_name='Texte de la question'),
        ),
        migrations.AddField(
            model_name='quiz',
            name='titre',
            field=models.CharField(default='Titre par défaut', max_length=100, verbose_name='Titre du quiz'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='feedback',
            name='quiz',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.quiz', verbose_name='Quiz'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='role',
            field=models.CharField(choices=[('student', 'Étudiant'), ('teacher', 'Enseignant')], default='student', max_length=10),
        ),
        migrations.AlterField(
            model_name='question',
            name='quiz',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.quiz', verbose_name='Quiz'),
        ),
        migrations.CreateModel(
            name='Choix',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('texte', models.CharField(max_length=200, verbose_name='Choix')),
                ('est_correct', models.BooleanField(default=False, verbose_name='Est correct ?')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.question', verbose_name='Question')),
            ],
        ),
        migrations.CreateModel(
            name='Cour',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.CharField(max_length=200, verbose_name='Titre du cours')),
                ('description', models.TextField(verbose_name='Description')),
                ('enseignant', models.ForeignKey(limit_choices_to={'role': 'teacher'}, on_delete=django.db.models.deletion.CASCADE, to='core.profile', verbose_name='Enseignant')),
            ],
        ),
        migrations.AddField(
            model_name='quiz',
            name='cours',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.cour', verbose_name='Cours'),
        ),
        migrations.CreateModel(
            name='RéponseÉtudiant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('choix_sélectionné', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.choix', verbose_name='Choix sélectionné')),
                ('etudiant', models.ForeignKey(limit_choices_to={'role': 'student'}, on_delete=django.db.models.deletion.CASCADE, to='core.profile', verbose_name='Étudiant')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.question', verbose_name='Question')),
            ],
        ),
        migrations.DeleteModel(
            name='Choice',
        ),
        migrations.DeleteModel(
            name='Course',
        ),
        migrations.DeleteModel(
            name='StudentAnswer',
        ),
    ]
