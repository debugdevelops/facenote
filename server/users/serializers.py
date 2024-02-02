from rest_framework import serializers
from users.models import Instrument, Player
from django.contrib.auth.hashers import make_password


class PlayerSerializer(serializers.ModelSerializer):
    instrument = serializers.PrimaryKeyRelatedField(
        queryset=Instrument.objects.all())

    password = serializers.CharField(
        write_only=True,
        required=True,
    )

    email = serializers.EmailField(required=True)

    def create(self, validated_data):
        validated_data['password'] = make_password(
            validated_data.get('password'))
        return super(PlayerSerializer, self).create(validated_data)

    class Meta:
        model = Player
        fields = ['id', 'username', 'instrument',
                  'email', 'password', 'bio', 'location', 'name']


class InstrumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Instrument
        fields = ['id', 'name']
