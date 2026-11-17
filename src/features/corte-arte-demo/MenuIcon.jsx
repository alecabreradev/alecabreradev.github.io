/* Small line icons for the side menu of the demo app */
const PATHS = {
  rooms: "M4 20V9l8-5 8 5v11h-5v-6H9v6z",
  booking: "M5 6h14v14H5zM5 10h14M9 3v5M15 3v5M9 14h2v2H9z",
  admin: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1-4 4-6 8-6s7 2 8 6",
  location: "M12 21s-6-6-6-11a6 6 0 0 1 12 0c0 5-6 11-6 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  logout: "M14 4h5v16h-5M10 8l-4 4 4 4M6 12h10",
};

export default function MenuIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d={PATHS[name]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
