from django.contrib.auth import authenticate, login, logout

from rest_framework import generics, status, authentication, permissions, filters
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView

from django_filters.rest_framework import DjangoFilterBackend

from .serializers import RegisterSerializer, TournamentSerializer, LoginTokenSerializer, TournamentParticipantDetailSerializer, TournamentParticipantSerializer

from .models import Tournament, TournamentParticipant
from api import serializers

# Create your views here.


class LoginToken(TokenObtainPairView):
    serializer_class = LoginTokenSerializer


class RegisterAPI(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = ()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            "message": "Usuario creado correctamente"
        }, status=status.HTTP_201_CREATED)


class TournamentListCreateAPI(generics.ListCreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['state', 'start_date', 'mode']
    ordering_fields  = ['start_date', 'name']
    search_fields    = ['name']


class TournamentDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]


class RegisterToTournamentAPIView(generics.CreateAPIView):
    serializer_class = TournamentParticipantSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        tournament_id = self.kwargs.get('tournament_id')
        try:
            tournament = Tournament.objects.get(pk=tournament_id)
        except Tournament.DoesNotExist:
            raise serializers.ValidationError("El torneo no existe.")
        context['tournament'] = tournament
        return context

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context=self.get_serializer_context())
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Inscripción exitosa"}, status=status.HTTP_201_CREATED)


class TournamentParticipantsListAPIView(generics.ListAPIView):
    serializer_class = TournamentParticipantDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        tournament_id = self.kwargs.get('tournament_id')
        try:
            tournament = Tournament.objects.get(pk=tournament_id)
        except Tournament.DoesNotExist:
            raise serializers.ValidationError("El torneo no existe.")
        
        return TournamentParticipant.objects.filter(tournament=tournament)
