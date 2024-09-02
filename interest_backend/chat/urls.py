# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChatViewSet, MessageViewSet

router = DefaultRouter()
router.register(r'chats', ChatViewSet)

# Define a nested router for messages
chat_router = DefaultRouter()
chat_router.register(r'messages', MessageViewSet, basename='chat-messages')

urlpatterns = [
    path('', include(router.urls)),
    path('chats/<int:chat_pk>/', include(chat_router.urls)),
]
