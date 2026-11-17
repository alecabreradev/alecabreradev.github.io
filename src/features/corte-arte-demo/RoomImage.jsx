/*
 * Small illustrated pictures for the rooms screen of the demo.
 * Drawn as inline SVG so the demo needs no image files and stays crisp.
 */

function Floor({ wall, floor }) {
  return (
    <>
      <rect width="240" height="96" fill={wall} />
      <rect y="70" width="240" height="26" fill={floor} />
      <path d="M0 70h240" stroke="#00000014" strokeWidth="2" />
    </>
  );
}

function Lamp({ x }) {
  return (
    <g>
      <path d={`M${x} 0v12`} stroke="#3a3a42" strokeWidth="1.5" />
      <circle cx={x} cy="16" r="5" fill="#f6d77a" />
      <circle cx={x} cy="16" r="10" fill="#f6d77a" opacity="0.25" />
    </g>
  );
}

function SalonChair({ x, color }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="-3" y="66" width="6" height="8" fill="#9b9ba3" />
      <ellipse cx="0" cy="76" rx="13" ry="3" fill="#7d7d86" />
      <rect x="-14" y="48" width="28" height="18" rx="6" fill={color} />
      <rect x="-12" y="30" width="24" height="22" rx="7" fill={color} />
    </g>
  );
}

function Mirror({ x }) {
  return (
    <g>
      <rect
        x={x - 15}
        y="14"
        width="30"
        height="42"
        rx="15"
        fill="#dfeaf2"
        stroke="#c9a85b"
        strokeWidth="2"
      />
      <path
        d={`M${x - 6} 24l10 -4M${x - 8} 32l14 -6`}
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  );
}

function CutRoom() {
  return (
    <>
      <Floor wall="#efe9e2" floor="#d8cfc4" />
      <Lamp x={60} />
      <Lamp x={180} />
      <Mirror x={60} />
      <Mirror x={120} />
      <Mirror x={180} />
      <SalonChair x={60} color="#2f2f37" />
      <SalonChair x={120} color="#2f2f37" />
      <SalonChair x={180} color="#2f2f37" />
    </>
  );
}

function ColorRoom() {
  const swatches = ["#7b3f2a", "#b5651d", "#d9a441", "#8e2c48", "#3d2b56", "#c46a8a"];
  return (
    <>
      <Floor wall="#f3e6ee" floor="#ddd0d8" />
      <rect x="18" y="16" width="96" height="36" rx="4" fill="#ffffff" stroke="#e1cbd6" />
      {swatches.map((color, index) => (
        <rect key={color} x={26 + index * 14} y="22" width="10" height="24" rx="2" fill={color} />
      ))}
      <rect x="132" y="50" width="52" height="20" rx="4" fill="#ffffff" stroke="#e1cbd6" />
      <rect x="140" y="38" width="10" height="14" rx="2" fill="#8e2c48" />
      <rect x="154" y="34" width="10" height="18" rx="2" fill="#d9a441" />
      <rect x="168" y="40" width="10" height="12" rx="2" fill="#3d2b56" />
      <path d="M200 66l18 -34" stroke="#2f2f37" strokeWidth="3" strokeLinecap="round" />
      <path d="M216 36l6 -10" stroke="#b5651d" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="120" cy="80" rx="60" ry="3" fill="#00000010" />
    </>
  );
}

function BeautyRoom() {
  return (
    <>
      <Floor wall="#e6f0ec" floor="#cfdcd6" />
      <circle cx="200" cy="26" r="12" fill="#f6d77a" opacity="0.35" />
      <circle cx="200" cy="26" r="6" fill="#f6d77a" />
      <rect x="40" y="52" width="100" height="10" rx="5" fill="#ffffff" stroke="#bfd2ca" />
      <rect x="44" y="44" width="30" height="10" rx="5" fill="#ffffff" stroke="#bfd2ca" />
      <rect x="54" y="62" width="4" height="12" fill="#9b9ba3" />
      <rect x="122" y="62" width="4" height="12" fill="#9b9ba3" />
      <rect x="160" y="54" width="44" height="16" rx="3" fill="#ffffff" stroke="#bfd2ca" />
      <rect x="166" y="40" width="8" height="14" rx="2" fill="#7fb7a3" />
      <rect x="178" y="44" width="8" height="10" rx="4" fill="#e7b7a5" />
      <rect x="190" y="38" width="8" height="16" rx="2" fill="#a8c7de" />
      <path
        d="M24 70c0-14 4-24 10-30M30 70c2-12 8-20 14-22"
        stroke="#6f9f86"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

function VipRoom() {
  return (
    <>
      <Floor wall="#2b2a33" floor="#3b3944" />
      <path d="M60 0l-30 70h60z" fill="#f6d77a" opacity="0.12" />
      <path d="M180 0l-30 70h60z" fill="#f6d77a" opacity="0.12" />
      <rect
        x="96"
        y="10"
        width="48"
        height="44"
        rx="22"
        fill="#4a4856"
        stroke="#c9a85b"
        strokeWidth="2"
      />
      <SalonChair x={120} color="#8e2c48" />
      <circle cx="44" cy="40" r="2" fill="#f6d77a" />
      <circle cx="200" cy="30" r="2" fill="#f6d77a" />
      <circle cx="210" cy="50" r="1.5" fill="#f6d77a" />
      <circle cx="30" cy="22" r="1.5" fill="#f6d77a" />
    </>
  );
}

const SCENES = {
  corte: CutRoom,
  color: ColorRoom,
  estetica: BeautyRoom,
  vip: VipRoom,
};

export default function RoomImage({ scene, label }) {
  const Scene = SCENES[scene] ?? CutRoom;
  return (
    <svg
      className="phone__card-image"
      viewBox="0 0 240 96"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
    >
      <Scene />
    </svg>
  );
}
