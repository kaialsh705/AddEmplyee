from django.db import models


# Create your models here.

class Employee(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.TextField(unique=True)
    job_title = models.CharField(max_length=255)
    salary = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_saved = models.BooleanField(default=False)

    def __str__(self):
        return self.first_name + self.last_name
