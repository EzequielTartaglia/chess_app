import TournamentDetailsPage from "@/src/views/Platform/Tournament/TournamentDetailsPage";

export default function tournamentDetails({ params }) {
  return <TournamentDetailsPage TournamentId={params.id} />;
}
