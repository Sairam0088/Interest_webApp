from django.urls import path
from .views import RegisterView, LoginView, SelfView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('me/', SelfView.as_view(), name='me'),
]
