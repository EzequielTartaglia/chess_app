"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer = ({
  showSpectIcon = true,
  showRankIcon = true,
  showMarketplaceIcon = true,
  showZettsIcon = true,
  showShopIcon = true,
  hasUser = false,
  user = null,
  userZetts = 0,
  text = "",
}) => {
  const router = useRouter();

  const iconClass =
    "bg-[var(--background-button)] w-[100px] h-[100px] flex items-center justify-center";

  return (
    <footer className="bg-[var(--background-footer)] text-[var(--background-yellow)] px-4 sm:px-10 py-6 sm:py-8 flex flex-wrap justify-between items-center gap-4">
      {/* Izquierda */}
      <div className="flex items-end gap-3 flex-wrap">
        {showSpectIcon && (
          <div className="flex flex-col items-center min-h-[140px]">
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
            <span className="text-lg mt-2 invisible">.</span>
          </div>
        )}
        {showRankIcon && (
          <div className="flex flex-col items-center min-h-[140px]">
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
            <span className="text-lg mt-2 invisible">.</span>
          </div>
        )}
      </div>

      {/* Derecha */}
      <div className="flex items-end gap-3 flex-wrap">
        {showMarketplaceIcon && (
          <div className="flex flex-col items-center min-h-[140px]">
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
            <span className="text-lg mt-2 invisible">.</span>
          </div>
        )}

        {showZettsIcon && (
          <div className="flex flex-col items-center min-h-[140px]">
            <button
              onClick={() => router.push("/zetts")}
              className={iconClass}
              title="Zetts"
            >
              <Image
                src="/zetts.svg"
                alt="Zetts Icon"
                width={100}
                height={100}
              />
            </button>
            <span className="text-lg mt-2">
             {userZetts} <strong className="text-lg bold mt-2">Z</strong>
            </span>
          </div>
        )}

        {showShopIcon && (
          <div className="flex flex-col items-center min-h-[140px]">
            <button
              onClick={() => router.push("/shop")}
              className={iconClass}
              title="Shop"
            >
              <Image src="/shop.svg" alt="Shop Icon" width={100} height={100} />
            </button>
            <span className="text-lg mt-2 invisible">.</span>
          </div>
        )}
      </div>

      {text && (
        <div className="flex flex-col items-center min-h-[140px]">
          <p className="text-[80px] sm:text-[110px] font-bold uppercase ml-2 sm:ml-4">
            {text}
          </p>
          <span className="text-lg mt-2 invisible">.</span>
        </div>
      )}
    </footer>
  );
};

export default Footer;
