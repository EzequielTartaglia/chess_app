from django.db import models

class Tournament(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    mode = models.CharField(max_length=20, default='Standard')
    amount_assigned = models.IntegerField(default=0)
    status = models.CharField(max_length=20, default='pending')
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    def tounament_details(self, id):
        tournament = Tournament.objects.get(id=id)
        return {
            'name': tournament.name,
            'start_date': tournament.start_date,
            'mode': tournament.mode,
            'amount_assigned': tournament.amount_assigned,
            'status': tournament.status,
            'description': tournament.description,
            'created_at': tournament.created_at,
            'updated_at': tournament.updated_at,
        }