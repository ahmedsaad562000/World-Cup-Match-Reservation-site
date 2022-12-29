
from curses import meta
from rest_framework.validators import UniqueTogetherValidator

from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from accounts.models import User
from matches.models import Stadiums , Matches , Teams , Tickets , Refrees
from django.db import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['id','username','first_name','last_name','email','role','nationality']

class StadiumsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stadiums
        fields=['name','rows','seats_per_row','link','description']

class Stadiums_Names_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Stadiums
        fields=['name']




class TeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teams
        fields=['name']

class TeamslinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teams
        fields="__all__"

class RefreesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refrees
        fields=['name']

class MatchesSerializer(serializers.ModelSerializer):
    H_team = TeamslinkSerializer(source='h_team', many=False)
    A_team = TeamslinkSerializer(source='a_team', many=False)
    class Meta:
        model = Matches
        fields=['id' , 'date' ,'time' , 'stadium' ,'H_team','A_team' ,'stage','ref' ,'line1' ,'line2']
        validators = [
            UniqueTogetherValidator(
                queryset=Matches.objects.all(),
                fields=['date', 'time' , 'stadium']
            )
        ]        

        
class Matches_Tickets_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Matches

        fields=['id' , 'date' ,'time' , 'stadium' ,'h_team','a_team']


class Tickets_print_Serializer(serializers.ModelSerializer):
        match_info = Matches_Tickets_Serializer(source='match', many=False)
        class Meta:
            model = Tickets
            fields = ['id' ,'match_info','row','seat']
            ##add no. 
class Tickets_add_Serializer(serializers.ModelSerializer):
        class Meta:
            model = Tickets
            fields = ['match' , 'user' ,'row','seat']
class seatsSerializer(serializers.ModelSerializer):
        class Meta:
            model = Tickets
            fields = ['row','seat']



            