from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AbstractUser


class Instrument(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Player(AbstractUser):
    name = models.CharField(max_length=50)
    bio = models.TextField(max_length=300, blank=True)
    location = models.CharField(max_length=30)
    instrument = models.ForeignKey(
        Instrument, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.name


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
