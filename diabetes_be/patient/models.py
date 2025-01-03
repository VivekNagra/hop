from django.db import models

class Patient(models.Model):
    class RiskFactor(models.TextChoices):
        HIGH = 'high', 'High'
        MEDIUM = 'medium', 'Medium'
        LOW = 'low', 'Low'
    name = models.CharField(max_length=255)
    age = models.IntegerField()  # Keep age as IntegerField
    gender = models.CharField(max_length=10)
    glucose = models.FloatField()  # Changed to FloatField for decimals
    blood_pressure = models.FloatField()  # Changed to FloatField
    skin_thickness = models.FloatField()  # Changed to FloatField
    insulin = models.FloatField()  # Changed to FloatField
    bmi = models.FloatField()  # Keeping bmi as FloatField
    created = models.DateTimeField(auto_now_add=True)
    risk_factor = models.CharField(
        max_length=10,
        choices=RiskFactor.choices,
        default=RiskFactor.MEDIUM
    )

    def __str__(self):
        return self.name
