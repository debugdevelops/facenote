import django_filters
from users.models import Player


class PlayerFilter(django_filters.FilterSet):
    location = django_filters.CharFilter(
        field_name='location', lookup_expr='icontains')
    instrument = django_filters.NumberFilter(field_name='instrument__id')

    class Meta:
        model = Player
        fields = ['location', 'instrument']
