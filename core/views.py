from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from .models import Profile
from .models import Cour, Quiz, Question, Choix
from django.contrib.auth.decorators import user_passes_test
from rest_framework import viewsets
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from core.models import Profile


class SignupView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")
        role = request.data.get("role")

        if role not in ['student', 'teacher']:
            return Response({"error": "Rôle invalide"}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Nom d'utilisateur déjà utilisé"}, status=400)

        user = User.objects.create_user(username=username, password=password, email=email)
        
        # vérifier si le profil existe déjà
        if not Profile.objects.filter(user=user).exists():
            Profile.objects.create(user=user, role=role)

        return Response({"message": "Utilisateur créé avec succès"}, status=201)



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

from rest_framework.permissions import IsAuthenticated
from .permissions import IsTeacher, IsStudent


class OnlyForTeachers(APIView):
    permission_classes = [IsAuthenticated, IsTeacher]

    def get(self, request):
        return Response({"message": "Bienvenue, enseignant !"})


class OnlyForStudents(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def get(self, request):
        return Response({"message": "Bienvenue, étudiant !"})

