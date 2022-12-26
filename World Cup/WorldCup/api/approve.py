from .models import User
class ApprovedAuthBackend:
    """
    Custom authentication backend.

    Allows users to log in using their email address.
    """

    def authenticate(self, request, username=None, password=None):
        """
        Overrides the authenticate method to allow users to log in using their email address.
        """
        try:
            user = User.objects.get(username=username)

            if user.check_password(password) and (user.approved==True or user.role=='A'):
                return user
            return None
        except User.DoesNotExist:
            return None

    def get_user(self, username):
        """
        Overrides the get_user method to allow users to log in using their email address.
        """
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return None