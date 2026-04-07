export function LineosLogo({ collapsed = false, className = "" }: { collapsed?: boolean; className?: string }) {
  if (collapsed) {
    return (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="32" height="32">
        {/* DNA Helix — compact mark */}
        <path d="M20 4C14 10 14 16 20 20C26 24 26 30 20 36" stroke="hsl(210, 58%, 45%)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M20 4C26 10 26 16 20 20C14 24 14 30 20 36" stroke="hsl(43, 92%, 51%)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <line x1="13" y1="12" x2="27" y2="12" stroke="hsl(210, 58%, 45%)" strokeWidth="1.2" opacity="0.4" />
        <line x1="13" y1="20" x2="27" y2="20" stroke="hsl(210, 40%, 50%)" strokeWidth="1.2" opacity="0.4" />
        <line x1="13" y1="28" x2="27" y2="28" stroke="hsl(43, 92%, 51%)" strokeWidth="1.2" opacity="0.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} height="28">
      {/* DNA Helix */}
      <path d="M18 2C12 8 12 14 18 20C24 26 24 32 18 38" stroke="hsl(210, 58%, 40%)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M18 2C24 8 24 14 18 20C12 26 12 32 18 38" stroke="hsl(43, 92%, 51%)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <line x1="12" y1="10" x2="24" y2="10" stroke="hsl(210, 45%, 50%)" strokeWidth="1" opacity="0.35" />
      <line x1="11" y1="20" x2="25" y2="20" stroke="hsl(210, 35%, 55%)" strokeWidth="1" opacity="0.35" />
      <line x1="12" y1="30" x2="24" y2="30" stroke="hsl(43, 80%, 55%)" strokeWidth="1" opacity="0.35" />
      {/* LINEOS text */}
      <text x="40" y="26" fontFamily="Montserrat, system-ui, sans-serif" fontSize="17" fontWeight="600" letterSpacing="3" fill="hsl(210, 58%, 25%)">
        LINEOS
      </text>
    </svg>
  );
}
