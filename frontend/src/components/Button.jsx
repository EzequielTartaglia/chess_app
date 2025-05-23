"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Button({
  route,
  text,
  customFunction,
  customClasses = "",
  target,
  title,
  icon,
  isAnimated = true,
  disabled,
  iconPosition = "right",
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === route;

  const handleClick = (e) => {
    if (customFunction && typeof customFunction === "function") {
      customFunction();
    }
  };

  const ActionButton = ({ children, onClick, className = "" }) => {
    return (
      <button
        className={`
        w-[300px] h-[52px]
        font-['Agency_FB'] font-bold text-[34px] 
        bg-[#101010] 
        text-[#F5E2A0]
        flex items-center justify-center
        text-center
        hover:opacity-90
        transition-opacity duration-200
        ${customClasses} 
      `}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  return route ? (
    <Link href={route} passHref target={target}>
      <ActionButton onClick={handleClick}>{text}</ActionButton>
    </Link>
  ) : (
    <ActionButton type="button" onClick={handleClick}>
      {text}
    </ActionButton>
  );
}
