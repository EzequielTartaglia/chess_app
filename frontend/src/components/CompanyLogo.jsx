export default function CompanyLogo({ text = "LOGO EMPRESA", className = "", classNameText = "" }) {
  return (
    <div
      className={`flex flex-row items-center gap-[11.35px] w-[226.89px] h-[40px] ${className}`}
    >
      <svg
        width="25.54"
        height="25.54"
        viewBox="0 0 25.54 25.54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect
          width="25.5375"
          height="25.5375"
          rx="7.09375"
          fill="currentColor"
        />
      </svg>

      <h2 className={`w-[190px] h-[40px] font-extrabold text-[22.7px] leading-[40px] tracking-[-0.02em] text-current font-montserrat ${classNameText}`}>
        {text}
      </h2>
    </div>
  );
}
