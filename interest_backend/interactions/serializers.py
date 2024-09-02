# serializers.py
from rest_framework import serializers
from .models import Interest
from django.contrib.auth import get_user_model

User = get_user_model()

class UserMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class InterestSerializer(serializers.ModelSerializer):
    sender = UserMinimalSerializer(read_only=True)
    receiver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Interest
        fields = ['id', 'sender', 'receiver', 'message', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']

class InterestResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ['id', 'status']
        read_only_fields = ['id']
    
    def validate_status(self, value):
        if value not in ['accepted', 'rejected']:
            raise serializers.ValidationError("Status must be either 'accepted' or 'rejected'.")
        return value
