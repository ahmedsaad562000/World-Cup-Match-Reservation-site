from django.shortcuts import render
import pprint

from django.contrib.auth import authenticate

from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib import messages
from datetime import datetime
from datetime import timedelta
# Create your views here.
from .serializers import Matches_add_Serializer, Matches_update_Serializer, Stadiums_Names_Serializer, StadiumsSerializer, TeamsSerializer , RefreesSerializer , MatchesSerializer, Tickets_add_Serializer , Tickets_print_Serializer, seatsSerializer
from matches.models import Teams as teamsview
from matches.models import Refrees as refview
from matches.models import Matches as matchview
from matches.models import Tickets as ticketsview
from accounts.models import User as userview
from matches.models import Stadiums as stadiumview

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
    #try:
        user = userview.objects.get(username = name)
        tickets =  ticketsview.objects.filter(user = user.id)
        serializer = Tickets_print_Serializer(tickets, many=True)
        return Response(serializer.data)
    #except ticketsview.DoesNotExist: #No Tickets for current user
    #    return Response(status=status.HTTP_404_NOT_FOUND);
    

@api_view(['GET'])
def getseats(request , match_id):
    #try:
        seats = ticketsview.objects.filter(match=match_id)
        serializer = seatsSerializer(seats, many=True)
        return Response(serializer.data)
    #except ticketsview.DoesNotExist: #No Tickets for current match
    #    return Response(status=status.HTTP_404_NOT_FOUND);





@api_view(['GET'])
def stadiumsList(request):
    Stadiums =  stadiumview.objects.all();
    serializer = StadiumsSerializer(Stadiums, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteticket(request , ticket_id):
    try:
        tickets =  ticketsview.objects.get(id = ticket_id)
    except ticketsview.DoesNotExist: 
        return Response(status=status.HTTP_400_BAD_REQUEST)    
    match = matchview.objects.get(id=tickets.match.id)
    current_date = datetime.now().date()

    if ((match.date - current_date) > timedelta(days=3)) or (current_date>match.date) :
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


@api_view(['POST'])
def AddMatch(request):
    serializer = Matches_add_Serializer(data=request.data)
    
    if serializer.is_valid():
            serializer.save();
            return Response(status=status.HTTP_200_OK);

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST);

@api_view(['POST'])
def UpdateMatch(request , match_id):
    try:
        match = matchview.objects.get(id=match_id)
    except matchview.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND);

    serializer = Matches_add_Serializer(instance=match,data=request.data)
    
    #serializer.initial_data['id']=match.id
    #print(serializer.initial_data['id'])
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK)
    else:
        #print(serializer.data['id'])
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def AddTicket(request , username):

    serializer = Tickets_add_Serializer(data=request.data)
    if serializer.is_valid():
        match_id = serializer.data['match']
        row = serializer.data['row']
        seat = serializer.data['seat']
        current_match = matchview.objects.get(id = match_id)
        userobj = userview.objects.get(username=username)

        clashing_matches = matchview.objects.filter(date = current_match.date ,time = current_match.time)
        print("\n")
        print(clashing_matches.count())
        print("\n")
        if clashing_matches.count()==1:
            print("\nim in\n");
            
            check_ticket=ticketsview.objects.filter(row=row,seat=seat,match=current_match)
            if not check_ticket:
                ticket = ticketsview(user=userobj, match = current_match,row=row , seat=seat);
                ticket.save()
                return Response(status=status.HTTP_200_OK);
            else:
                return Response(status=status.HTTP_403_FORBIDDEN);
        else:
            for i in clashing_matches:
                clash = ticketsview.objects.filter(user = userobj , match = i)
                if clash:
                    return Response(status=status.HTTP_401_UNAUTHORIZED);
            else:
                ticket = ticketsview(user=userobj, match = current_match,row=row , seat=seat);
                ticket.save()
                return Response(status=status.HTTP_200_OK);
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST);


        







