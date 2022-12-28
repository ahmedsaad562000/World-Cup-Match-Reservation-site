
from email.policy import default
from enum import unique
from tkinter import CASCADE
from django.db import models
from django.core.validators import URLValidator
from django.forms import CharField
from tkinter import CASCADE


class Teams(models.Model):
    name = models.CharField(max_length=30 , unique=True, primary_key=True);
    link = models.URLField(null=True);
    def __str__(self):
        return self.name


class Refrees(models.Model):
    name = models.CharField(max_length=255 , unique=True , primary_key=True , default = "sub_refree");
    def __str__(self):
        return self.name


class Stadiums(models.Model):
    name = models.CharField(max_length=100 , unique=True, primary_key=True , default="sub_stadium");
    rows = models.SmallIntegerField(default=7);
    seats_per_row = models.SmallIntegerField(default=7);
    link = models.TextField(validators=[URLValidator()] , null=True);
    description = models.TextField(null=True);
    def __str__(self):
        return self.name

class Matches(models.Model):
    h_team = models.ForeignKey(Teams,related_name='h_team', on_delete=models.CASCADE);
    a_team = models.ForeignKey(Teams ,on_delete=models.CASCADE);
    stadium =  models.ForeignKey(Stadiums ,on_delete=models.SET_DEFAULT ,default="sub_stadium");
    date = models.DateField();
    time = models.TimeField();
    ref = models.ForeignKey(Refrees,related_name='ref' ,on_delete=models.SET_DEFAULT , default = "sub_refree");
    line1 = models.ForeignKey(Refrees,related_name='line1', on_delete=models.SET_DEFAULT , default = "sub_refree1");
    line2 = models.ForeignKey(Refrees, on_delete=models.SET_DEFAULT, default = "sub_refree2");
    class Meta:
        unique_together = ('h_team', 'a_team','stadium','date','time','ref','line1','line2');

class Tickets(models.Model):
    match = models.ForeignKey(Matches , on_delete=models.CASCADE);
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE);
    row = models.SmallIntegerField();
    seat = models.SmallIntegerField();





    


    



