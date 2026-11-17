import { useEffect, useReducer } from "react";
import { MENU_ITEMS } from "./data.js";
import { demoReducer, initialState } from "./demoReducer.js";
import ApiLog from "./ApiLog.jsx";
import MenuIcon from "./MenuIcon.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import RoomsScreen from "./screens/RoomsScreen.jsx";
import BookingFormScreen from "./screens/BookingFormScreen.jsx";
import AdminScreen from "./screens/AdminScreen.jsx";
import LocationScreen from "./screens/LocationScreen.jsx";
import "./CorteArteDemo.css";

const TOAST_MS = 2400;

const SCREENS = {
  rooms: RoomsScreen,
  booking: BookingFormScreen,
  admin: AdminScreen,
  location: LocationScreen,
};

/**
 * Interactive recreation of the Corte & Arte Android app. It runs entirely in
 * the browser and shows, next to the phone, the API request behind each action.
 */
export default function CorteArteDemo({ label, hint }) {
  const [state, dispatch] = useReducer(demoReducer, initialState);
  const { screen, drawerOpen, toast } = state;

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => dispatch({ type: "hideToast" }), TOAST_MS);
    return () => clearTimeout(timer);
  }, [toast]);

  const ScreenContent = SCREENS[screen];

  return (
    <div className="corte-arte-demo">
      <div className="phone" role="group" aria-label={label}>
        <div className="phone__screen">
          {screen === "login" && <LoginScreen dispatch={dispatch} />}
          {screen === "home" && <HomeScreen dispatch={dispatch} />}

          {ScreenContent && (
            <>
              <div className="phone__app-bar">
                <button
                  type="button"
                  onClick={() => dispatch({ type: "openDrawer" })}
                  aria-label="Abrir menú"
                >
                  ☰
                </button>
                <span>Corte &amp; Arte</span>
              </div>
              <div className="phone__body">
                <ScreenContent state={state} dispatch={dispatch} />
              </div>
            </>
          )}

          {drawerOpen && (
            <div
              className="phone__drawer"
              onClick={(event) =>
                event.target === event.currentTarget && dispatch({ type: "closeDrawer" })
              }
            >
              <nav aria-label="Menú de la app">
                <div className="phone__drawer-header">
                  <span className="phone__drawer-logo">C&amp;A</span>
                  <span>
                    <strong>Corte &amp; Arte</strong>
                    <small>cliente@corteyarte.es</small>
                  </span>
                </div>
                {MENU_ITEMS.map((item) => (
                  <button
                    key={item.screen}
                    type="button"
                    aria-current={screen === item.screen ? "page" : undefined}
                    onClick={() => dispatch({ type: "navigate", screen: item.screen })}
                  >
                    <MenuIcon name={item.icon} />
                    {item.label}
                  </button>
                ))}
                <button
                  type="button"
                  className="phone__drawer-logout"
                  onClick={() => dispatch({ type: "logout" })}
                >
                  <MenuIcon name="logout" />
                  Cerrar sesión
                </button>
              </nav>
            </div>
          )}

          {toast && (
            <div className="phone__toast" role="status">
              {toast}
            </div>
          )}
        </div>
      </div>

      <ApiLog entries={state.log} />
      <p className="text-muted corte-arte-demo__hint">{hint}</p>
    </div>
  );
}
