import TournamentDetailPage from "@/views/Tournaments/Details/TournamentDetailsPage";

export default async function tournamentDetails({ params }) {
  return (
    <TournamentDetailPage tournamentId={params.id} />
  )
}

