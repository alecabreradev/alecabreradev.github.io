import { useState } from "react";
import { ROOMS } from "../data.js";
import RoomImage from "../RoomImage.jsx";

/** Rooms screen: pick a room, see its services and book it in one tap. */
export default function RoomsScreen({ dispatch }) {
  const [selectedName, setSelectedName] = useState(ROOMS[0].name);
  const room = ROOMS.find((r) => r.name === selectedName);

  return (
    <>
      <h4 className="phone__heading">Nuestras salas</h4>
      <p className="phone__muted phone__lead">Elige una sala y reserva en un toque.</p>

      <div className="phone__chips" role="tablist" aria-label="Salas">
        {ROOMS.map((r) => (
          <button
            key={r.name}
            type="button"
            role="tab"
            aria-selected={r.name === selectedName}
            onClick={() => setSelectedName(r.name)}
          >
            {r.short}
          </button>
        ))}
      </div>

      <article className="phone__room" key={room.name} role="tabpanel">
        <RoomImage scene={room.scene} label={`Ilustración de la ${room.name}`} />
        <div className="phone__room-body">
          <strong>{room.name}</strong>
          <p className="phone__muted">{room.description}</p>
          <ul className="phone__services">
            {room.services.map((service) => (
              <li key={service.name}>
                <span>{service.name}</span>
                <span className="phone__muted">{service.minutes} min</span>
                <span className="phone__price">{service.price} €</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="phone__button"
            onClick={() => dispatch({ type: "bookRoom", room: room.name })}
          >
            Reservar en esta sala
          </button>
        </div>
      </article>
    </>
  );
}
