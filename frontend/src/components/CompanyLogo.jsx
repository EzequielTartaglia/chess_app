export default function CompanyLogo({ text = "LOGO EMPRESA", className = "" }) {
  return (
    <div className={`flex items-center gap-1 mb-1 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y="7.23125"
          width="25.5375"
          height="25.5375"
          rx="7.09375"
          fill="#F5E2A0"
        />
      </svg>

      <h2 className="text-[2rem]">{text}</h2>
    </div>
  );
}
