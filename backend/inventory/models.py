from django.db import models
from django.contrib.auth import get_user_model

#Modelo del producto en el inventario
class Item(models.Model):
    sku = models.CharField(max_length=32, unique=True)
    ean13 = models.CharField(max_length=13)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.sku
    
    #Ajusto el movimiento del stock con el movimiento correspondiente
    def adjust_quantity(self, new_qty: int, user=None):
        delta = new_qty - self.quantity
        if delta == 0:
            return
        mov_type = StockMovement.IN if delta > 0 else StockMovement.OUT
        self.quantity = new_qty
        self.save()
        StockMovement.objects.create(
            item=self, movement_type=mov_type, delta=delta, user=user
        )

#Modelo con el que registro las entradas y salidas de Stock
class StockMovement(models.Model):
    IN, OUT = "IN", "OUT"
    MOV_TYPES = [(IN, "Entrada"), (OUT, "Salida")]

    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="movements")
    movement_type = models.CharField(max_length=3, choices=MOV_TYPES)
    delta = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        get_user_model(), null=True, blank=True, on_delete=models.SET_NULL
    )

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self):
        sign = "+" if self.delta > 0 else ""
        return f"{self.item.sku} {sign}{self.delta}"
