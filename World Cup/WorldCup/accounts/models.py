
from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # id = models.BigAutoField(primary_key=True);
    #Username = models.CharField(max_length=100,unique=True,null=False);
    #password = models.CharField(max_length=100,null=False);
    
   ######################################
    #Choices for role
        #Field.choices
    Admin_role = 'A';
    Manager_role = 'M';
    Fan_role = 'F';
    Users_Choices = [
        (Admin_role , "Admin"),
        (Manager_role , "Manager"),
        (Fan_role , "Fan")
    ]
   ######################################
    role = models.CharField(max_length=1 , choices=Users_Choices , default=Fan_role,null=False);

    
    approved = models.BooleanField(default=False,null=False);
    
    #nullable fields
    #firstname = models.CharField(max_length=100,null=True);
    #lastname = models.CharField(max_length=100,null=True);
    birthdate = models.DateField(null=True);
    ######################################
    #Choices for gender
        #Field.choices
    Male = 'M';
    Female = 'F';
    Gender_Choices = [
        (Male , "Male"),
        (Female , "Female")
    ]
   ######################################
    gender = models.CharField(max_length=1,choices=Gender_Choices , default=Male,null=True);
    email = models.EmailField(unique=True , null = True);
    nationality = models.CharField(max_length=255,null=True ,default="Egyptian");
    
    def __str__(self):
        return self.username