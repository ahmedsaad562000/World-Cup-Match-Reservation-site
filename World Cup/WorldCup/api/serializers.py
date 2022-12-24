
from curses import meta

from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['id','username','first_name','last_name','email','role','nationality']
extra_kwargs = {
                'name': {
                    'validators': [
                        UniqueValidator(
                            queryset=User.objects.all()
                        )
                    ]
                }
            }
            