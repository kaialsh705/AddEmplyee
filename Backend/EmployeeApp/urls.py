from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

from Backend import views
from Backend.views import EmployeeCreateAPI, ObtainAuthToken, GetEmpDataAPI

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', admin.site.urls),
    path('employee/', EmployeeCreateAPI.as_view(), name='employee-create'),
    path('token/', ObtainAuthToken.as_view(), name='token'),
    path('get_data/', GetEmpDataAPI.as_view(), name='get_data'),
    path('csrf_token/', views.csrf_token_view, name='csrf_token'),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
