# views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from interactions.models import User
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer

class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    @action(detail=False, methods=['post'])
    def create_chat(self, request):
        user1 = request.user
        user2_id = request.data.get('user2')
        if not user2_id:
            return Response({'error': 'User2 ID is required'}, status=400)
        
        try:
            user2 = User.objects.get(pk=user2_id)
        except User.DoesNotExist:
            return Response({'error': 'User2 does not exist'}, status=404)
        
        chat, created = Chat.objects.get_or_create(user1=user1, user2=user2)
        serializer = self.get_serializer(chat)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        chat_id = self.kwargs.get('chat_pk')
        if chat_id:
            return Message.objects.filter(chat_id=chat_id)
        return super().get_queryset()

    def create(self, request, *args, **kwargs):
        chat_id = self.kwargs.get('chat_pk')
        chat = get_object_or_404(Chat, id=chat_id)
        sender = request.user
        content = request.data.get('content')

        if not content:
            return Response({"error": "Content is required"}, status=status.HTTP_400_BAD_REQUEST)

        message = Message.objects.create(chat=chat, sender=sender, content=content)
        serializer = self.get_serializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

