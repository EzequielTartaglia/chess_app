import TournamentDetailPage from "@/Views/Tournaments/Details/TournamentDetailsPage";

export default function tournamentDetails({params}) {
  return (
    <TournamentDetailPage tournamentId={params.id}/>
  )
}
