import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import RegisterButton from "./RegisterButton";

export default async function TournamentDetailPage({ tournamentId }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const apiUrl = process.env.NEXT_PUBLIC_DJANGO_URL;

  // Fetch torneo
  const resTournament = await fetch(`${apiUrl}/api/tournaments/${tournamentId}/`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    cache: "no-store",
  });

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
    <div className="tournament-detail_page">
      <Navbar showBack={true} />
      <div className="tournament-detail">
        <h1>{tournament.name}</h1>
        <p>
          <strong>Descripción:</strong> {tournament.description}
        </p>
        <p>
          <strong>Fecha y hora de inicio:</strong> {dateStr} {timeStr}
        </p>
        <p>
          <strong>Modo:</strong> {tournament.mode}
        </p>
        <p>
          <strong>Jugadores:</strong> {tournament.players}
        </p>
        <p>
          <strong>Premio:</strong> {tournament.prize} PTS
        </p>
        <p>
          <strong>Estado:</strong> {stateLabel}
        </p>

        {tournament.state === "pending" && token && (
          <RegisterButton tournamentId={tournament.id} token={token} />
        )}

        {tournament.state === "pending" && !token && (
          <p className="text-red-600">Debes iniciar sesión para inscribirte.</p>
        )}

        {/* Listado de participantes */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Participantes Inscritos</h2>
          {participants.length === 0 ? (
            <p>No hay participantes inscritos aún.</p>
          ) : (
            <ul>
              {participants.map((participant) => (
                <li key={participant.id} className="mb-2">
                  {/* Asumiendo que participant tiene un campo 'user' con 'username' o 'full_name' */}
                  {participant.user?.email || participant.user?.username || "Usuario sin nombre"}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <footer>
        <Image src={"/tournament.svg"} alt="tournament" width={80} height={80} />
      </footer>
    </div>
  );
}
