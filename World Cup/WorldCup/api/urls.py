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
    path('appusers/',views.ApprovedUserList,name="appusers"),
    path('unappusers/',views.UnapprovedUserList,name="unappusers"),
    path('approve/<str:name>/',views.approveUser,name="approve"),
    ##############################################################
    #Matches
    path('matches/',matches_views.matchesList,name="matches"),
    path('addmatch/',matches_views.AddMatch,name="addmatch"),
    path('updatematch/<int:match_id>',matches_views.UpdateMatch,name="updatematch"),
    ##############################################################
    #Tickets   
    path('tickets/<str:name>/',matches_views.ticketsList,name="tickets"),
    path('deleteticket/<int:ticket_id>/',matches_views.deleteticket,name="deleteticket"),
    path('addticket/<str:username>/',matches_views.AddTicket,name="addTicket"),
    path('seats/<int:match_id>',matches_views.getseats,name="seats"),
    ##############################################################
    #Stadiums
    path('addstadium/',matches_views.AddStadium,name="addstadium"),
    path('stadiums/',matches_views.stadiumsList,name="stadiums"),
    ##############################################################
    #Teams
    path('teams/',matches_views.TeamsList,name="teams"),
    ##############################################################
    #Refs
    path('refs/',matches_views.RefList,name="refs"),
    
   
]