from django.db import models

class Patient(models.Model):
    class RiskFactor(models.TextChoices):
        HIGH = 'high', 'High'
        MEDIUM = 'medium', 'Medium'
        LOW = 'low', 'Low'
    name = models.CharField(max_length=255)
    age = models.IntegerField()  
    gender = models.CharField(max_length=10)
    glucose = models.FloatField()  
    blood_pressure = models.FloatField()  
    skin_thickness = models.FloatField()  
    insulin = models.FloatField() 
    bmi = models.FloatField()  
    created = models.DateTimeField(auto_now_add=True)
    risk_factor = models.CharField(
        max_length=10,
        choices=RiskFactor.choices,
        default=RiskFactor.MEDIUM
    )

    def __str__(self):
        return self.name
