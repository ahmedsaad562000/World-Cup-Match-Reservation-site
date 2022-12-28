from django.shortcuts import render
import pprint

from django.contrib.auth import authenticate

from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib import messages

# Create your views here.
from .serializers import StadiumsSerializer, TeamsSerializer , RefreesSerializer , MatchesSerializer , Tickets_print_Serializer
from matches.models import Teams as teamsview
from matches.models import Refrees as refview
from matches.models import Matches as matchview
from matches.models import Tickets as ticketsview
from accounts.models import User as userview

from django.db.models import Q

from rest_framework import status

from api import approve, serializers


@api_view(['GET'])
def TeamsList(request):
    teams = teamsview.objects.all()
    serializer = TeamsSerializer(teams, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def RefList(request):
    refs = refview.objects.all()
    serializer = RefreesSerializer(refs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def matchesList(request):
    matches = matchview.objects.all()
    serializer = MatchesSerializer(matches, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def ticketsList(request , name):
    user = userview.objects.get(username = name)
    tickets =  ticketsview.objects.get(user = user.id)
    serializer = Tickets_print_Serializer(tickets, many=True)
    return Response(serializer.data)



    

@api_view(['DELETE'])
def deleteticket(request , ticket_id):
    try:
        tickets =  ticketsview.objects.get(id = ticket_id)
    except ticketsview.DoesNotExist: 
        return Response(status=status.HTTP_400_BAD_REQUEST)    
    match = matchview.objects.get(id=tickets.id)
    current_date = datetime.date.today()

    if ((match.date - current_date) > datetime.timedelta(days=3)):
        tickets.delete()
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)  

@api_view(['POST'])
def AddStadium(request):
    serializer = StadiumsSerializer(data=request.data)
    
    if serializer.is_valid():
            serializer.save();
            return Response(status=status.HTTP_200_OK);

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST);



