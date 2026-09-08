/*
  Hand drawn feel monogram: the initials traced as a single looping stroke
  inside a circle, drawn on first paint.
*/
export default function Monogram({ className }: { className?: string }) {
  return (
    <svg
      className={`monogram${className ? ` ${className}` : ''}`}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.6" />
      {/* D */}
      <path
        className="monogram__stroke"
        d="M15 32V16c5.6-.6 10.4 1.4 10.4 8s-4.8 8.7-10.4 8Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* P, looping out of the D's bowl */}
      <path
        className="monogram__stroke"
        d="M25.6 33.5V17.4c5.4-1.1 8.6.6 8.6 4.3 0 3.9-3.6 5.2-7.4 4.6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="33" cy="32.4" r="1.5" fill="currentColor" />
    </svg>
  )
}
