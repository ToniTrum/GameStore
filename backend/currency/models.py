from django.db import models

class CurrencyRate(models.Model):
    currency_code = models.CharField(max_length=3, primary_key=True)
    rate = models.DecimalField(max_digits=20, decimal_places=6)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.currency_code}: {self.rate}"
    
    def get_source_currency(self):
        source = "USD"
        return CurrencyRate.objects.get(currency_code=source)
    
class Country(models.Model):
    numeric_code = models.PositiveIntegerField(primary_key=True, serialize=True)
    name_ru = models.CharField(max_length=64)
    currency = models.ForeignKey(CurrencyRate, on_delete=models.SET_DEFAULT, related_name="countries", default=CurrencyRate.get_source_currency)
    currency_symbol = models.CharField(max_length=6)

    def __str__(self):
        return f"{self.name_ru} ({self.currency.currency_code if self.currency else None}: {self.currency_symbol})"
