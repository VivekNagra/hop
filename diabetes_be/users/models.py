from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "admin", "Admin"
        DOCTOR = "doctor", "Doctor"

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=50, choices=Role.choices)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "role"]

    def __str__(self):
        return self.email
