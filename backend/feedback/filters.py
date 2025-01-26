import django_filters
from .models import STATUS_CHOICES, Feedback

class FeedbackFilter(django_filters.FilterSet):
    status = django_filters.ChoiceFilter(choices=STATUS_CHOICES)

    class Meta:
        model = Feedback
        fields = ['status']
