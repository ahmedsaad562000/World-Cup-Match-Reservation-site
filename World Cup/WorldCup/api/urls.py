from django.urls import path
from . import views , matches_views


urlpatterns = [
    ###################################################
    #Dictionary
    path('',views.apiOverview,name="api-overview"),
    ##############################################################
    #Accounts
    path('users/',views.UserList,name="users"),
    path('getuser/<str:name>/',views.GetUser,name="getuser"),
    path('adduser/',views.AddUser,name="adduser"),
    path('updateuser/<str:name>/',views.UpdateUser,name="updateuser"),
    path('deleteuser/<str:name>/',views.DeleteUser,name="deleteuser"),
    path('login/<str:name>&<str:password>',views.login,name="login"),
    
    ##############################################################
    #Matches
    path('teams/',matches_views.TeamsList,name="teams"),
    path('refs/',matches_views.RefList,name="refs"),
    path('matches/',matches_views.matchesList,name="matches")
]