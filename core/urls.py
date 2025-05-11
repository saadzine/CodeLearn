from . import views
from django.urls import path, include
from rest_framework import routers
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import SignupView
from .views import OnlyForTeachers, OnlyForStudents

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
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/signup/', SignupView.as_view(), name='signup'),
    path('api/prof/', OnlyForTeachers.as_view(), name='prof-zone'),
    path('api/eleve/', OnlyForStudents.as_view(), name='eleve-zone'),
]

