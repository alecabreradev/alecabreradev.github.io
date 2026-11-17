/*
 * Content of the Corte & Arte demo. The real app is in Spanish,
 * so the demo keeps its texts in Spanish in both languages.
 */

export const ROOMS = [
  {
    name: "Sala de Corte",
    description: "Cortes personalizados para hombre, mujer y niños.",
    services: ["Corte y peinado", "Arreglo de barba"],
  },
  {
    name: "Sala de Color",
    description: "Coloración profesional y técnicas avanzadas.",
    services: ["Balayage", "Mechas"],
  },
  {
    name: "Sala de Estética",
    description: "Tratamientos capilares especializados.",
    services: ["Keratina", "Hidratación"],
  },
  {
    name: "Sala VIP",
    description: "Estilismo para eventos y asesoría de imagen.",
    services: ["Peinado de evento", "Asesoría de imagen"],
  },
];

export const SAMPLE_BOOKINGS = [
  {
    id: 1,
    nickname: "Juan Pérez",
    room: "Sala de Corte",
    phone: "600123456",
    date: "2027-03-15",
    start: "09:00",
    end: "10:00",
    people: 1,
  },
  {
    id: 2,
    nickname: "Ana Gómez",
    room: "Sala de Color",
    phone: "611987654",
    date: "2027-03-16",
    start: "10:30",
    end: "12:00",
    people: 1,
  },
];

export const EMPTY_BOOKING = {
  room: "",
  nickname: "",
  phone: "",
  date: "",
  start: "10:00",
  end: "11:00",
  people: 1,
};

export const MENU_ITEMS = [
  { screen: "rooms", label: "Salas" },
  { screen: "booking", label: "Reserva" },
  { screen: "admin", label: "Admin" },
  { screen: "location", label: "Localización" },
];
