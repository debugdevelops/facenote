from users.serializers import PlayerSerializer, InstrumentSerializer
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_404_NOT_FOUND
from users.models import Instrument, Player
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from users.permissions import IsOwner, IsAdminOrReadOnly
from django.core.mail import send_mail
from django.conf import settings
from users.filters import PlayerFilter


class UserList(generics.ListAPIView):
    serializer_class = PlayerSerializer

    def get_queryset(self):
        return PlayerFilter(self.request.GET, queryset=Player.objects.all()).qs


@api_view(['POST', ])
def resgistration_view(request):

    if request.method == 'POST':
        serializer = PlayerSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data["message"] = "User successfully registered"
            data["email"] = account.email
            data["username"] = account.username
            data["location"] = account.location
            data["bio"] = account.bio
            token = Token.objects.get(user=account).key
            data["token"] = token
            return Response(data, status=HTTP_201_CREATED)
        else:
            return Response(data={"message": "Request Failed", "errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [IsOwner]


class InstrumentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Instrument.objects.all()
    serializer_class = InstrumentSerializer
    permission_classes = [IsAdminOrReadOnly]


class InstrumentList(generics.ListCreateAPIView):
    queryset = Instrument.objects.all()
    serializer_class = InstrumentSerializer
    permission_classes = [IsAdminOrReadOnly]


@api_view(["POST", ])
@permission_classes([IsAuthenticated])
def get_user(request):
    if request.method == "POST":
        serializer = PlayerSerializer(Player.objects.get(id=request.user.id))
        return Response(data=serializer.data, status=HTTP_200_OK)


@api_view(["POST", ])
@permission_classes([IsAuthenticated])
def send_email_view(request):
    if request.method == "POST":
        sender = request.user
        name = sender.name
        email = sender.email
        from_email = settings.EMAIL_HOST_USER
        reciever_id = request.data["reciever"]
        try:
            reciever = Player.objects.get(pk=reciever_id)
            to_email = reciever.email
            try:
                send_mail(
                    f"Invite from {name}",
                    f"{name} has invited you to join his/her band. You can contact him through his email: {email}",
                    from_email,
                    [to_email],
                    fail_silently=False,
                )
                return Response(status=HTTP_200_OK)
            except:
                return Response(status=HTTP_400_BAD_REQUEST)
        except Player.DoesNotExist:
            return Response(data={}, status=HTTP_404_NOT_FOUND)
