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
          ? "mt-4 w-full max-w-[15%] min-h-[70px] h-full flex items-center justify-center gap-[15px] text-gray-300 font-bold uppercase text-[1.5rem]  bg-[var(--border-color-light)] transition-all duration-300 ease-in-out opacity-50 cursor-not-allowed"
          : "mt-4 w-full max-w-[15%]  min-h-[70px]  h-full flex items-center justify-center gap-[15px] text-[var(--background-footer)] hover:text-[var(--font-color-yellow)] font-bold uppercase text-[1.5rem] cursor-pointer bg-[var(--font-color-yellow)] hover:bg-[var(--background-footer)] transition-all duration-300 ease-in-out"
      }
      onClick={!isRegistered ? handleRegister : undefined}
    >
      {isRegistered ? "Inscrito" : loading ? "Inscribiendo..." : "Inscribirse"}
    </button>
  );
}
