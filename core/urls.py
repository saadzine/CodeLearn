from . import views
from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'cours', CoursViewSet)
router.register(r'quiz', QuizViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'choix', ChoixViewSet)
router.register(r'feedbacks', FeedbackViewSet)
router.register(r'profils', ProfileViewSet)

urlpatterns = [
    path('', views.accueil, name='accueil'),
    path('connexion/', views.connexion_utilisateur, name='connexion'),
    path('deconnexion/', views.deconnexion, name='deconnexion'),
    path('tableau/', views.tableau_bord, name='tableau_bord'),  # URL pour le tableau de bord
    path('enseignant/', views.espace_enseignant, name='espace_enseignant'),
    path('api/', include(router.urls)),
]
