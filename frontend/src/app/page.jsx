import Button from "@/components/Button";

export default function HomePage() {

  return (
    <div className="relative w-[1920px] h-[1080px] bg-[#101010] overflow-hidden">
      {/* Rombos decorativos */}
      <div className="absolute w-[621.82px] h-[622.53px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#F5E2A0] rotate-[135deg]" />
      <div className="absolute w-[194px] h-[194px] left-[860.18px] top-[15%] bg-[#101010] rounded-[38px] rotate-45" />

      {/* Título */}
      <div
        className="
          absolute 
          left-1/2 -translate-x-1/2 top-[37%] 
          w-[268px] h-[114px] 
          font-['Agency_FB'] font-bold 
          text-[61px] leading-[50px] 
          text-[#101010]
          flex items-center justify-center
          "
      >
        LOGO EMPRESA
      </div>

      {/* Descripción */}
      <p
        className="
          absolute 
          w-[266px] h-[120.85px] 
          left-1/2 -translate-x-1/2 top-[48%] 
          font-['Agency_FB'] font-bold 
          text-[10px] leading-[12px] 
          text-justify 
          text-[#101010]"
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
          left-1/2 -translate-x-1/2 top-[60%] 
          flex flex-col 
          items-center 
          gap-2
          "
      >
        {/* Botones principales verticales */}
        <Button text="LOGIN" route={"/login"} />
        <Button text="REGISTER" route={"/register"} />

        {/* Botones secundarios en fila */}
        <div className="flex justify-between mt-0 gap-2">
          <Button
            customClasses="w-[95px] h-[32px]
              font-['Agency_FB'] font-bold text-[9px] 
              leading-[3px] 
              text-[#F5E2A0] 
              bg-[#101010] 
              flex items-center justify-center 
              text-center hover:opacity-90
              transition-opacity duration-200"
            text="TÉRMINOS Y CONDIC"
            route={"/tems"}
          />
          <Button
            customClasses="w-[95px] h-[32px]
              font-['Agency_FB'] font-bold text-[9px] 
              leading-[3px] 
              text-[#F5E2A0] 
              bg-[#101010] 
              flex items-center justify-center 
              text-center hover:opacity-90
              transition-opacity duration-200"
            text="MANUAL DE USUARIO"
            route={"/user_manual"}
          />
          <Button
            customClasses="w-[90px] h-[30.69px] 
              font-['Agency_FB'] font-bold text-[19px] 
              leading-[3px]
              bg-[#101010]  
              text-[#F5E2A0] 
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
