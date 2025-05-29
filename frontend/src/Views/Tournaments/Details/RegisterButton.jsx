"use client";

import parseJwt from "@/helpers/parseJwt";
import React, { useEffect, useState } from "react";

export default function RegisterButton({ tournamentId, token }) {
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  async function checkRegistration() {
    if (!token) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_URL}/api/tournaments/${tournamentId}/participants/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      if (!res.ok) {
        console.error("Error al obtener participantes");
        return;
      }

      const participants = await res.json();
      if (!participants.length) return;

      const currentUserEmail = parseJwt(token).email;
      if (!currentUserEmail) {
        console.error("No se pudo extraer el email del token.");
        return;
      }

      const found = participants.some(
        (p) => p.user?.email === currentUserEmail
      );

      setIsRegistered(found);
    } catch (error) {
      console.error("Error al verificar inscripción:", error);
    }
  }

  useEffect(() => {
    checkRegistration();
  }, [tournamentId, token]);

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
        return;
      }

      await checkRegistration();
    } catch (error) {
      console.error("Error al inscribirse:", error);
      alert("Ocurrió un error al intentar inscribirse.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="submit"
      disabled={loading || isRegistered}
      className={
        isRegistered
          ? "px-4 font-bold text-[34px] h-[60px] bg-[var(--background-footer)] text-[var(--background-yellow)] opacity-50 cursor-not-allowed"
          : "px-4 font-bold text-[34px] h-[60px] bg-[var(--background-footer)] text-[var(--background-yellow)]"
      }
      onClick={!isRegistered ? handleRegister : undefined}
    >
      {isRegistered
        ? "Ya estás inscrito"
        : loading
        ? "Inscribiendo..."
        : "Inscribirse"}
    </button>
  );
}
