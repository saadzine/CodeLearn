from django.contrib import admin
from .models import Profile, Cour, Quiz, Question, Choix, RéponseÉtudiant, Feedback

admin.site.register(Profile)
admin.site.register(Cour)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Choix)
admin.site.register(RéponseÉtudiant)
admin.site.register(Feedback)
