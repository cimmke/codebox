from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from api import views


urlpatterns = [
    path('submit/', views.VisitorCreate.as_view(), name='visitor-create'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
