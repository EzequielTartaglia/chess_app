import TournamentDetailPage from "@/views/Tournaments/Details/TournamentDetailsPage";

export default function tournamentDetails({params}) {
  return (
    <TournamentDetailPage tournamentId={params.id}/>
  )
}
