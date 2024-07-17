from django.db import models


# Create your models here.
class Booking(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    date = models.DateTimeField()

    def __str__(self):
        return f"{self.name} - {self.email} - {self.date}"
