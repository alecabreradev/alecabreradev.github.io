export default function HomeScreen({ dispatch }) {
  return (
    <div className="phone__centered">
      <div className="phone__logo">C&amp;A</div>
      <h4 className="phone__title">Corte &amp; Arte</h4>
      <p className="phone__subtitle">Reserva tu cita en segundos</p>
      <button
        type="button"
        className="phone__button"
        onClick={() => dispatch({ type: "navigate", screen: "rooms" })}
      >
        Entrar
      </button>
    </div>
  );
}
