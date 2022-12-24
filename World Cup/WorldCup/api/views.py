
from django.shortcuts import render
from django.http import HttpResponseNotFound, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib import messages
# Create your views here.
from .serializers import UserSerializer
from accounts.models import User as userview

from api import serializers
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
    messages.error(request, 'User Already Exists.')
    if serializer.is_valid():
        serializer.save()

    try:
        userview.objects.get(username=serializer.Meta.model.username).exists()
    except userview.DoesNotExist: 
        return HttpResponseNotFound('asd')
    return Response(serializer.data)

@api_view(['POST'])
def UpdateUser(request , name):
    user = userview.objects.get(username=name)
    serializer = UserSerializer(instance=user,data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['DELETE'])
def DeleteUser(request , name):
    try:
        user = userview.objects.get(username=name)
    except userview.DoesNotExist: 
        return Response()    
    user.delete()

    return Response()