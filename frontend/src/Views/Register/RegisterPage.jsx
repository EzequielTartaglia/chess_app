"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [terms, setTerms] = useState(false);
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_DJANGO_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${apiUrl}/api/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: fname,
        last_name: lname,
        user_name: username,
        email,
        password1: password,
        password2: password2,
        terms,
      }),
    });

    const response = await res.json();

    if (res.ok) {
      router.push("/login");
    } else {
      console.log("Error al registrar el usuario", res);
      console.log("respuesta", response);
    }
  };

  return (
    <div className="min-h-screen flex justify-center p-4 overflow-auto md:items-center register_page">
      <div className="container border-3 border-border-color bg-background-yellow text-font-color-black max-w-md md:max-w-lg lg:max-w-[650px] p-5">
        <section className="hero text-center relative">
          <h2 className="text-2xl mb-10">LOGO EMPRESA</h2>
          <Link
            className="closeBtn absolute top-0 right-0 p-1 cursor-pointer"
            href={"/"}
          >
            <Image src={"/close.svg"} alt="close" width={30} height={30} />
          </Link>
        </section>

        <form
          onSubmit={handleSubmit}
          className="text-center text-xl font-bold uppercase mb-7"
        >
          <label className="block mb-2 w-full">
            Nombre
            <input
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
              className="w-full p-1.5 text-xl border-3 border-border-color bg-background text-background-yellow text-center focus-visible:outline-none"
            />
          </label>

          <label className="block mb-2 w-full">
            Apellido
            <input
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
              className="w-full p-1.5 text-xl border-3 border-border-color bg-background text-background-yellow text-center focus-visible:outline-none"
            />
          </label>

          <label className="block mb-2 w-full">
            Nombre de usuario
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-1.5 text-xl border-3 border-border-color bg-background text-background-yellow text-center focus-visible:outline-none"
            />
          </label>

          <label className="block mb-2 w-full">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-1.5 text-xl border-3 border-border-color bg-background text-background-yellow text-center focus-visible:outline-none"
            />
          </label>

          <label className="block mb-2 w-full">
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-1.5 text-xl border-3 border-border-color bg-background text-background-yellow text-center focus-visible:outline-none"
            />
          </label>

          <label className="block mb-2 w-full">
            Repetir contraseña
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              className="w-full p-1.5 text-xl border-3 border-border-color bg-background text-background-yellow text-center focus-visible:outline-none"
            />
          </label>

          <label className="termsLabel block mb-2 w-full">
            <span>Leí y acepto los términos y condiciones</span>
            <div className="checkContainer">
              <input
                type="checkbox"
                value={terms}
                onChange={(e) => setTerms(e.target.checked)}
                required
              />
            </div>
          </label>

          <div className="buttons flex flex-col md:flex-row justify-center items-center gap-2.5 h-auto mt-5">
            <button
              type="submit"
              className="flex justify-center items-center gap-4 w-full h-12 bg-border-color text-background-yellow cursor-pointer uppercase font-bold border-none text-xl hover:bg-background transition-all duration-300 ease-in-out"
            >
              Registrar
            </button>
            <button className="terms w-full">
              <Link
                href={"terms"}
                className="flex justify-center items-center gap-4 w-full h-12 bg-background-orange text-white cursor-pointer uppercase font-bold no-underline border-none hover:bg-background-orange-dark transition-all duration-300 ease-in-out"
              >
                Términos y condic
              </Link>
            </button>
          </div>
        </form>

        <div className="options text-center text-xl uppercase font-bold">
          <span>
            Ya tienes cuenta?{" "}
            <Link
              href={"login/"}
              className="no-underline text-background-orange ml-5"
            >
              Iniciar sesion
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
