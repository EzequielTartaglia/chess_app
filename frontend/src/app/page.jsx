import Button from "@/components/Button";

export default function HomePage() {
  return (
    <div className="relative w-screen h-screen bg-primary overflow-hidden">
      {/* Rombos decorativos */}
      <div className="absolute w-[600px] h-[600px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#F5E2A0] rotate-[135deg]">
        <div className="absolute w-[168px] h-[168px] left-[2%] top-[70%] bg-primary rounded-[38px]" />
      </div>

      {/* Título */}
      <div
        className="
          absolute 
          left-1/2 -translate-x-1/2 top-[37%] 
          w-[300px] h-[114px] 
          font-bold 
          text-[59px] leading-[50px] 
          text-secondary
          flex items-center justify-center
          "
      >
        LOGO EMPRESA
      </div>

      {/* Descripción */}
      <p
        className="
          absolute
          w-[300px] h-[120.85px] 
          left-1/2 -translate-x-1/2 top-[50%] 
          font-bold 
          text-[10px] leading-[12px] 
          text-justify 
          text-secondary"
      >
        A new way to play the consecrated game of chess. A decentralized
        platform for everyone who wants to earn money playing the most beloved
        game in the history of mankind. Scholarships, tournaments, chip system,
        ratings, integrated rapido or blitz chess mode and much more in the
        future.A new way to play the consecrated game of chess. A decentralized
        platform for everyone who wants to earn money playing the most beloved
        game in the history of mankind. Scholarships, tournaments, chip system,
        ratings, integrated rapido or blitz chess mode and much more in the
        future.more in the future. aca
      </p>

      {/* Contenedor negro de botones */}
      <div
        className="
          absolute 
          w-[300px]
          h-[275px] 
          left-1/2 -translate-x-1/2 top-[63%] 
          flex flex-col 
          items-center 
          gap-2
          "
      >
        {/* Botones principales verticales */}

        <Button customClasses="font-bold text-[34px] h-[40px]" text="LOGIN" route={"/login"} />
        <Button customClasses="font-bold text-[30px] h-[40px]" text="REGISTER" route={"/register"} />

        {/* Botones secundarios en fila */}
        <div className="flex justify-between mt-0 gap-2">
          <Button
            customClasses="w-[94.8px] h-[25px]
              font-bold text-[9px] 
              leading-[3px] 
              text-primary 
              bg-primary 
              flex items-center justify-center 
              text-center hover:opacity-90
              transition-opacity duration-200"
            text="TÉRMINOS Y CONDIC"
            route={"/tems"}
          />
          <Button
            customClasses="w-[94.8px] h-[25px]
              font-bold text-[9px] 
              leading-[3px] 
              text-primary
              bg-primary 
              flex items-center justify-center 
              text-center hover:opacity-90
              transition-opacity duration-200"
            text="MANUAL DE USUARIO"
            route={"/user_manual"}
          />
          <Button
            customClasses="w-[94.8px] h-[25px]
              font-bold text-[15px] 
              leading-[3px]
              bg-primary   
              text-primary 
              flex items-center justify-center 
              text-center hover:opacity-90
              transition-opacity duration-200"
            text="F.A.Qs"
            route={"/faqs"}
          />
        </div>

        {/* Triángulo negro */}
        <div className="w-0 h-0 border-l-[150px] border-r-[150px] border-t-[150px] border-t-[#101010] border-transparent" />
      </div>
    </div>
  );
}