export default function TournamentGamesTable({ participants = [] }) {
  if (participants.length === 0) {
    return (
      <table className="w-[100%] text-yellow-200 border-collapse mx-auto">
        <thead>
          <tr>
            <th
              colSpan={3}
              className="text-center text-2xl py-4 uppercase bg-neutral-800"
            >
              No hay juegos inscritos aún.
            </th>
          </tr>
        </thead>
      </table>
    );
  }

  return (
    <table className="w-[100%] text-yellow-200 border-collapse mx-auto">
      <thead>
        <tr className="">
          <th className="uppercase text-2xl py-2 px-4 text-center">
            ENCUENTROS EN PROGRESO
          </th>
        </tr>
      </thead>
      <tbody>
        {participants.map((participant, index) => {
          const fullName =
            participant.user?.first_name && participant.user?.last_name
              ? `${participant.user.first_name} ${participant.user.last_name}`
              : "Usuario sin nombre";

          const bgColor = index % 2 === 0 ? "bg-[#282828]" : "bg-[#171717]";

          return (
            <tr
              key={participant.id}
              className={`${bgColor} cursor-pointer transition-all duration-200 hover:bg-yellow-800`}
            >
              <td className="text-lg py-2 px-4 text-center">{fullName}</td>
              <td className="text-lg py-2 px-4 text-center">
                {participant.user?.elo || "-"}
              </td>
              <td className="text-lg py-2 px-4 text-center">
                {participant.user?.total_points || 0}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
