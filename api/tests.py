from os import getenv

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Visitor


class VisitorTests(APITestCase):

    def setUp(self):
        self.first_name = 'John'
        self.last_name = 'Doe'
        self.email = getenv('GMAIL_USER', None)
        self.source_control = 'github'
        self.team_size = 10
        self.max_name_length = 255
        self.url_name = 'visitor-create'

    def test_create_visitor_no_source_control(self):
        """
        Ensure we can create a new visitor object with default source_control
        """
        url = reverse(self.url_name)
        data = {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'team_size': self.team_size
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Visitor.objects.count(), 1)
        self.assertEqual(Visitor.objects.get().source_control, 'other')

    def test_create_visitor_with_source_control(self):
        """
        Ensure we can create a new visitor object with setting source_control
        """
        url = reverse(self.url_name)
        data = {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'source_control': self.source_control,
            'team_size': self.team_size
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Visitor.objects.count(), 1)
        self.assertEqual(Visitor.objects.get().source_control, 'github')

    def test_create_visitor_first_name_gt_max_allowed(self):
        """
        Verify bad request when creating visitor with first_name too long
        """
        url = reverse(self.url_name)
        data = {
            'first_name': 'a' * (self.max_name_length + 1),
            'last_name': self.last_name,
            'email': self.email,
            'source_control': self.source_control,
            'team_size': self.team_size
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Visitor.objects.count(), 0)

    def test_create_visitor_last_name_gt_max_allowed(self):
        """
        Verify bad request when creating visitor with last_name too long
        """
        url = reverse(self.url_name)
        data = {
            'first_name': self.first_name,
            'last_name': 'a' * (self.max_name_length + 1),
            'email': self.email,
            'source_control': self.source_control,
            'team_size': self.team_size
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Visitor.objects.count(), 0)

    def test_create_visitor_first_name_blank(self):
        """
        Verify bad request when creating visitor with blank first_name
        """
        url = reverse(self.url_name)
        data = {
            'first_name': '',
            'last_name': self.last_name,
            'email': self.email,
            'source_control': self.source_control,
            'team_size': self.team_size
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Visitor.objects.count(), 0)

    def test_create_visitor_last_name_blank(self):
        """
        Verify bad request when creating visitor with blank last_name
        """
        url = reverse(self.url_name)
        data = {
            'first_name': self.first_name,
            'last_name': '',
            'email': self.email,
            'source_control': self.source_control,
            'team_size': self.team_size
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Visitor.objects.count(), 0)

    def test_create_visitor_email_blank(self):
        """
        Verify bad request when creating visitor with blank email
        """
        url = reverse(self.url_name)
        data = {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': '',
            'source_control': self.source_control,
            'team_size': self.team_size
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Visitor.objects.count(), 0)

    def test_create_visitor_email_invalid(self):
        """
        Verify bad request when creating visitor with invalid email
        """
        url = reverse(self.url_name)
        data = {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': 'notanemail',
            'source_control': self.source_control,
            'team_size': self.team_size
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Visitor.objects.count(), 0)

    def test_create_visitor_negative_team_size(self):
        """
        Verify bad request when creating visitor with negative team_size
        """
        url = reverse(self.url_name)
        data = {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'source_control': self.source_control,
            'team_size': -1
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Visitor.objects.count(), 0)

    def test_create_visitor_no_team_size(self):
        """
        Verify bad request when creating visitor with no team_size
        """
        url = reverse(self.url_name)
        data = {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'source_control': self.source_control,
            'team_size': None
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Visitor.objects.count(), 0)

    def test_create_visitor_invalid_source_control(self):
        """
        Verify bad request when creating visitor with invalid source_control
        """
        url = reverse(self.url_name)
        data = {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'source_control': 'notavcs',
            'team_size': self.team_size
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Visitor.objects.count(), 0)

    def test_create_visitor_blank_source_control(self):
        """
        Verify bad request when creating visitor with blank source_control
        """
        url = reverse(self.url_name)
        data = {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'source_control': '',
            'team_size': self.team_size
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Visitor.objects.count(), 0)

    def test_invalid_url(self):
        """
        Verify not found when trying to get an invalid URL
        """
        url = '/api/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_resubmit_within_one_day(self):
        """
        Verify bad request when same user submits within 24 hours
        """
        url = reverse(self.url_name)
        data = {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'source_control': self.source_control,
            'team_size': self.team_size
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Visitor.objects.count(), 1)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Visitor.objects.count(), 1)
