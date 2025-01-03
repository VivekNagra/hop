from django.urls import path
from .views import CustomTokenObtainPairView,  RegisterUserView, UserDetailView, LogoutView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
     path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
 path('me/', UserDetailView.as_view(), name='user-details'),

]
