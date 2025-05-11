from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    ROLE_CHOICES = (
        ('student', 'Étudiant'),
        ('teacher', 'Enseignant'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')  # 👈 ici

    def __str__(self):
        return f"{self.user.username} ({self.role})"

class Cour(models.Model):
    titre = models.CharField(max_length=200, verbose_name="Titre du cours")
    description = models.TextField(verbose_name="Description")
    enseignant = models.ForeignKey(Profile, on_delete=models.CASCADE, limit_choices_to={'role': 'teacher'}, verbose_name="Enseignant")

    def __str__(self):
        return self.titre

class Quiz(models.Model):
    cours = models.ForeignKey(Cour, on_delete=models.CASCADE, verbose_name="Cours", default=1)  # Remplacez 1 par l'ID d'un cours existant
    titre = models.CharField(max_length=100, verbose_name="Titre du quiz")

    def __str__(self):
        return f"{self.titre} - {self.cours.titre}"

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, verbose_name="Quiz")
    texte = models.TextField(verbose_name="Texte de la question", default="Question par défaut")  # Ajout d'une valeur par défaut

    def __str__(self):
        return self.texte

class Choix(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, verbose_name="Question")
    texte = models.CharField(max_length=200, verbose_name="Choix")
    est_correct = models.BooleanField(default=False, verbose_name="Est correct ?")

    def __str__(self):
        return self.texte

class RéponseÉtudiant(models.Model):
    etudiant = models.ForeignKey(Profile, on_delete=models.CASCADE, limit_choices_to={'role': 'student'}, verbose_name="Étudiant")
    question = models.ForeignKey(Question, on_delete=models.CASCADE, verbose_name="Question")
    choix_sélectionné = models.ForeignKey(Choix, on_delete=models.CASCADE, verbose_name="Choix sélectionné")

class Feedback(models.Model):
    etudiant = models.ForeignKey(Profile, on_delete=models.CASCADE, limit_choices_to={'role': 'student'}, verbose_name="Étudiant", default=1)  # Remplacez 1 par l'ID d'un profil existant
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, verbose_name="Quiz")
    texte = models.TextField(verbose_name="Feedback", null=True, blank=True)

    def __str__(self):
        return f"Feedback - {self.etudiant.user.username if self.etudiant else 'Aucun étudiant'} - {self.quiz.titre}"
