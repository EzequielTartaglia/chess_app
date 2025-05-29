"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CompanyLogo from "./CompanyLogo";

export default function Navbar({ showBack, text }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    router.push("/");
  };

  return (
    <nav className="relative flex items-center justify-between px-4 py-2 shadow h-[70px]">
      {/* Botón de volver */}
      {showBack && (
        <button
          onClick={() => router.back()}
          aria-label="Volver"
          className="backBtn"
        >
          <Image
            src={"/arrow-left.svg"}
            alt="Volver"
            width={60}
            height={60}
            title="Volver"
          />
        </button>
      )}

      {/* Texto centrado en el eje Y */}
      {text && (
        <div className="mt-2 absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[var(--background-yellow)] text-[40px] font-semibold pointer-events-none">
          {text}
        </div>
      )}

      {/* Logo empresarial alineado a la derecha */}
      <Link href="/" className="ml-auto">
        <CompanyLogo />
      </Link>

      {/* Acciones */}
      <div className="actions flex items-center space-x-2 ml-auto">
        <button className="loguotBtn px-1">
          <Image
            src={"/bug.svg"}
            alt="Bug"
            width={40}
            height={40}
            title="Reportar un bug"
          />
        </button>
        <button className="loguotBtn px-1">
          <Image
            src={"/info.svg"}
            alt="Info"
            width={40}
            height={40}
            title="Info"
          />
        </button>
        <button className="loguotBtn px-1">
          <Image
            src={"/config.svg"}
            alt="Config"
            width={40}
            height={40}
            title="Config"
          />
        </button>
        <button className="loguotBtn px-1">
          <Image
            src={"/anuncios.svg"}
            alt="Anuncio"
            width={40}
            height={40}
            title="Anuncio"
          />
        </button>
        <button className="loguotBtn px-1" onClick={handleLogout}>
          <Image
            src={"/power-off.svg"}
            alt="Cerrar sesión"
            width={40}
            height={40}
            title="Cerrar sesión"
          />
        </button>
      </div>
    </nav>
  );
}
