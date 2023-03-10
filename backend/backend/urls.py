from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/blog/", include("blog_api.urls")),
    path("api/user/", include("user_api.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
