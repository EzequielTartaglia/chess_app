"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import NotificationComponent from "../../../utils/web-push/NotificationComponent";
import CompanyLogo from "@/components/CompanyLogo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const response = await res.json();

    if (res.ok) {
      const { access, refresh } = response;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      setShowNotification(true);
      router.push("/tournaments");
    } else {
      setError(response.detail || "Error al iniciar sesión.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center login_page">
      <div className="container border-3 border-border-color bg-background-yellow text-font-color-black max-w-[650px] p-5">
        <section className="hero text-center relative">
          <CompanyLogo text="LOGO EMPRESA" />
          <Link
            className="closeBtn absolute top-0 right-0 p-1 cursor-pointer"
            href={"/"}
          >
            <Image src={"/close.svg"} alt="close" width={25} height={25} />
          </Link>
        </section>

        {error && <p className="text-red-500 mb-4">⚠️ {error}</p>}

        {showNotification && (
          <NotificationComponent
            title="Inicio de sesión exitoso"
            message="Aquí podrás ver los torneos en vigencia y más información importante."
            icon="/standard.svg"
          />
        )}

        <form
          onSubmit={handleSubmit}
          className="text-center text-1.5rem font-bold uppercase mb-7"
        >
          <label className="block mb-2 w-full">
            Email
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-1 text-1.1rem border-3 border-border-color bg-background text-background-yellow text-center focus:outline-none"
            />
          </label>

          <label className="block mb-2 w-full">
            Contraseña
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-1 text-1.1rem border-3 border-border-color bg-background text-background-yellow text-center focus:outline-none"
            />
          </label>

          <div className="buttons flex justify-center items-center gap-2 h-16 mt-6">
            <button
              type="submit"
              className="flex justify-center items-center gap-3 w-full h-full bg-border-color text-background-yellow cursor-pointer uppercase font-bold border-none hover:bg-background text-1.5rem"
            >
              Ingresar
            </button>
            <Link
              href={"/terms"}
              className="flex justify-center items-center gap-3 w-full h-full bg-background-orange text-white no-underline uppercase font-bold hover:bg-background-orange-dark"
            >
              Términos y condic
            </Link>
          </div>
        </form>

        <div className="options text-center text-1.3rem uppercase font-bold">
          <span>
            No tienes cuenta?{" "}
            <Link href={"register/"} className="text-background-orange ml-5">
              Registrate
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
