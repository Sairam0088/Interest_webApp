# views.py
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Interest
from .serializers import InterestSerializer, InterestResponseSerializer, UserMinimalSerializer
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class UsersList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserMinimalSerializer

    def get_queryset(self):
        user = self.request.user
        # Exclude the current user from the queryset
        queryset = User.objects.exclude(id=user.id)
        return queryset

class SendInterestView(generics.CreateAPIView):
    serializer_class = InterestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        sender = self.request.user
        receiver = serializer.validated_data['receiver']
        
        # Check if an interest already exists
        if Interest.objects.filter(sender=sender, receiver=receiver).exists():
            raise serializer.ValidationError("You have already sent an interest to this user.")
        
        serializer.save(sender=sender)

class ListReceivedInterestsView(generics.ListAPIView):
    serializer_class = InterestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Interest.objects.filter(receiver=self.request.user)

class RespondInterestView(generics.UpdateAPIView):
    serializer_class = InterestResponseSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Interest.objects.all()
    lookup_field = 'id'

    def get_object(self):
        interest = get_object_or_404(
            Interest,
            id=self.kwargs['id'],
            receiver=self.request.user,
            status='pending'
        )
        return interest

    def perform_update(self, serializer):
        instance = serializer.save()  # Save the status for the current interest

        # Check if there's a related interest from the sender to the receiver
        related_interest = Interest.objects.filter(
            sender=instance.receiver,
            receiver=instance.sender.id,
            status='pending'
        ).first()

        if related_interest:
            # Update the status of the related interest
            related_interest.status = instance.status
            related_interest.save()


