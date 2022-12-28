from django.shortcuts import render
import pprint

from django.contrib.auth import authenticate

from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib import messages
# Create your views here.
from .serializers import TeamsSerializer , RefreesSerializer , MatchesSerializer
from matches.models import Teams as teamsview
from matches.models import Refrees as refview
from matches.models import Matches as matchview
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


