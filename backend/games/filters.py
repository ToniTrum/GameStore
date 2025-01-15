from django_filters import rest_framework as filters
from .models import Platform, Genre, Tag, Developer, Game

class GameFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")
    release_date = filters.DateFromToRangeFilter()
    price_in_cents = filters.RangeFilter()
    platforms = filters.ModelMultipleChoiceFilter(
        queryset=Platform.objects.all(),
        field_name="platforms__id",
        to_field_name="id",
    )
    genres = filters.ModelMultipleChoiceFilter(
        queryset=Genre.objects.all(),
        field_name="genres__id",
        to_field_name="id",
    )
    tags = filters.ModelMultipleChoiceFilter(
        queryset=Tag.objects.all(),
        field_name="tags__id",
        to_field_name="id",
    )
    developers = filters.ModelMultipleChoiceFilter(
        queryset=Developer.objects.all(),
        field_name="developers__id",
        to_field_name="id",
    )

    class Meta:
        model = Game
        fields = [
            "name",
            "release_date",
            "price_in_cents",
            "platforms",
            "genres",
            "tags",
            "developers",
        ]
