import { ROOMS } from "../data.js";
import { validateBooking } from "../validation.js";

function Field({ id, label, error, children }) {
  return (
    <div className="phone__field">
      <label htmlFor={`booking-${id}`}>{label}</label>
      {children}
      {error && <p className="phone__error">{error}</p>}
    </div>
  );
}

export default function BookingFormScreen({ state, dispatch }) {
  const { form, errors, editingId } = state;

  const fieldProps = (field) => ({
    id: `booking-${field}`,
    value: form[field],
    className: errors[field] ? "is-invalid" : undefined,
    onChange: (event) => dispatch({ type: "updateForm", field, value: event.target.value }),
  });

  const submit = (event) => {
    event.preventDefault();
    const found = validateBooking(form);
    if (Object.keys(found).length) dispatch({ type: "showErrors", errors: found });
    else dispatch({ type: "saveBooking" });
  };

  return (
    <>
      <h4>{editingId ? `Editar reserva #${editingId}` : "Crear una reserva"}</h4>
      <form onSubmit={submit} noValidate>
        <Field id="room" label="Sala" error={errors.room}>
          <select {...fieldProps("room")}>
            <option value="">Elige una sala</option>
            {ROOMS.map((room) => (
              <option key={room.name} value={room.name}>
                {room.name}
              </option>
            ))}
          </select>
        </Field>
        <Field id="nickname" label="Nickname" error={errors.nickname}>
          <input {...fieldProps("nickname")} />
        </Field>
        <Field id="phone" label="Teléfono" error={errors.phone}>
          <input inputMode="numeric" {...fieldProps("phone")} />
        </Field>
        <Field id="date" label="Fecha" error={errors.date}>
          <input type="date" {...fieldProps("date")} />
        </Field>
        <Field id="start" label="Hora inicio" error={errors.start}>
          <input type="time" {...fieldProps("start")} />
        </Field>
        <Field id="end" label="Hora fin" error={errors.end}>
          <input type="time" {...fieldProps("end")} />
        </Field>
        <Field id="people" label="Número de personas" error={errors.people}>
          <input type="number" min="1" max="4" {...fieldProps("people")} />
        </Field>
        <div className="phone__actions">
          <button type="submit" className="phone__button">
            {editingId ? "Guardar cambios" : "Reservar"}
          </button>
          {editingId && (
            <button
              type="button"
              className="phone__link"
              onClick={() => dispatch({ type: "cancelEdit" })}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </>
  );
}
