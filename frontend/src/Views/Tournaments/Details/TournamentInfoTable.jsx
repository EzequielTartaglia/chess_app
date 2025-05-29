export default function TournamentInfoTable({
  tournament,
  dateStr,
  timeStr,
  stateLabel,
}) {
  return (
    <table className="w-[100%] text-[var(--background-yellow)] border-collapse mx-auto mt-6">
      <thead>
        <tr>
          <th colSpan={2} className="text-center text-2xl py-4 uppercase">
            Información del Torneo
          </th>
        </tr>
      </thead>
      <tbody>
        <TableRow label="Descripción" value={tournament.description} />
        <TableRow
          label="Fecha y hora de inicio"
          value={`${dateStr} - ${timeStr}`}
        />
        <TableRow label="Modo" value={tournament.mode} />
        <TableRow label="Jugadores" value={tournament.players} />
        <TableRow label="Premio" value={`${tournament.prize} PTS`} />
        <TableRow label="Estado" value={stateLabel} />
      </tbody>
    </table>
  );
}

function TableRow({ label, value }) {
  return (
    <tr className="even:bg-[#171717] odd:bg-[#282828] uppercase">
      <td className="text-lg py-2 px-4 text-left font-semibold">{label}</td>
      <td className="text-lg py-2 px-4 text-left">{value}</td>
    </tr>
  );
}
