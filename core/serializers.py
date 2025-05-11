from rest_framework import serializers
from .models import Cour, Quiz, Question, Choix, Profile, Feedback

class CoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cour
        fields = '__all__'

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class ChoixSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choix
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
