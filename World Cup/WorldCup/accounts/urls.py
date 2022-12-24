from django.urls import path
from . import views
from django.contrib import admin


urlpatterns = [
    #path('sign_up/', views.user_register.as_view(), name='sign_up'),
    path('', views.register, name='register'),
    path('register/', views.register, name='register'),
    path('login/', views.login_request, name='login'),
    path('logout/', views.logout_user, name='logout_user'),
    path('home/', views.home, name='home'),
    path('admin/', admin.site.urls, name='admin')
    ]