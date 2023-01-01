from distutils.command.check import check
from django.shortcuts import render
import pprint
from django.utils.dateparse import parse_date , parse_time
from django.contrib.auth import authenticate

from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib import messages
from datetime import datetime
from datetime import timedelta
# Create your views here.
from .serializers import Matches_add_Serializer, Matches_update_Serializer, Stadiums_Names_Serializer, StadiumsSerializer, TeamsSerializer , RefreesSerializer , MatchesSerializer, Tickets_add_Serializer , Tickets_print_Serializer, seatsSerializer
from matches.models import Teams as teamsview, Tickets
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
        tickets =  ticketsview.objects.filter(user = user.id , seat_status=True)
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


@api_view(['GET'])
def deleteticket(request , ticket_id):
    try:
        tickets =  ticketsview.objects.get(id = ticket_id)
    except ticketsview.DoesNotExist: 
        return Response(status=status.HTTP_400_BAD_REQUEST)    
    match = matchview.objects.get(id=tickets.match.id)
    current_date = datetime.now().date()

    if ((match.date - current_date) > timedelta(days=3)) or (current_date>match.date) :
        #tickets.delete()
        tickets.seat_status=False;
        tickets.save();
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
            #Hisa Checks
            curr_match_date = serializer.validated_data.get('date')
            curr_match_time = serializer.validated_data.get('time')
            start = datetime(2000, 1, 1,hour=curr_match_time.hour, minute=curr_match_time.minute, second=curr_match_time.second)
            h_team_name = serializer.validated_data.get('h_team')
            a_team_name = serializer.validated_data.get('a_team')
            h_teamobj = teamsview.objects.get(name=h_team_name);
            a_teamobj = teamsview.objects.get(name=a_team_name);
            #########################################################
            #1- no team of the two teams has match in the same day
            #########################################################
            first_clashing_matches = matchview.objects.filter(Q(date=curr_match_date) , Q(a_team=h_teamobj) | Q(h_team=h_teamobj) | Q(h_team=a_teamobj) | Q(a_team=a_teamobj));
            if first_clashing_matches.count() > 0:
                return Response(status=status.HTTP_401_UNAUTHORIZED);


            ############################################################
            curr_match_stadium_name = serializer.validated_data.get('stadium')
            curr_match_stadium = stadiumview.objects.get(name=curr_match_stadium_name)
            time_upper_bound = (start+timedelta(hours=3)).time();
            time_lower_bound = (start-timedelta(hours=3)).time();
            clashing_matches1 = matchview.objects.filter(date=curr_match_date ,stadium=curr_match_stadium , time__gte=start.time() , time__lt=time_upper_bound)
            clashing_matches = matchview.objects.filter(date=curr_match_date ,stadium=curr_match_stadium , time__lte=start.time() , time__gt=time_lower_bound)
            if ((clashing_matches.count() !=0) or (clashing_matches1.count() !=0)):
                print(clashing_matches.count())
                print(clashing_matches1.count())
                return Response(status=status.HTTP_403_FORBIDDEN);
            
            # stadium_name = serializer.validated_data.get('stadium');
            # stadiumobj = stadiumview.objects.get(name=stadium_name);
            rowses = curr_match_stadium.rows;
            seats_per_rows = curr_match_stadium.seats_per_row;
            print(rowses);
            print(seats_per_rows);
            serializer.save();
            new_match = matchview.objects.get(date=curr_match_date , time=curr_match_time , stadium =curr_match_stadium);
            for i in range(0,rowses):
                for j in range(0,seats_per_rows):
                    new_ticket=ticketsview(match=new_match , row=i , seat=j ,seat_status=False);
                    new_ticket.save();

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
        new_match_time = serializer.validated_data.get('time');
        new_match_date = serializer.validated_data.get('date');
        start = datetime(2000, 1, 1,hour=new_match_time.hour, minute=new_match_time.minute, second=new_match_time.second)
        curr_match_stadium_name = serializer.validated_data.get('stadium')
        curr_match_stadium = stadiumview.objects.get(name=curr_match_stadium_name)
        time_upper_bound = (start+timedelta(hours=3)).time();
        time_lower_bound = (start-timedelta(hours=3)).time();
        clashing_matches1 = matchview.objects.filter(date=curr_match_date ,stadium=curr_match_stadium , time__gte=start.time() , time__lt=time_upper_bound)
        clashing_matches = matchview.objects.filter(date=curr_match_date ,stadium=curr_match_stadium , time__lte=start.time() , time__gt=time_lower_bound)

        serializer.save()
        return Response(status=status.HTTP_200_OK)
    else:
        #print(serializer.data['id'])
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def AddTicket(request , username):

    serializer = seatsSerializer(data=request.data)
    ticket_id = serializer.initial_data['id'];
    if serializer.is_valid():
        
        seat_status = serializer.validated_data.get('seat_status');
        
        if seat_status == True:

            print(ticket_id)
            print(seat_status)
            ticketobj = ticketsview.objects.get(id=ticket_id)
            current_match = ticketobj.match
            start = datetime(2000, 1, 1,hour=current_match.time.hour, minute=current_match.time.minute, second=current_match.time.second)
            time_upper_bound = (start+timedelta(hours=3)).time();
            time_lower_bound = (start-timedelta(hours=3)).time();
            row = serializer.validated_data.get('row')
            seat = serializer.validated_data.get('seat')
            userobj = userview.objects.get(username=username)

            check_ticket=ticketsview.objects.filter(row=row,seat=seat,match=current_match,seat_status=True)
            if(check_ticket.count()==1):
                print("ana hna")
                return Response(status=status.HTTP_200_OK);
            
            clashing_matches = matchview.objects.filter(date = current_match.date ,time__gt=time_lower_bound , time__lt=time_upper_bound)
            print("\n")
            print(clashing_matches.count())
            print("\n")
            if clashing_matches.count()==1:
                print("\nim in\n");
                
                check_ticket=ticketsview.objects.filter(row=row,seat=seat,match=current_match)
                for k in check_ticket:
                    k.seat_status=True;
                    k.user = userobj;
                    k.save();
                    print("\nadded and saved\n");
                return Response(status=status.HTTP_200_OK);
                # if not check_ticket:
                #     ticket = ticketsview(user=userobj, match = current_match,row=row , seat=seat);
                #     ticket.save()
                #     return Response(status=status.HTTP_200_OK);
                # else:
                #     return Response(status=status.HTTP_403_FORBIDDEN);
            else:
                print("\nim in there are multiple clashing\n");
                for i in clashing_matches:
                    if i!=current_match:
                        clash = ticketsview.objects.filter(user = userobj , match = i , seat_status=True)
                        if clash.count()>0:
                            return Response(status=status.HTTP_401_UNAUTHORIZED);
                check_ticket=ticketsview.objects.filter(row=row,seat=seat,match=current_match)
                for k in check_ticket:
                    k.seat_status=True;
                    k.user = userobj;
                    k.save();
                    print("\nadded and saved\n");
                return Response(status=status.HTTP_200_OK);
        else:
            print("\nstate is false\n");
            return Response(status=status.HTTP_200_OK);
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST);


        







