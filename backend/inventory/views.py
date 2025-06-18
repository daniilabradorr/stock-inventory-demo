from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Item, StockMovement
from .serializers import ItemSerializer, StockMovementSerializer


class ItemViewSet(viewsets.ModelViewSet):
    """
    CRUD completo para Item:
      list, retrieve, create, destroy, update, partial_update.
    Protegido con JWT que he puesto (IsAuthenticated).

    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    #Sobreeescribo sólo el PATCH parcial (quantity)
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        new_qty = request.data.get("quantity")
        if new_qty is None:
            return Response(
                {"detail": "quantity is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        # Lógica  centralizada en el modelo:
        instance.adjust_quantity(int(new_qty), user=request.user)
        return Response(self.get_serializer(instance).data)


class StockMovementViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Sólo list & retrieve.  Prohino el POST o DELETE.

    """
    queryset = StockMovement.objects.select_related("item")
    serializer_class = StockMovementSerializer
    permission_classes = [IsAuthenticated]
