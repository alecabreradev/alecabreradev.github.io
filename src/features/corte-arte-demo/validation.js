const NAME_PATTERN = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/;
const PHONE_PATTERN = /^\d{9}$/;

/** Today as YYYY-MM-DD in local time. */
export function todayIso(now = new Date()) {
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/**
 * Same rules as the booking form of the Android app.
 * Returns an object with one message per invalid field (empty when valid).
 */
export function validateBooking(booking, today = todayIso()) {
  const errors = {};
  const nickname = booking.nickname.trim();
  const people = Number(booking.people);

  if (!booking.room) errors.room = "Elige una sala.";

  if (!nickname) errors.nickname = "El nombre es obligatorio.";
  else if (!NAME_PATTERN.test(nickname))
    errors.nickname = "El nombre solo puede contener letras y espacios.";

  if (!PHONE_PATTERN.test(booking.phone.trim())) errors.phone = "El teléfono debe tener 9 dígitos.";

  if (!booking.date) errors.date = "Elige una fecha.";
  else if (booking.date < today) errors.date = "La fecha no puede ser anterior a hoy.";

  if (!booking.start || !booking.end || booking.end <= booking.start)
    errors.end = "La hora de fin debe ser posterior a la de inicio.";

  if (!Number.isInteger(people) || people < 1 || people > 4)
    errors.people = "Entre 1 y 4 personas.";

  return errors;
}
