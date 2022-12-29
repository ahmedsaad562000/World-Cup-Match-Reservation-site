
from django.shortcuts import render
import pprint

from django.contrib.auth import authenticate

from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib import messages
# Create your views here.
from .serializers import UserSerializer
from accounts.models import User as userview
from django.db.models import Q

from rest_framework import status

from api import approve, serializers


@api_view(['GET','POST'])
def apiOverview(request):
	api_urls = {
        'Users':'-----------------------------------------',
		'UserList':'/users',
		'Get User':'/getuser/<str:name>',
		'ADD User':'/adduser',
		'Update User':'/updateuser/<str:name>',
		'Delete User':'/deleteuser/<str:name>',
        'login' : '/login/<str:name>&<str:password>',
        'Approved Users':'/appusers',
        'Unapproved Users':'/unappusers',
		'Stadiums':'----------------------------------------',
        'Add New Stadium':'/addstadium',
        'Get All Stadiums':'/stadiums',
        'Matches':'----------------------------------------',
        'Get All Matches':'/matches',
        'Add Match':'/addmatch',
        'Update Match':'/updatematch/<int:match_id>',
        'Teams':'----------------------------------------',
        'Get All Teams':'/teams',
        'Refrees':'----------------------------------------',
        'Get All Refrees':'/refs',
        'Tickets':'----------------------------------------',
        'Get Tickets of a user':'tickets/<str:name>',
        'Delete Ticket':'deleteticket/<int:ticketid>',
        'Add Ticket':'/addticket/<str:username>',
        'Get seats of a match':'/seats/<int:match_id>'
        }

	return Response(api_urls)



@api_view(['GET'])
def UserList(request):
    users = userview.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def GetUser(request, name):
    try:
        users = userview.objects.get(username=name)
        serializer = UserSerializer(users, many=False)
        return Response(serializer.data)
    except userview.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)



@api_view(['POST'])
def AddUser(request):
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
            serializer.save();
            return Response(status=status.HTTP_200_OK);

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST);



@api_view(['POST'])
def UpdateUser(request , name):
    try:
        user = userview.objects.get(username=name)
    except userview.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND);
    serializer = UserSerializer(instance=user,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK);
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST);



@api_view(['DELETE'])
def DeleteUser(request , name):
    try:
        user = userview.objects.get(username=name)
    except userview.DoesNotExist: 
        return Response(status=status.HTTP_400_BAD_REQUEST)    
    user.delete()
    return Response(status=status.HTTP_200_OK)



@api_view(['GET' , 'POST'])
def login(request , name , password):
    
        user = authenticate(username=name , password=password)
        if user is not None:
            if user.role=='A' or user.approves==True:
               # login(request, user);
                pp = pprint.PrettyPrinter(indent=4)
                pp.pprint("You are now logged in as "+user.username+ " with role: "+user.role)
                
                return Response({
                    "id" : user.id,
                    "username" : user.username,
                    "role" : user.role
                });
            elif user.approves==False:
                return Response(status=status.HTTP_401_UNAUTHORIZED);    
        else:
            return Response(status=status.HTTP_403_FORBIDDEN);

@api_view(['GET'])
def ApprovedUserList(request):
    users = userview.objects.filter(Q(approved=True) , Q(role='F') | Q(role='M') )
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def UnapprovedUserList(request):
    users = userview.objects.filter(Q(approved=False) , Q(role='F') | Q(role='M') )
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


