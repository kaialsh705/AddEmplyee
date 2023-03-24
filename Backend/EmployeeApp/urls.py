from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

from Backend import views
from Backend.views import EmployeeCreateAPI, ObtainAuthToken, GetEmpDataAPI, FilterEmployee, IsSavedEmployee

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', admin.site.urls),
    path('employee/', EmployeeCreateAPI.as_view(), name='employee-create'),
    path('token/', ObtainAuthToken.as_view(), name='token'),
    path('get_data/', GetEmpDataAPI.as_view(), name='get_data'),
    path('is_saved_employee/', IsSavedEmployee.as_view(), name='is_saved_employee'),
    path('filter_employee/', FilterEmployee.as_view(), name='filter_employee'),
    path('csrf_token/', views.csrf_token_view, name='csrf_token'),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
