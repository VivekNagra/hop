from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'username', 'role', 'is_active', 'is_staff')  # Customize the fields to display
    search_fields = ('email', 'username')  # Add search functionality for email and username
    list_filter = ('role', 'is_active', 'is_staff')  # Allow filtering by role, is_active, and is_staff
    ordering = ('id',)  # Default ordering by user ID

