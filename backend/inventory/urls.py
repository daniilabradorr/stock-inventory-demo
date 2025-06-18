from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, StockMovementViewSet

router = DefaultRouter()
router.register(r"items", ItemViewSet, basename="item")
router.register(r"movements", StockMovementViewSet, basename="movement")

urlpatterns = router.urls    # el router genera /items/, /items/{pk}/, etc.
