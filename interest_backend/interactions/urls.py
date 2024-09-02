from django.urls import path
from .views import (
    SendInterestView,
    ListReceivedInterestsView,
    RespondInterestView,
    UsersList
)

urlpatterns = [
    # Interest URLs
    path('users/', UsersList.as_view(), name='user-list'),
    path('interests/send/', SendInterestView.as_view(), name='send-interest'),
    path('interests/received/', ListReceivedInterestsView.as_view(), name='list-received-interests'),
    path('interests/respond/<int:id>/', RespondInterestView.as_view(), name='respond-interest'),

]
