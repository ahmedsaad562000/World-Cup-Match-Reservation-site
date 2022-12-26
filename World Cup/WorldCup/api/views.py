
from django.shortcuts import render
import pprint

from django.contrib.auth import authenticate
from html5lib import serialize
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
		'UserList':'/users/',
		'GetUser':'/getuser/<str:name>/',
		'ADD':'/adduser/',
		'Update':'/updateuser/<str:name>/',
		'Delete':'/deleteuser/<str:name>/',
		}

	return Response(api_urls)

@api_view(['GET'])
def UserList(request):
    users = userview.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def GetUser(request, name):
    users = userview.objects.get(username=name)
    serializer = UserSerializer(users, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def AddUser(request):
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
        if userview.objects.get(username=serializer.Meta.model.username).exists():
            return Response(status=status.HTTP_409_CONFLICT);
        else:
            serializer.save();
            return Response(status=status.HTTP_200_OK);
            

@api_view(['POST'])
def UpdateUser(request , name):
    user = userview.objects.get(username=name)
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

@api_view(['GET'])
def login(request , name , password):
    
        user = authenticate(username=name , password=password)
        if user is not None:
            if user.objects.get(Q(role='A') | Q(approved=True)).exists():
                login(request, user);
                pp = pprint.PrettyPrinter(indent=4)
                role = user.role;
                pp.pprint("You are now logged in as {username} eith role: {role}.")
                
                return Response({
                    "username" : "{username}",
                    "role" : "{role}"
                });
            elif user.objects.get(approved=False).exists():
                return Response(status=status.HTTP_401_UNAUTHORIZED);    
        else:
            return Response(status=status.HTTP_403_FORBIDDEN);


