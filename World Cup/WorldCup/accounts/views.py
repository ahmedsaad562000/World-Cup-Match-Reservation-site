
# Create your views here.
from email import message
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from .approve import ApprovedAuthBackend
from django.contrib import messages
from django.views.generic import CreateView
from .models import User
#from .forms import UserSignUp , UserSignIn

# Create your views here.
from django.views.decorators.csrf import ensure_csrf_cookie


def home(request):
    user = request.user
    return render(request, 'home.html')

def register(request):
    return render(request, 'register.html')

#class user_register(CreateView):
#     model = User  
#     form_class = UserSignIn
#     template_name= 'register.html'

#     def form_valid(self, form):
#         user = form.save()
#         login(self.request, user)
#         return redirect('/accounts/home')

@ensure_csrf_cookie
def login_request(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = ApprovedAuthBackend.authenticate(ApprovedAuthBackend,request,username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, "You are now logged in as {username}.")
                #Role = User.objects.filter(username=username)
                if user.role=='A':
                    return redirect("/admin")
                else:
                    return redirect("/home")
            else:
                messages.error(request,"Invalid username or password.")
        else:
            messages.error(request,"Invalid username or password.")
    #form = AuthenticationForm()
    return render(request=request, template_name="false.html")

def logout_user(request):
    logout(request)
    return redirect('/register')