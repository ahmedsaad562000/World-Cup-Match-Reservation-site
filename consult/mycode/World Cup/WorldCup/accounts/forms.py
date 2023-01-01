from django.contrib.auth.forms import UserCreationForm
from django.db import transaction
from django import forms
from .models import User

# class UserSignIn(UserCreationForm):
#     Username = forms.CharField(required=True)
#     password = forms.CharField(required=True)




# class UserSignUp(UserCreationForm):
#     firstname = forms.CharField(required=True)
#     Username = forms.CharField(required=True)
#     birthdate = forms.DateField(required=True)
#     email = forms.EmailField(required=True)

#     class Meta(UserCreationForm.Meta):
#         model = User
    
#     @transaction.atomic
#     def data_save(self):
#         user = super().save(commit=False)
#         user.firstname = self.cleaned_data.get('firstname')
#         user.Username = self.cleaned_data.get('Username')
#         user.birthdate = self.cleaned_data.get('birthdate')
#         user.password = self.cleaned_data.get('password')
#         user.email = self.cleaned_data.get('email')
#         user.save()
        
#         return user
