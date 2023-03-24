from django.contrib.auth import authenticate
from rest_framework import permissions
from rest_framework.views import APIView
from .models import Employee
from django.http import JsonResponse
from PIL import Image
import io
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.http import JsonResponse
from django.middleware.csrf import get_token
from .serializers import EmployeeSerializer
from django.db.models import Q


class EmployeeCreateAPI(APIView):
    def post(self, request):
        try:
            first_name = request.data.get("first_name")
            last_name = request.data.get("slug")
            email = request.data.get("cover_img")
            salary = request.data.get("content")
            job_title = request.data.get("author_name")

            # Check if all fields are provided
            if not all([first_name, last_name, email, salary, job_title]):
                return JsonResponse({"success": False, 'message': "Some details are missing"})

            if Employee.objects.filter(email=email).exists():
                return JsonResponse({"success": False, 'message': "This email already registered"})

            Employee.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=email,
                job_title=salary,
                salary=job_title,
            )
            return JsonResponse({"success": True, "message": "Employee saved successfully"})
        except Exception as e:
            return JsonResponse({"success": False, "message": "Error"})


class FilterEmployee(APIView):
    def post(self, request):
        search_name = request.data.get('search_name')
        data = Employee.objects.filter(Q(first_name__icontains=search_name) | Q(last_name__icontains=search_name)
                                       | Q(first_name__search=search_name) | Q(last_name__search=search_name))

        context = dict()
        context['data'] = EmployeeSerializer(data, many=True).data
        return JsonResponse(context)


class GetEmpDataAPI(APIView):
    def get(self, request):
        data = Employee.objects.filter().order_by("-timestamp")
        context = dict()
        context['data'] = EmployeeSerializer(data, many=True).data
        return JsonResponse(context)


class IsSavedEmployee(APIView):
    def get(self, request):
        email = request.data.get('email')
        is_save_type = bool(int(request.data.get('is_save_type')))
        data = Employee.objects.filter(email=email).first()
        data.is_saved = is_save_type
        data.save()
        context = dict()
        context['data'] = EmployeeSerializer(data).data
        context['is_save_type'] = EmployeeSerializer(data).data
        return JsonResponse(context)


class ObtainAuthToken(APIView):
    """
    API View that receives a POST with a user's username and password.
    Returns a token that can be used for authenticated requests.
    """

    # authentication_classes = []
    # permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        username = 'kailash'
        password = 'kailash'

        # Authenticate the user
        user = authenticate(username=username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            # If the user is not authenticated, return an error message
            return Response({'error': 'Invalid credentials'}, status=400)


def csrf_token_view(request):
    token = get_token(request)
    response = JsonResponse({'csrftoken': token})
    response['Access-Control-Allow-Origin'] = '*'
    return response
