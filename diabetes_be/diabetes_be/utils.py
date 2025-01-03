from rest_framework import status
from rest_framework.response import Response
import random
from patient.models import Patient

def standard_response(data=None, message='', status_code=status.HTTP_200_OK):
    response_data = {
        'data': data if data is not None else {},
        'message': message,
        'status': status_code
    }
    return Response(response_data, status=status_code)




def determine_risk_factor():
    """
    Determines the risk factor based on a random score.
    Returns a tuple of (score, risk_factor, category).
    """
    score = random.randint(1, 100)
    if score < 30:
        risk_factor = Patient.RiskFactor.LOW
        category = "Normal"
    elif score < 60:
        risk_factor = Patient.RiskFactor.MEDIUM
        category = "Pre-Diabetic"
    else:
        risk_factor = Patient.RiskFactor.HIGH
        category = "Diabetic"
    return score, risk_factor, category
