from django.urls import path
from . import views

urlpatterns = [
    path('',views.apiOverview,name="api-overview"),
    path('users/',views.UserList,name="users"),
    path('getuser/<str:name>/',views.GetUser,name="getuser"),
    path('adduser/',views.AddUser,name="adduser"),
    path('updateuser/<str:name>/',views.UpdateUser,name="updateuser"),
    path('deleteuser/<str:name>/',views.DeleteUser,name="deleteuser"),
]