import { EMPTY_BOOKING, SAMPLE_BOOKINGS } from "./data.js";

const MAX_LOG_ENTRIES = 7;

export const initialState = {
  screen: "login", // login | home | rooms | booking | admin | location
  drawerOpen: false,
  adminTab: "list", // list | search
  bookings: SAMPLE_BOOKINGS,
  nextId: SAMPLE_BOOKINGS.length + 1,
  editingId: null,
  form: EMPTY_BOOKING,
  errors: {},
  searchResult: null, // { booking } after a search
  toast: "",
  log: [{ id: 0, method: "GET", path: "/api/reservas", status: 200 }],
  nextLogId: 1,
};

/** Adds an entry to the API log shown next to the phone (newest first). */
function withLog(state, method, path, status) {
  const entry = { id: state.nextLogId, method, path, status };
  return {
    ...state,
    log: [entry, ...state.log].slice(0, MAX_LOG_ENTRIES),
    nextLogId: state.nextLogId + 1,
  };
}

/**
 * All state changes of the demo app. Each action that the real app would send
 * to the REST API also adds the matching request to the log.
 */
export function demoReducer(state, action) {
  switch (action.type) {
    case "login":
      return withLog({ ...state, screen: "home" }, "AUTH", "signIn()", "OK");

    case "resetPassword":
      return withLog(
        { ...state, toast: "Te hemos enviado un email para cambiar la contraseña" },
        "AUTH",
        "resetPassword()",
        "OK",
      );

    case "logout":
      return withLog({ ...state, screen: "login", drawerOpen: false }, "AUTH", "signOut()", "OK");

    case "openDrawer":
      return { ...state, drawerOpen: true };

    case "closeDrawer":
      return { ...state, drawerOpen: false };

    case "navigate": {
      let next = { ...state, screen: action.screen, drawerOpen: false, errors: {} };
      if (action.screen === "booking") next = { ...next, editingId: null, form: EMPTY_BOOKING };
      if (action.screen === "admin") next = withLog(next, "GET", "/api/reservas", 200);
      if (action.screen === "location") next = withLog(next, "MAPS", "cameraPositionState", "OK");
      return next;
    }

    case "bookRoom":
      return {
        ...state,
        screen: "booking",
        drawerOpen: false,
        editingId: null,
        form: { ...EMPTY_BOOKING, room: action.room },
        errors: {},
      };

    case "setAdminTab":
      return { ...state, adminTab: action.tab };

    case "updateForm":
      return { ...state, form: { ...state.form, [action.field]: action.value } };

    case "startEdit": {
      const booking = state.bookings.find((b) => b.id === action.id);
      return {
        ...state,
        screen: "booking",
        editingId: action.id,
        form: { ...booking },
        errors: {},
      };
    }

    case "cancelEdit":
      return { ...state, screen: "admin", editingId: null, errors: {} };

    case "showErrors":
      return { ...state, errors: action.errors };

    case "saveBooking": {
      const booking = {
        ...state.form,
        nickname: state.form.nickname.trim(),
        phone: state.form.phone.trim(),
        people: Number(state.form.people),
      };
      let next = {
        ...state,
        screen: "admin",
        adminTab: "list",
        editingId: null,
        form: EMPTY_BOOKING,
        errors: {},
      };

      if (state.editingId) {
        next.bookings = state.bookings.map((b) =>
          b.id === state.editingId ? { ...booking, id: state.editingId } : b,
        );
        next.toast = `Reserva #${state.editingId} actualizada`;
        next = withLog(next, "PUT", `/api/reservas/${state.editingId}`, 200);
      } else {
        next.bookings = [...state.bookings, { ...booking, id: state.nextId }];
        next.nextId = state.nextId + 1;
        next.toast = `Reserva #${state.nextId} creada`;
        next = withLog(next, "POST", "/api/reservas", 201);
      }
      return withLog(next, "GET", "/api/reservas", 200);
    }

    case "deleteBooking": {
      const next = {
        ...state,
        bookings: state.bookings.filter((b) => b.id !== action.id),
        searchResult: state.searchResult?.booking?.id === action.id ? null : state.searchResult,
        toast: `Reserva #${action.id} eliminada`,
      };
      return withLog(next, "DELETE", `/api/reservas/${action.id}`, 204);
    }

    case "search": {
      const query = action.query.trim();
      const booking = state.bookings.find((b) => String(b.id) === query);
      return withLog(
        { ...state, searchResult: { booking } },
        "GET",
        `/api/reservas/${query || "?"}`,
        booking ? 200 : 404,
      );
    }

    case "hideToast":
      return { ...state, toast: "" };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
