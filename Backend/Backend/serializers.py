from rest_framework import serializers

from Backend.models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    cover_img = serializers.SerializerMethodField()
    created_at = serializers.SerializerMethodField()

    def get_created_at(self, obj):
        return str(obj.created_at.strftime('%b %d, %Y'))

    def get_cover_img(self, obj):
        return "images/"+str(obj.cover_img)

    class Meta:
        model = Employee
        fields = ('id', 'title', 'slug', "cover_img", 'content', 'author_name', 'author_description', 'created_at')
