/** Simplified map: in the real app this screen shows an interactive GoogleMap. */
function MapSketch() {
  return (
    <svg className="phone__map" viewBox="0 0 220 140" role="img" aria-label="Mapa de ejemplo">
      <rect width="220" height="140" fill="#e8ecef" />
      <path
        d="M0 50h220M0 105h220M60 0v140M150 0v140M0 140L120 0"
        stroke="#fff"
        strokeWidth="9"
        fill="none"
      />
      <rect x="160" y="112" width="50" height="22" fill="#cfe3c8" />
      <path
        d="M104 44c-8 0-14 6-14 14 0 10 14 24 14 24s14-14 14-24c0-8-6-14-14-14z"
        fill="#d93025"
      />
      <circle cx="104" cy="58" r="5" fill="#fff" />
    </svg>
  );
}

export default function LocationScreen() {
  return (
    <>
      <h4>Dónde estamos</h4>
      <div className="phone__card">
        <strong>Dirección</strong>
        <br />
        Calle Ejemplo 12, Cádiz
      </div>
      <div className="phone__card">
        <strong>Cómo llegar</strong>
        <ul>
          <li>Bus línea 1 y 7</li>
          <li>Estación de tren a 10 min</li>
          <li>Parking cercano</li>
        </ul>
      </div>
      <MapSketch />
      <p className="phone__muted phone__note">En la app, este mapa es un GoogleMap interactivo.</p>
    </>
  );
}
