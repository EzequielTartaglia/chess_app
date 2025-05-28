from django.contrib import admin
from .models import User, Tournament, TournamentParticipant
# Register your models here.


admin.site.register(User)

admin.site.register(Tournament)
admin.site.register(TournamentParticipant)