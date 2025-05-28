"use client";

import React, { useState } from "react";

export default function RegisterButton({ tournamentId, token }) {
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_URL}/api/tournaments/${tournamentId}/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.detail || errorData.message || "No se pudo inscribir.");
        setLoading(false);
        return;
      }

      alert("¡Te has inscrito correctamente al torneo!");
    } catch (error) {
      console.error("Error al inscribirse:", error);
      alert("Ocurrió un error al intentar inscribirse.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      disabled={loading}
      className="font-bold text-[34px] h-[40px] bg-green-600 text-white"
      onClick={handleRegister}
    >
      {loading ? "Inscribiendo..." : "Inscribirse"}
    </button>
  );
}
