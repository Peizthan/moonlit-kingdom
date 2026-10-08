export function CrescentMark({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`mk-crescent-mark ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      focusable="false"
    >
      <path
        d="M30 5c-3 1.6-5.7 4-7.6 7.2-4.3 7.500-1.800 17.200 5.700 21.800 3.800 2.300 8 2.900 12 1.900A19 19 0 0 1 8.200 28C6.800 17.700 13.800 7.700 24 5.300c2-.5 4.100-.5 6-.3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="39" cy="17" r="1.6" fill="currentColor" />
    </svg>
  );
}
