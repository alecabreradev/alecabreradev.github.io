import { useState } from "react";

function BookingCard({ booking, onEdit, onDelete }) {
  return (
    <div className="phone__card">
      <strong>Reserva #{booking.id}</strong>
      <br />
      {booking.nickname} · {booking.room}
      <br />
      {booking.date} · {booking.start}–{booking.end} · {booking.people} pers.
      <br />
      Tel. {booking.phone}
      {onEdit && (
        <div className="phone__card-actions">
          <button
            type="button"
            onClick={() => onEdit(booking.id)}
            aria-label={`Editar reserva ${booking.id}`}
          >
            ✎
          </button>
          <button
            type="button"
            onClick={() => onDelete(booking.id)}
            aria-label={`Eliminar reserva ${booking.id}`}
          >
            🗑
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminScreen({ state, dispatch }) {
  const [query, setQuery] = useState("");
  const { adminTab, bookings, searchResult } = state;
  const edit = (id) => dispatch({ type: "startEdit", id });
  const remove = (id) => dispatch({ type: "deleteBooking", id });

  return (
    <>
      <div className="phone__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={adminTab === "list"}
          onClick={() => dispatch({ type: "setAdminTab", tab: "list" })}
        >
          Listar
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={adminTab === "search"}
          onClick={() => dispatch({ type: "setAdminTab", tab: "search" })}
        >
          Buscar ID
        </button>
      </div>

      {adminTab === "list" &&
        (bookings.length ? (
          bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} onEdit={edit} onDelete={remove} />
          ))
        ) : (
          <p className="phone__muted">No hay reservas. Crea una desde Reserva.</p>
        ))}

      {adminTab === "search" && (
        <>
          <label htmlFor="booking-search">ID de la reserva</label>
          <input
            id="booking-search"
            inputMode="numeric"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="phone__actions">
            <button
              type="button"
              className="phone__button phone__button--small"
              onClick={() => dispatch({ type: "search", query })}
            >
              Buscar
            </button>
          </div>
          {searchResult &&
            (searchResult.booking ? (
              <BookingCard booking={searchResult.booking} />
            ) : (
              <p className="phone__error">No existe ninguna reserva con ese ID.</p>
            ))}
        </>
      )}
    </>
  );
}
