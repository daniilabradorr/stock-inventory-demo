from rest_framework import serializers
from .models import Item, StockMovement

# ─────────────────────────── Item ────────────────────────────
class ItemSerializer(serializers.ModelSerializer):
    """
    Serializador <-> JSON del modelo Item.
    Exponer únicamente los campos que necesita el front.
    """
    class Meta:
        model = Item
        fields = ["id", "sku", "ean13", "quantity"]


# ─────────────────── Stock Movement / Historial ──────────────
class StockMovementSerializer(serializers.ModelSerializer):
    # Quiero que el front reciba el SKU directamente:
    sku = serializers.ReadOnlyField(source="item.sku")
    # Convierto timestamp → created_at para que sea más intuitivo
    created_at = serializers.ReadOnlyField(source="timestamp")

    """
    Notas (en primera persona):
    • No necesito enviar el objeto item completo ni su ID.
    • 'movement_type' lo puedo omitir porque con delta (+/-)
      ya es evidente si es entrada o salida.
    • El usuario que hizo el cambio (user) tampoco lo pide la prueba.
    """

    class Meta:
        model = StockMovement
        fields = ["id", "sku", "delta", "created_at"]   # ← sólo lo que uso
        read_only_fields = fields                        # todo es de solo lectura
