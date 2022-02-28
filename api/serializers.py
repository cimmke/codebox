import datetime as dt

from rest_framework import serializers
from .models import Visitor
from django.utils import timezone


class VisitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitor
        fields = '__all__'

    def validate(self, data):
        """
        Verify submission is not from same user within past 24 hours
        """
        visitor = Visitor.objects.filter(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
        ).order_by('-created').first()
        if visitor is not None:
            if timezone.now() < visitor.created + dt.timedelta(days=1):
                raise serializers.ValidationError(
                    'must wait 1 day before submitting again'
                )
        return data
