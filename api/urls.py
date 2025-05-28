from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenBlacklistView,
)

from . import views


urlpatterns = [
    path('api/register/', views.RegisterAPI.as_view(), name='api_register'),

    path('api/tournaments/', views.TournamentListCreateAPI.as_view(), name='tournament_list'),
    path('api/tournaments/<int:pk>/', views.TournamentDetailAPI.as_view(), name='tournament_detail'),
    path('api/tournaments/<int:tournament_id>/register/', views.RegisterToTournamentAPIView.as_view(), name='register_tournament'),
    path('api/tournaments/<int:tournament_id>/participants/', views.TournamentParticipantsListAPIView.as_view(), name='tournament-participants'),

    path('api/login/', views.LoginToken.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/users/me/points/', views.UserPointsCurrentAPI.as_view(), name='user-points'),

]
