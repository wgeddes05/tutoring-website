import datetime, logging
from .models import Booking
from .serializers import BookingSerializer
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response


logger = logging.getLogger(__name__)


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


@api_view(["POST"])
def check_availability(request):
    try:
        requested_date = request.data.get("date")
        logger.info(f"Requested date: {requested_date}")
        requested_datetime = datetime.datetime.fromisoformat(requested_date)

        # Check if the requested time is already booked
        conflicting_bookings = Booking.objects.filter(
            date__lte=requested_datetime,
            date__gt=requested_datetime - datetime.timedelta(hours=1),
        )
        logger.info(f"Conflicting bookings: {conflicting_bookings}")

        if not conflicting_bookings.exists():
            return Response({"available": True})

        # If already booked, suggest alternative time slots
        alternatives = []
        for i in range(1, 6):
            alternative_time = requested_datetime + datetime.timedelta(hours=i)
            if not Booking.objects.filter(
                date__lte=alternative_time,
                date__gt=alternative_time - datetime.timedelta(hours=1),
            ).exists():
                alternatives.append(alternative_time.isoformat())

        return Response({"available": False, "alternatives": alternatives})

    except Exception as e:
        logger.error(f"Error: {e}")
        return Response({"error": str(e)}, status=400)
