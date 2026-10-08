type Variant = 'divider' | 'compass';

export function CelestialOrnament({
  variant = 'divider',
  className = '',
  style,
}: {
  variant?: Variant;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (variant === 'compass') {
    return (
      <svg
        aria-hidden="true"
        className={className}
        style={style}
        viewBox="0 0 160 56"
        fill="none"
        focusable="false"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 28h30m88 0h30" strokeWidth=".8" opacity=".7" />
        <circle cx="80" cy="28" r="19" strokeWidth=".8" opacity=".75" />
        <path d="M80 2v52" strokeWidth=".8" opacity=".6" />
        <path d="M74 21c-6 2-9 7-8 12 1 6 6 10 12 10-5-2-8-6-8-11 0-4 2-8 4-11Z" strokeWidth="1.1" fill="currentColor" fillOpacity=".25" transform="translate(7 -1)" />
        <path d="m80 8 2 3-2 3-2-3 2-3Zm0 34 2 3-2 3-2-3 2-3Z" fill="currentColor" strokeWidth=".6" />
        <path d="M12 28h6m-3-3v6M142 28h6m-3-3v6" strokeWidth=".9" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      style={style}
      viewBox="0 0 260 16"
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <path d="M2 8h104m48 0h104" strokeWidth=".8" opacity=".75" />
      <path d="m130 1 2.4 5.6L138 8l-5.6 2.4L130 16l-2.4-5.6L122 8l5.6-2.4L130 1Z" fill="currentColor" strokeWidth=".6" />
      <path d="M112 8h4m28 0h4" strokeWidth="1.2" />
    </svg>
  );
}
