// Stemless recreation of the Figma "image 5" flower, built from separate
// petals so each one can unfurl on its own. Drawn in the same 736 × 736 box
// as the original raster so it drops into the same slot in the lockup.

export const FLOWER_CENTER = { x: 385, y: 340 };

type Petal = {
  angle: number; // degrees clockwise from straight up
  length: number;
  width: number;
  streak: number; // how far the dark heart reaches along the petal (0–1)
};

// Order is the unfurl order: around the flower, starting upper-left.
const PETALS: Petal[] = [
  { angle: -25, length: 280, width: 235, streak: 0.62 },
  { angle: 36, length: 255, width: 205, streak: 0.66 },
  { angle: 90, length: 225, width: 215, streak: 0.6 },
  { angle: 176, length: 290, width: 225, streak: 0.62 },
  { angle: 252, length: 305, width: 200, streak: 0.9 },
];

// A broad petal with a soft notch at the tip, base at (0, 0), pointing up.
function petalPath(length: number, width: number) {
  const L = length;
  const W = width;
  return [
    `M 0 0`,
    `C ${-W * 0.3} ${-L * 0.2}, ${-W * 0.62} ${-L * 0.62}, ${-W * 0.46} ${-L * 0.93}`,
    `C ${-W * 0.28} ${-L * 1.06}, ${-W * 0.06} ${-L * 0.96}, 0 ${-L * 0.88}`,
    `C ${W * 0.08} ${-L * 1.02}, ${W * 0.36} ${-L * 1.04}, ${W * 0.5} ${-L * 0.88}`,
    `C ${W * 0.64} ${-L * 0.6}, ${W * 0.28} ${-L * 0.2}, 0 0`,
    `Z`,
  ].join(" ");
}

function PetalLayer({
  layer,
  render,
}: {
  layer: string;
  render: (p: Petal) => React.ReactNode;
}) {
  return (
    <>
      {PETALS.map((p, i) => (
        <g
          key={i}
          transform={`translate(${FLOWER_CENTER.x} ${FLOWER_CENTER.y}) rotate(${p.angle})`}
        >
          {/* Separate wrappers so hover, idle breathing and the intro
              grow can each own a transform without fighting. */}
          <g data-petal-hover={i} transform="rotate(0) scale(1 1)">
            <g data-petal-idle={i} transform="rotate(0) scale(1 1)">
              <g data-petal={i} data-layer={layer}>
                {render(p)}
              </g>
            </g>
          </g>
        </g>
      ))}
    </>
  );
}

export default function BloomFlower({ className = "" }: { className?: string }) {
  const { x: cx, y: cy } = FLOWER_CENTER;

  return (
    <svg
      viewBox="0 0 736 736"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <filter id="bloom-soft-lg" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="bloom-soft-md" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
        <filter id="bloom-soft-heart" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <linearGradient id="bloom-streak" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#1f2c21" />
          <stop offset="0.55" stopColor="#2f4a2f" />
          <stop offset="1" stopColor="#5f8a4c" stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id="bloom-heart">
          <stop offset="0" stopColor="#1c261d" />
          <stop offset="0.7" stopColor="#253526" stopOpacity="0.9" />
          <stop offset="1" stopColor="#2f4a2f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bloom-center">
          <stop offset="0" stopColor="#e6d8c2" />
          <stop offset="0.6" stopColor="#c9b59f" />
          <stop offset="1" stopColor="#5d6a4c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g data-flower-hit>
        {/* Pale leaf-green halo that bleeds past the petal edges */}
        <g filter="url(#bloom-soft-lg)">
          <PetalLayer
            layer="halo"
            render={(p) => (
              <path
                d={petalPath(p.length, p.width)}
                fill="#c4dca6"
                stroke="#d3e6b4"
                strokeWidth={18}
                strokeLinejoin="round"
              />
            )}
          />
        </g>

        {/* Sage petal bodies */}
        <g filter="url(#bloom-soft-md)">
          <PetalLayer
            layer="body"
            render={(p) => (
              <path d={petalPath(p.length * 0.95, p.width * 0.92)} fill="#9cc58e" />
            )}
          />
        </g>

        {/* Dark heart that runs out along each petal */}
        <g filter="url(#bloom-soft-heart)">
          <PetalLayer
            layer="streak"
            render={(p) => (
              <path
                d={petalPath(p.length * p.streak, p.width * 0.55)}
                fill="url(#bloom-streak)"
              />
            )}
          />
          <g
            data-heart-hover
            transform={`translate(${cx} ${cy}) scale(1) translate(${-cx} ${-cy})`}
          >
            <circle data-heart cx={cx} cy={cy} r={92} fill="url(#bloom-heart)" />
          </g>
        </g>

        {/* Cream center */}
        <g data-bud>
          <circle
            cx={cx + 8}
            cy={cy}
            r={46}
            fill="url(#bloom-center)"
            filter="url(#bloom-soft-md)"
          />
        </g>
      </g>
    </svg>
  );
}
