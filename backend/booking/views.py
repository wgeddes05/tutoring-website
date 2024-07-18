import datetime
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Booking
from .serializers import BookingSerializer


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


@api_view(["POST"])
def check_availability(request):
    requested_date = request.data.get("date")
    requested_datetime = datetime.datetime.fromisoformat(requested_date)

    # Check if the requested time is already booked
    conflicting_bookings = Booking.objects.filter(
        date__lte=requested_datetime,
        date__gt=requested_datetime - datetime.timedelta(hours=1),
    )

    if not conflicting_bookings.exists():
        return Response({"available": True})

    # If already booked, suggest alternative time slots
    alternative_times = []
    for i in range(1, 6):
        alternative_time = requested_datetime + datetime.timedelta(hours=i)
        if not Booking.objects.filter(
            date__lte=alternative_time,
            date__gt=alternative_time - datetime.timedelta(hours=1),
        ).exists():
            alternative_times.append(alternative_time.isoformat())

    return Response({"available": False, "alternative_times": alternative_times})
