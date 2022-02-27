from os import getenv

from django.db import models
from django.core.validators import MinValueValidator
from django.dispatch import receiver
from django.core.mail import send_mass_mail


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


@receiver(models.signals.post_save, sender=Visitor)
def execute_after_save(sender, instance, created, *args, **kwargs):
    if created:
        subject = 'Thanks for your submission to CodeBox'
        message = (
            f'{instance.first_name},\n\n'
            'We really appreciate your interest in CodeBox! '
            'Your info will go a long way in helping us shape '
            'the future of the product. We look forward to touching '
            'base with you again as we have news to share!\n\n'
            'Thanks!\n'
            '-The CodeBox Team'
        )
        sender = getenv('GMAIL_USER', None)
        receiver = [instance.email]
        external_msg = (subject, message, sender, receiver)

        subject = 'New CodeBox Submission'
        message = (
            'A new submission was entered with the following:\n\n'
            f'First Name: {instance.first_name}\n'
            f'Last Name: {instance.last_name}\n'
            f'Email: {instance.email}\n'
            f'Source Control: {instance.source_control}\n'
            f'Team Size: {instance.team_size}\n\n'
        )
        receiver = [sender]
        internal_msg = (subject, message, sender, receiver)
        send_mass_mail((external_msg, internal_msg))
