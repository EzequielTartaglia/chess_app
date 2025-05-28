"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer = ({
  showSpectIcon = true,
  showRankIcon = true,
  showMarketplaceIcon = true,
  showZettsIcon = true,
  showShopIcon = true,
  text = "",
}) => {
  const router = useRouter();

  const iconClass =
    "bg-[var(--background-button)] w-[100px] h-[100px] flex items-center justify-center";

  return (
    <footer className="bg-[var(--background-footer)] text-[var(--background-yellow)] px-4 sm:px-10 py-6 sm:py-8 flex flex-wrap justify-between items-center gap-4">
      {/* Izquierda */}
      <div className="flex gap-3">
        {showSpectIcon && (
          <button
            onClick={() => router.push("/spectate")}
            className={iconClass}
            title="Spectate"
          >
            <Image
              src="/spectate.svg"
              alt="Spect Icon"
              width={100}
              height={100}
            />
          </button>
        )}
        {showRankIcon && (
          <button
            onClick={() => router.push("/rankings")}
            className={iconClass}
            title="Rankings"
          >
            <Image
              src="/custom_tournament.svg"
              alt="Rank Icon"
              width={100}
              height={100}
            />
          </button>
        )}
      </div>

      {/* Derecha */}
      <div className="flex items-center gap-3 flex-wrap">
        {showMarketplaceIcon && (
          <button
            onClick={() => router.push("/marketplace")}
            className={iconClass}
            title="Marketplace"
          >
            <Image
              src="/marketplace.svg"
              alt="Marketplace Icon"
              width={100}
              height={100}
            />
          </button>
        )}
        {showZettsIcon && (
          <button onClick={() => router.push("/zetts")} className={iconClass} title="Zetts">
            <Image src="/zetts.svg" alt="Zetts Icon" width={100} height={100} />
          </button>
        )}
        {showShopIcon && (
          <button onClick={() => router.push("/shop")} className={iconClass} title="Shop">
            <Image src="/shop.svg" alt="Shop Icon" width={100} height={100} />
          </button>
        )}
      </div>
      {text && (
        <p className="text-[80px] sm:text-[110px] font-bold uppercase ml-2 sm:ml-4">
          {text}
        </p>
      )}
    </footer>
  );
};

export default Footer;
