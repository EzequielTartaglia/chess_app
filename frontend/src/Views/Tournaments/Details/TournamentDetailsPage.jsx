import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import RegisterButton from "./RegisterButton";
import Footer from "@/components/Footer";
import TournamentTable from "./TournamentTable";
import CountdownTimer from "./CountdownTimer";
import TournamentGamesTable from "./TournamentGamesTable";
import TournamentInfoTable from "./TournamentInfoTable";

export default async function TournamentDetailPage({ tournamentId }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const apiUrl = process.env.NEXT_PUBLIC_DJANGO_URL;

  // Fetch torneo
  const resTournament = await fetch(
    `${apiUrl}/api/tournaments/${tournamentId}/`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      cache: "no-store",
    }
  );
  // Fetch points del usuario actual
  const res = await fetch(`${apiUrl}/api/users/me/points/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  let currentUserTotalPoints = 0;
  if (res.ok) {
    const data = await res.json();
    currentUserTotalPoints = data.total_points;
  } else {
    currentUserTotalPoints = 0;
  }

  if (resTournament.status === 404) {
    notFound();
  }
  if (!resTournament.ok) {
    throw new Error("Error al cargar el torneo");
  }

  const tournament = await resTournament.json();

  // Fetch participantes inscritos
  const resParticipants = await fetch(
    `${apiUrl}/api/tournaments/${tournamentId}/participants/`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      cache: "no-store",
    }
  );

  let participants = [];
  if (resParticipants.ok) {
    participants = await resParticipants.json();
  } else if (resParticipants.status !== 404) {
    // Si falla pero no es 404, podemos lanzar error
    throw new Error("Error al cargar los participantes");
  }

  // Formateo de fecha y hora
  const iso = `${tournament.start_date}T${tournament.start_time}`;
  const date = new Date(iso);
  const dateStr = date.toLocaleDateString("es-AR").replace(/-/g, "/");
  const timeStr = date.toLocaleTimeString("es-AR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const stateLabel =
    {
      pending: "Pendiente",
      in_progress: "En curso",
      finish: "Finalizado",
    }[tournament.state] || tournament.state;

  return (
    <>
      <Navbar showBack={true} text={<CountdownTimer isoDateTime={iso} />} />

      <div className="tournament-detail_page">
        <div className="tournament-detail">
          <TournamentInfoTable
            tournament={tournament}
            dateStr={dateStr}
            timeStr={timeStr}
            stateLabel={stateLabel}
          />
          {tournament.state === "pending" && (
            <div className="flex justify-center mt-4">
              {token ? (
                <RegisterButton tournamentId={tournament.id} token={token} />
              ) : (
                <p className="text-red-600 text-center">
                  Debes iniciar sesión para inscribirte.
                </p>
              )}
            </div>
          )}

          {tournament.state === "pending" && !token && (
            <p className="text-red-600">
              Debes iniciar sesión para inscribirte.
            </p>
          )}

          {/* Listado de participantes */}

          <div
            className={`w-full mt-8 grid gap-4 ${
              tournament.state === "pending"
                ? "grid-cols-1"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            <section
              className={tournament.state === "pending" ? "col-span-full" : ""}
            >
              <TournamentTable participants={participants} />
            </section>
            {tournament.state === "in_progress" && (
              <section>
                <TournamentGamesTable participants={participants} />
              </section>
            )}
          </div>
        </div>
      </div>

      <Footer
        showSpectIcon={true}
        showRankIcon={true}
        showMarketplaceIcon={true}
        showZettsIcon={true}
        showShopIcon={true}
        text=""
        user={!!token}
        userZetts={Number.parseInt(currentUserTotalPoints, 10) || 0}
      />
    </>
  );
}
