from django.urls import path
from .views import PatientCreateView, PatientListView, PatientDetailView, PatientUpdateView, PatientDeleteView,PatientStatisticsAPIView,PatientPredictionView

urlpatterns = [
    path('patients/', PatientListView.as_view(), name='patient_list'),  # List all patients
    path('patients/create/', PatientCreateView.as_view(), name='patient_create'),  # Create a new patient
    path('patients/<int:pk>/', PatientDetailView.as_view(), name='patient_detail'),  # Retrieve a single patient
    path('patients/<int:pk>/update/', PatientUpdateView.as_view(), name='patient_update'),  # Update a patient
    path('patients/<int:pk>/delete/', PatientDeleteView.as_view(), name='patient_delete'),  # Delete a patient
    path('patient-statistics/', PatientStatisticsAPIView.as_view(), name='patient-statistics'),
    path('patients/predict/', PatientPredictionView.as_view(), name='patient-predict'),
]
