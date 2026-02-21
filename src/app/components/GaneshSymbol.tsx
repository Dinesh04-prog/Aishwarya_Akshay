export function GaneshSymbol() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="text-rose-700"
    >
      <g
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: 80,
          fill: "currentColor",
          opacity: 0.9,
        }}
      >
        <text x="51" y="75" textAnchor="end">
          A
        </text>
        <text x="49" y="75" textAnchor="start">
          A
        </text>
      </g>
      <text
        x="50"
        y="55"
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 40,
          fill: "currentColor",
        }}
        textAnchor="middle"
      >
        &
      </text>
    </svg>
  );
}