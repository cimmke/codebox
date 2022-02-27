from django.db import models
from django.core.validators import MinValueValidator


class Visitor(models.Model):
    SOURCE_CONTROL_CHOICES = [
        ('github', 'GitHub'),
        ('gitlab', 'GitLab'),
        ('bitbucket', 'BitBucket'),
        ('tfs', 'TFS'),
        ('other', 'Other'),
    ]

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    source_control = models.CharField(
        choices=SOURCE_CONTROL_CHOICES,
        default='other',
        max_length=max(len(s[0]) for s in SOURCE_CONTROL_CHOICES)
    )
    team_size = models.PositiveIntegerField(validators=[MinValueValidator(0)])
    created = models.DateTimeField(auto_now_add=True)
