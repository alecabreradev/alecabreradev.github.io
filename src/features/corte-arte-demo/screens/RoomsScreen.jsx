import { ROOMS } from "../data.js";

export default function RoomsScreen({ dispatch }) {
  return (
    <>
      <h4>Nuestras salas</h4>
      {ROOMS.map((room) => (
        <div key={room.name} className="phone__card">
          <div className="phone__card-image" />
          <strong>{room.name}</strong>
          <p className="phone__muted">{room.description}</p>
          <ul>
            {room.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
      ))}
      <button
        type="button"
        className="phone__button"
        onClick={() => dispatch({ type: "exportPdf" })}
      >
        Descargar en PDF
      </button>
    </>
  );
}
