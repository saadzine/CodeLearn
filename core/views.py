from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from .models import Profile
from .models import Cour, Quiz, Question, Choix
from django.contrib.auth.decorators import user_passes_test
from rest_framework import viewsets
from .serializers import *

def est_enseignant(user):
    return hasattr(user, 'profile') and user.profile.role == 'teacher'

@user_passes_test(est_enseignant)
def espace_enseignant(request):
    if request.method == "POST":
        if 'titre_cours' in request.POST:
            titre = request.POST['titre_cours']
            description = request.POST['description']
            Cour.objects.create(titre=titre, description=description, enseignant=request.user.profile)
        elif 'titre_quiz' in request.POST:
            cours_id = request.POST['cours_id']
            titre = request.POST['titre_quiz']
            cours = Cour.objects.get(id=cours_id)
            Quiz.objects.create(titre=titre, cours=cours)

    cours = Cour.objects.filter(enseignant=request.user.profile)
    return render(request, 'core/espace_enseignant.html', {'cours': cours})

def accueil(request):
    return render(request, 'core/accueil.html')

def connexion_utilisateur(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('tableau_bord')  # Redirige vers le tableau de bord
        else:
            return render(request, 'core/connexion.html', {'error': 'Identifiants invalides'})
    return render(request, 'core/connexion.html')

@login_required
def tableau_bord(request):
    profil = request.user.profile  # Si vous utilisez un modèle Profile
    return render(request, 'core/tableau_bord.html', {'profil': profil})

def deconnexion(request):
    logout(request)
    return redirect('accueil')

class CoursViewSet(viewsets.ModelViewSet):
    queryset = Cour.objects.all()
    serializer_class = CoursSerializer

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class ChoixViewSet(viewsets.ModelViewSet):
    queryset = Choix.objects.all()
    serializer_class = ChoixSerializer

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

