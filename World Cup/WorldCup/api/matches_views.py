from django.shortcuts import render
import pprint

from django.contrib.auth import authenticate

from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib import messages

# Create your views here.
from .serializers import Stadiums_Names_Serializer, StadiumsSerializer, TeamsSerializer , RefreesSerializer , MatchesSerializer, Tickets_add_Serializer , Tickets_print_Serializer, seatsSerializer
from matches.models import Stadiums, Teams as teamsview, Tickets
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


@api_view(['POST'])
def AddMatch(request):
    serializer = MatchesSerializer(data=request.data)
    
    if serializer.is_valid():
            serializer.save();
            return Response(status=status.HTTP_200_OK);

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST);

@api_view(['POST'])
def UpdateMactch(request , match_id):
    try:
        match = userview.objects.get(id=match_id)
    except matchview.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND);
    serializer = MatchesSerializer(instance=match,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_200_OK);
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST);

@api_view(['POST'])
def AddTicket(request , username):
    match_id = request.POST['match_id']
    row = request.POST['row']
    seat = request.POST['seat']
    #serializer = Tickets_add_Serializer(data=request.data)
    #if serializer.is_valid():
    current_match = matchview.objects.get(id = match_id)
    userobj = userview.objects.get(username=username)

    clashing_matches = matchview.objects.filter(Q(date = current_match.date) | Q(time = current_match.time) )
        
    if clashing_matches.count()==1:
        ticket = ticketsview(user=userobj.id, match = match_id,row=row , seat=seat);
        ticket.save()
        return Response(status=status.HTTP_200_OK);
    else:
        for i in clashing_matches:
            clash = ticketsview.objects.filter(user = userobj.id , match = i.id)
            if clash:
                return Response(status=status.HTTP_403_FORBIDDEN);
        else:
            ticket = ticketsview(user=userobj.id, match = match_id,row=row , seat=seat);
            ticket.save()
            return Response(status=status.HTTP_200_OK);


        







