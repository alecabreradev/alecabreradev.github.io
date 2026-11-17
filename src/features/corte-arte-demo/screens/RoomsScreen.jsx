import { ROOMS } from "../data.js";
import RoomImage from "../RoomImage.jsx";

export default function RoomsScreen({ dispatch }) {
  return (
    <>
      <h4>Nuestras salas</h4>
      {ROOMS.map((room) => (
        <div key={room.name} className="phone__card">
          <RoomImage scene={room.scene} label={`Ilustración de la ${room.name}`} />
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
