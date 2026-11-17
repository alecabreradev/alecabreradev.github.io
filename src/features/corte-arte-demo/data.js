/*
 * Content of the Corte & Arte demo. The real app is in Spanish,
 * so the demo keeps its texts in Spanish in both languages.
 */

export const ROOMS = [
  {
    name: "Sala de Corte",
    scene: "corte",
    description: "Cortes personalizados para hombre, mujer y niños.",
    short: "Corte",
    services: [
      { name: "Corte y peinado", minutes: 45, price: 18 },
      { name: "Arreglo de barba", minutes: 20, price: 9 },
      { name: "Corte infantil", minutes: 30, price: 12 },
    ],
  },
  {
    name: "Sala de Color",
    scene: "color",
    description: "Coloración profesional y técnicas avanzadas.",
    short: "Color",
    services: [
      { name: "Balayage", minutes: 120, price: 65 },
      { name: "Mechas", minutes: 90, price: 45 },
      { name: "Tinte raíz", minutes: 60, price: 30 },
    ],
  },
  {
    name: "Sala de Estética",
    scene: "estetica",
    description: "Tratamientos capilares especializados.",
    short: "Estética",
    services: [
      { name: "Keratina", minutes: 90, price: 55 },
      { name: "Hidratación", minutes: 40, price: 22 },
      { name: "Masaje capilar", minutes: 25, price: 15 },
    ],
  },
  {
    name: "Sala VIP",
    scene: "vip",
    description: "Estilismo para eventos y asesoría de imagen.",
    short: "VIP",
    services: [
      { name: "Peinado evento", minutes: 60, price: 40 },
      { name: "Asesoría imagen", minutes: 45, price: 35 },
      { name: "Recogido novia", minutes: 90, price: 80 },
    ],
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
  { screen: "rooms", label: "Salas", icon: "rooms" },
  { screen: "booking", label: "Reserva", icon: "booking" },
  { screen: "admin", label: "Admin", icon: "admin" },
  { screen: "location", label: "Localización", icon: "location" },
];
