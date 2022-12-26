
from curses import meta
from html5lib import serialize

from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from accounts.models import User
from matches.models import Stadiums , Matches , Teams , Tickets , Refrees


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['id','username','first_name','last_name','email','role','nationality']

class StadiumsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stadiums
        fields=['name','rows','seats_per_row','link','description']

class TeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teams
        fields="__all__"

class RefreesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refrees
        fields="__all__"

class MatchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matches
        fields="__all__"

class Tickets_print_Serializer(serializers.ModelSerializer):
        h_team = MatchesSerializer.SlugRelatedField(many=False,read_only=True,slug_field='h_team');
        a_team = MatchesSerializer.SlugRelatedField(many=False,read_only=True,slug_field='a_team');
        stadium = StadiumsSerializer.SlugRelatedField(many=False,read_only=True,slug_field='name');  
        date = MatchesSerializer.SlugRelatedField(many=False,read_only=True,slug_field='date');
        time = MatchesSerializer.SlugRelatedField(many=False,read_only=True,slug_field='time');
        class Meta:
            model = Tickets
            fields = ['id' ,'h_team' , 'a_team' , 'stadium' ,'date' ,'time','row','seat']

class Tickets_add_Serializer(serializers.ModelSerializer):
        class Meta:
            model = Tickets
            fields = ['match' , 'user' ,'row','seat']



            