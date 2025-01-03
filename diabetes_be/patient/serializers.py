from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'name', 'age', 'gender', 'glucose', 'blood_pressure', 'skin_thickness', 'insulin', 'bmi','risk_factor']
