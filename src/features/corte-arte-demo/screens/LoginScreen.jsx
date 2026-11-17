export default function LoginScreen({ dispatch }) {
  return (
    <div className="phone__centered">
      <div className="phone__logo">C&amp;A</div>
      <h4>Iniciar sesión</h4>
      <input defaultValue="cliente@corteyarte.es" aria-label="Correo electrónico" />
      <input type="password" defaultValue="demo1234" aria-label="Contraseña" />
      <button type="button" className="phone__button" onClick={() => dispatch({ type: "login" })}>
        Acceder
      </button>
      <button
        type="button"
        className="phone__link"
        onClick={() => dispatch({ type: "resetPassword" })}
      >
        ¿Olvidaste tu contraseña?
      </button>
    </div>
  );
}
