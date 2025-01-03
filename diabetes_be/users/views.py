from rest_framework import generics
from .models import User
from .serializers import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from diabetes_be.utils import standard_response
from rest_framework.views import APIView
from rest_framework import permissions  

class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        try:
            response = super().create(request, *args, **kwargs)
            return standard_response(
                data=response.data,
                message="User registered successfully",
                status_code=status.HTTP_201_CREATED
            )
        except Exception as e:
            return standard_response(
                data={},
                message=f"Error: {str(e)}",
                status_code=status.HTTP_400_BAD_REQUEST
            )


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            return standard_response(
                data={
                    'accessToken': response.data['access'],
                    'refreshToken': response.data['refresh'],
                     
                },
                message="Token obtained successfully",
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return standard_response(
                data={},
                message=f"Error: {str(e)}",
                status_code=status.HTTP_400_BAD_REQUEST
            )
   


class UserDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request, *args, **kwargs):
        try:
            # Access the authenticated user from the request
            user = request.user

            # Return the user data in the response
            return standard_response(
                data={
                    'id': user.id,
                    'email': user.email,
                    'role': user.role,
                    'username': user.username
                },
                message="User details retrieved successfully",
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return standard_response(
                data={},
                message=f"Error: {str(e)}",
                status_code=status.HTTP_400_BAD_REQUEST
            )

class LogoutView(APIView):

    def post(self, request, *args, **kwargs):
        try:
            # Get the refresh token from the request
            refresh_token = request.data.get('refresh')

            if not refresh_token:
                return standard_response(
                    data={},
                    message="Refresh token not provided",
                    status_code=status.HTTP_400_BAD_REQUEST
                )
            
            # Blacklist the token
            token = RefreshToken(refresh_token)
            token.blacklist()

            return standard_response(
                data={},
                message="Logged out successfully",
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return standard_response(
                data={},
                message=f"Error: {str(e)}",
                status_code=status.HTTP_400_BAD_REQUEST
            )