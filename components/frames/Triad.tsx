// An XYZ coordinate-frame triad, drawn the way RViz draws a TF frame:
// X red to the right, Y green receding up-right, Z blue straight up.
// The origin sits at the SVG's bottom-left corner so a triad can be pinned
// to the bottom-left corner of whatever it marks. A paper-colored halo under
// every stroke keeps the axes readable on photos and renders.

type TriadProps = {
  size?: number;
  /** Draw the axes in sequence on mount (skipped under reduced motion). */
  draw?: boolean;
  /** Show the x / y / z letters at the arrow tips. */
  labels?: boolean;
  strokeWidth?: number;
  className?: string;
};

const HALO = '#f7f7f5';

const AXES = [
  { key: 'ax', color: '#e5322d', label: 'x', tip: [0.86, 0.0] },
  { key: 'ay', color: '#2bb24c', label: 'y', tip: [0.5, 0.42] },
  { key: 'az', color: '#2f6bff', label: 'z', tip: [0.0, 0.86] },
] as const;

export default function Triad({ size = 96, draw = false, labels = false, strokeWidth = 2.5, className = '' }: TriadProps) {
  const pad = strokeWidth * 2;
  const s = size - pad * 2;
  const ox = pad;
  const oy = size - pad;
  const head = Math.max(5, strokeWidth * 2.6);
  const halo = strokeWidth + 3;

  const geometry = AXES.map((a) => {
    const tx = ox + a.tip[0] * s;
    const ty = oy - a.tip[1] * s;
    const ang = Math.atan2(ty - oy, tx - ox);
    const headPath = `M${tx},${ty} L${tx - head * Math.cos(ang - 0.42)},${ty - head * Math.sin(ang - 0.42)} L${
      tx - head * Math.cos(ang + 0.42)
    },${ty - head * Math.sin(ang + 0.42)} Z`;
    return { ...a, tx, ty, ang, headPath };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden
      className={`${draw ? 'triad-draw' : ''} ${className}`}
      overflow="visible"
    >
      {/* Halo layer first so no axis's halo covers another axis. */}
      {geometry.map((a) => (
        <g key={`halo-${a.key}`} stroke={HALO} fill={HALO}>
          <path
            className={`triad-axis ${a.key}`}
            pathLength={1}
            d={`M${ox},${oy} L${a.tx},${a.ty}`}
            strokeWidth={halo}
            strokeLinecap="square"
            fill="none"
          />
          <path className={`triad-head ${a.key}`} d={a.headPath} strokeWidth={3} strokeLinejoin="round" />
        </g>
      ))}
      {geometry.map((a) => (
        <g key={a.key} stroke={a.color} fill={a.color}>
          <path
            className={`triad-axis ${a.key}`}
            pathLength={1}
            d={`M${ox},${oy} L${a.tx},${a.ty}`}
            strokeWidth={strokeWidth}
            strokeLinecap="square"
            fill="none"
          />
          <path className={`triad-head ${a.key}`} d={a.headPath} stroke="none" />
          {labels && (
            <text
              className="triad-label"
              x={a.tx + Math.cos(a.ang) * (head + 5)}
              y={a.ty + Math.sin(a.ang) * (head + 5)}
              stroke={HALO}
              strokeWidth={3}
              paintOrder="stroke"
              fontSize={Math.max(10, size * 0.11)}
              fontFamily="var(--font-geist-mono), ui-monospace, monospace"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {a.label}
            </text>
          )}
        </g>
      ))}
      <circle cx={ox} cy={oy} r={strokeWidth * 1.4} fill="#111315" stroke={HALO} strokeWidth={2} />
    </svg>
  );
}
