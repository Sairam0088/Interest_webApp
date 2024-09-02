from rest_framework import serializers
from .models import Chat, Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'chat', 'sender', 'content', 'timestamp']

class ChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Chat
        fields = ['id', 'user1', 'user2', 'messages']
        
    def create(self, validated_data):
        chat = validated_data.get('chat')
        sender = validated_data.get('sender')
        content = validated_data.get('content')

        # Ensure that chat is correctly associated
        message = Message.objects.create(chat=chat, sender=sender, content=content)
        return message
