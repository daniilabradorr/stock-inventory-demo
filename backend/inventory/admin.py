from django.contrib import admin
from .models import Item, StockMovement

#Registro los dos modelos para que puedan aparecer en el apartado admin y poder manejarlos mejor
@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ("sku", "ean13", "quantity")
    search_fields = ("sku", "ean13")


@admin.register(StockMovement)
class StockMovementAdmin(admin.ModelAdmin):
    list_display = ("item", "movement_type", "delta", "timestamp", "user")
    list_filter = ("movement_type", "timestamp")
    search_fields = ("item__sku",)
