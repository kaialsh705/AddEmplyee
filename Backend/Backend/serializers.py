from rest_framework import serializers

from Backend.models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', "email", 'salary', 'job_title', 'timestamp', 'is_saved')
