from rest_framework import generics
from .models import Patient
from .serializers import PatientSerializer
from rest_framework import status
from rest_framework.response import Response
from diabetes_be.utils import standard_response 
from rest_framework.pagination import PageNumberPagination
from django.db.models import Avg, Count, Q
from rest_framework.views import APIView
from diabetes_be.utils import determine_risk_factor

class PatientPredictionView(generics.CreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def create(self, request, *args, **kwargs):
        try:
            # Create a new patient entry
            response = super().create(request, *args, **kwargs)
            patient_id = response.data.get('id')
            patient = Patient.objects.get(id=patient_id)

            # Determine the risk factor
            score, risk_factor, category = determine_risk_factor()

            # Update the patient's risk factor
            patient.risk_factor = risk_factor
            patient.save()

            # Prepare the response data
            response_data = {
                "id": patient.id,
                "name": patient.name,
                "age": patient.age,
                "gender": patient.gender,
                "glucose": patient.glucose,
                "blood_pressure": patient.blood_pressure,
                "skin_thickness": patient.skin_thickness,
                "insulin": patient.insulin,
                "bmi": patient.bmi,
                "score": score,
                "risk_factor": risk_factor,
                "category": category
            }

            return Response(
                {"message": "Patient created and prediction completed", "data": response_data},
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            return Response(
                {"message": f"Error: {str(e)}", "data": {}},
                status=status.HTTP_400_BAD_REQUEST
            )
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def update(self, request, *args, **kwargs):
        try:
            # Retrieve the patient instance
            patient = self.get_object()

            # Generate a random score and risk factor
            score = random.randint(1, 100)
            if score < 30:
                risk_factor = Patient.RiskFactor.LOW
            elif score < 60:
                risk_factor = Patient.RiskFactor.MEDIUM
            else:
                risk_factor = Patient.RiskFactor.HIGH

            # Update the patient's risk factor
            patient.risk_factor = risk_factor
            patient.save()

            # Return the response
            response_data = {
                "name": patient.name,
                "age": patient.age,
                "gender": patient.gender,
                "score": score,
                "risk_factor": risk_factor,
                "category": (
                    "Normal" if score < 30
                    else "Pre-Diabetic" if score < 60
                    else "Diabetic"
                )
            }
            return Response(
                {"message": "Prediction successful", "data": response_data},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"message": f"Error: {str(e)}", "data": {}},
                status=status.HTTP_400_BAD_REQUEST
            )
# Create Patient
class PatientCreateView(generics.CreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def create(self, request, *args, **kwargs):
        try:
            response = super().create(request, *args, **kwargs)
            return standard_response(
                data=response.data,
                message="Patient created successfully",
                status_code=status.HTTP_201_CREATED
            )
        except Exception as e:
            return standard_response(
                data={},
                message=f"Error: {str(e)}",
                status_code=status.HTTP_400_BAD_REQUEST
            )

class PatientPagination(PageNumberPagination):
    page_size = 10  # Number of patients per page
    page_size_query_param = 'pageSize'  # Allow clients to set custom page size
    max_page_size = 100  # Maximum page size allowed
    def get_paginated_response(self, data):
        return Response({
            'meta': {
                'total_records': self.page.paginator.count,  # Total number of records
                'total_pages': self.page.paginator.num_pages,  # Total number of pages
                'current_page': self.page.number,  # Current page number
                'page_size': self.page.paginator.per_page,  # Records per page
                'next': self.get_next_link(),  # Link to the next page
                'previous': self.get_previous_link(),  # Link to the previous page
            },
            'data': data,  # Paginated data
            'message': "Patients retrieved successfully",  # Custom message
            'status_code': 200  # HTTP status code
        })

# Retrieve a list of Patients
class PatientListView(generics.ListAPIView):
    serializer_class = PatientSerializer
    pagination_class = PatientPagination  # Add pagination class

    def get_queryset(self):
        queryset = Patient.objects.all()

        # Check if the 'name' query parameter is provided
        name = self.request.query_params.get('name', None)
        if name:
            queryset = queryset.filter(name__icontains=name)  # Filter patients by name (case-insensitive)
        
        sort = self.request.query_params.get('sort', None)
        if sort:
            if sort == 'bmi_high_to_low':
                print(sort)
                queryset = queryset.order_by('-bmi')  # Assuming 'bmi' is a numeric field
            elif sort == 'bmi_low_to_high':
                queryset = queryset.order_by('bmi')
            elif sort == 'glucose_high_to_low':
                queryset = queryset.order_by('-glucose')  # Assuming 'glucose' is a numeric field
            elif sort == 'glucose_low_to_high':
                queryset = queryset.order_by('glucose')
            elif sort == 'insulin_low_to_high':
                queryset = queryset.order_by('insulin')
            elif sort == 'insulin_high_to_low':
                queryset = queryset.order_by('-insulin')

        if not sort:
            queryset = queryset.order_by('-created')

        # Order by created date in descending order
        return queryset

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)  # Apply pagination to the queryset
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)  # Use paginated response

            # Fallback if pagination is not applied
            serializer = self.get_serializer(queryset, many=True)
            return standard_response(
                data=serializer.data,
                message="Patients retrieved successfully",
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return standard_response(
                data={},
                message=f"Error: {str(e)}",
                status_code=status.HTTP_400_BAD_REQUEST
            )

# Retrieve a single Patient by ID
class PatientDetailView(generics.RetrieveAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def retrieve(self, request, *args, **kwargs):
        try:
            patient = self.get_object()
            serializer = self.get_serializer(patient)
            return standard_response(
                data=serializer.data,
                message="Patient details retrieved successfully",
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return standard_response(
                data={},
                message=f"Error: {str(e)}",
                status_code=status.HTTP_400_BAD_REQUEST
            )

# Update an existing Patient
class PatientUpdateView(generics.UpdateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def update(self, request, *args, **kwargs):
        try:
            patient = self.get_object()
            serializer = self.get_serializer(patient, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return standard_response(
                    data=serializer.data,
                    message="Patient updated successfully",
                    status_code=status.HTTP_200_OK
                )
            return standard_response(
                data=serializer.errors,
                message="Error updating patient",
                status_code=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return standard_response(
                data={},
                message=f"Error: {str(e)}",
                status_code=status.HTTP_400_BAD_REQUEST
            )

# Delete a Patient record
class PatientDeleteView(generics.DestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def destroy(self, request, *args, **kwargs):
        try:
            patient = self.get_object()
            patient.delete()
            return standard_response(
                data={},
                message="Patient deleted successfully",
                status_code=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return standard_response(
                data={},
                message=f"Error: {str(e)}",
                status_code=status.HTTP_400_BAD_REQUEST
            )







class PatientStatisticsAPIView(APIView):
    def get(self, request, *args, **kwargs):
        # Total number of patients
        total_patients = Patient.objects.count()

        # Average BMI, Insulin, and Glucose
        averages = Patient.objects.aggregate(
            avg_bmi=Avg('bmi'),
            avg_insulin=Avg('insulin'),
            avg_glucose=Avg('glucose')
        )

        # High, Medium, Low count overall
        risk_counts = Patient.objects.values('risk_factor').annotate(count=Count('risk_factor'))

        # Age group risk factor distribution
        def age_group_count(start, end):
            return {
                'High': Patient.objects.filter(age__gte=start, age__lt=end, risk_factor='high').count(),
                'Medium': Patient.objects.filter(age__gte=start, age__lt=end, risk_factor='medium').count(),
                'Low': Patient.objects.filter(age__gte=start, age__lt=end, risk_factor='low').count(),
            }

        age_groups = [
            {'name': '20-30', **age_group_count(20, 30)},
            {'name': '30-40', **age_group_count(30, 40)},
            {'name': '40-50', **age_group_count(40, 50)},
            {'name': '60-70', **age_group_count(60, 70)},
        ]

        # Risk factor pie chart data
        risk_data = [{'name': item['risk_factor'].capitalize(), 'value': item['count']} for item in risk_counts]

        # Response
        data = {
            'total_patients': total_patients,
            'averages': averages,
            'age_groups': age_groups,
            'risk_data': risk_data,
        }
        return Response(data)
