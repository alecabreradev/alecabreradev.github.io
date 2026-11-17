/** Spanish texts. Keys must match en.js. */
const es = {
  meta: {
    title: "Alejandro Cabrera Mateo · Desarrollador junior",
  },
  nav: {
    label: "Navegación principal",
    about: "Sobre mí",
    projects: "Proyectos",
    timeline: "Trayectoria",
    contact: "Contacto",
    switchLanguage: "Switch to English",
    toggleTheme: "Cambiar tema claro u oscuro",
    theme: "Tema",
  },
  hero: {
    title: "Desarrollador junior de web, móvil y datos.",
    intro:
      "Soy Alejandro Cabrera, desarrollador junior con formación en Ingeniería Informática en la Universidad de Cádiz. He construido aplicaciones móviles y web de principio a fin, desde la API y la base de datos hasta la interfaz, y modelos de machine learning con datos reales. Aquí puedes probar mis proyectos.",
  },
  network: {
    label: "Red de habilidades",
    help: "Así se conecta lo que sé con lo que he construido. Pasa por un nodo o pulsa un proyecto.",
    columns: { areas: "áreas", skills: "herramientas", projects: "proyectos" },
    areas: {
      web: { name: "Web y móvil", short: "Web" },
      data: { name: "Datos", short: "Datos" },
      ai: { name: "IA", short: "IA" },
      tools: { name: "Herramientas", short: "Herr." },
    },
    usedIn: "se usa en",
    noProject: "todavía sin proyecto propio aquí",
    builtWith: "construido con",
  },
  about: {
    title: "Sobre mí",
    paragraphs: [
      "Mi formación es en Ingeniería Informática (Sistemas de Información) en la Universidad de Cádiz. Durante mi Erasmus+ en la Universidad de Wrocław (Polonia) estudié en un entorno internacional y en otro idioma, un reto que me enseñó a adaptarme rápido y a resolver problemas por mi cuenta.",
      "Me gusta moverme entre el desarrollo, los datos y la IA. Me importa entender bien el problema antes de programar y que lo que entrego funcione de verdad: resultados correctos y código que otra persona pueda entender. Busco incorporarme a un equipo donde aportar y seguir creciendo.",
    ],
    facts: [
      { term: "Formación", value: "Ingeniería Informática · Universidad de Cádiz" },
      { term: "Erasmus+", value: "Computer Science · Universidad de Wrocław, Polonia · 2025–26" },
      { term: "Idiomas", value: "Español nativo · inglés profesional" },
      { term: "Base", value: "Trebujena, Cádiz" },
    ],
  },
  projects: {
    title: "Proyectos que puedes probar",
    tabsLabel: "Proyectos",
    corteArte: {
      name: "Corte & Arte",
      short: "C&A",
      title: "Corte & Arte: app de reservas para una peluquería",
      paragraphs: [
        "Mi primer proyecto completo. Una app Android en Kotlin con Jetpack Compose para consultar salas, reservar cita y gestionar las reservas, conectada con Retrofit a una API REST propia en Node.js y Express.",
        "La app incluye login con Firebase Auth, CRUD completo de reservas con ViewModel, generación de PDF, mapa con Google Maps y menú lateral. La web está hecha en React y usa la misma API REST con MongoDB, así que app y web comparten las reservas.",
      ],
      repoLink: "Ver el código en GitHub",
      demoHint:
        "Recreación interactiva. Entra, abre el menú, crea, edita o borra una reserva y mira las peticiones a la API a la derecha.",
      demoLabel: "Demo de la app Corte & Arte",
    },
    no2: {
      name: "Predicción NO₂",
      short: "NO₂",
      title: "Predicción de días con NO₂ alto en Madrid",
      paragraphs: [
        "Con los datos abiertos de calidad del aire del Ayuntamiento de Madrid y la meteorología de Open-Meteo, predigo si mañana la media de NO₂ en la estación de Escuelas Aguirre superará 40 µg/m³. Comparo Regresión Logística, Random Forest y XGBoost con validación temporal y frente a la regla «mañana será como hoy».",
      ],
      prAucCaption: "PR-AUC en el periodo de test (enero–octubre 2026)",
      persistence: "Mañana como hoy",
      drivers:
        "Lo que más pesa en la predicción es la temperatura de mañana, el NO₂ de hoy, la radiación y el viento: los días fríos, nublados y sin viento acumulan contaminación.",
      repoLink: "Ver el código y el notebook en GitHub",
      chartLabel: "Probabilidad diaria de NO₂ alto en el periodo de test de 2026",
      legendProbability: "Probabilidad que dio el modelo",
      legendHighDay: "Día que superó 40 µg/m³",
      threshold: "Umbral",
      summary:
        "Con este umbral el modelo avisa {alerts} días y acierta {caught} de {highDays} días altos.",
      metrics: { accuracy: "Exactitud", precision: "Precisión", recall: "Recall", f1: "F1" },
      hint: "Datos reales del test. Mueve el umbral: si lo bajas, avisas de más días; si lo subes, se escapan días altos.",
      months: "EFMAMJJASOND",
    },
    skills: {
      title: "Tecnologías",
      intro:
        "Filtra por área o por dónde la he usado, y pulsa una tecnología para ver qué he hecho con ella.",
      filterLabel: "Filtrar por área",
      contextsLabel: "Dónde la he usado:",
      categories: {
        all: "Todas",
        lang: "Lenguajes",
        web: "Web y móvil",
        ai: "IA y datos",
        db: "Bases de datos y herramientas",
      },
      contexts: {
        corteArte: "Corte & Arte",
        no2: "Predicción NO₂",
        portfolio: "Este portfolio",
        degree: "Carrera",
      },
      openProject: "Ver",
      noProject:
        "La he usado durante la carrera. Todavía no tiene un proyecto propio en este portfolio.",
      notes: {
        python:
          "Todo el proyecto de NO₂: descarga de datos abiertos, limpieza, variables y modelos.",
        kotlin: "La app Android de Corte & Arte: pantallas, navegación y llamadas a la API.",
        javascript: "La API y la web de Corte & Arte, y este portfolio.",
        compose:
          "Las pantallas de la app Android de Corte & Arte (login, salas, reservas, administración y mapa), con Retrofit para hablar con la API.",
        react: "La web de Corte & Arte y este portfolio, organizado en componentes y con tests.",
        node: "La API que comparten la app y la web de Corte & Arte: rutas CRUD de /api/reservas con validación y CORS.",
        rest: "Una sola API REST para la app Android y la web de Corte & Arte.",
        htmlcss:
          "La web de Corte & Arte y este portfolio, con CSS propio, tema claro y oscuro y diseño adaptable.",
        sklearn:
          "Regresión logística (el mejor modelo, PR-AUC 0,83) y random forest, con validación temporal y ajuste del umbral.",
        xgboost: "Uno de los modelos comparados en la predicción de NO₂ (PR-AUC 0,78).",
        pandas:
          "Unir las mediciones diarias de la estación con la meteorología y crear variables de días anteriores.",
        mongodb: "La base de datos de reservas de Corte & Arte, con Mongoose y MongoDB Atlas.",
        firebase: "Inicio de sesión y recuperación de contraseña en la app de Corte & Arte.",
        git: "Control de versiones de todos mis proyectos, publicados en GitHub.",
      },
    },
  },
  timeline: {
    title: "Trayectoria",
    items: [
      {
        date: "2025 – 2026",
        title: "Erasmus+ · Computer Science · Universidad de Wrocław",
        text: "Asignaturas en inglés de ingeniería de datos, arquitecturas de software y paradigmas de computación.",
      },
      {
        date: "2022 – hoy",
        title: "Ingeniería Informática · Universidad de Cádiz",
        text: "Sistemas de Información: IA, machine learning, datos, algoritmos y bases de datos.",
      },
    ],
  },
  contact: {
    title: "Hablemos",
    text: "Si buscas a alguien para tu equipo o quieres hablar de software, escríbeme a este correo.",
    copy: "Copiar email",
    copied: "Email copiado",
  },
  footer: {
    backToTop: "Volver arriba",
    builtWith: "Hecho con React y Vite",
    label: "Enlaces del pie de página",
    source: "Código fuente",
  },
};

export default es;
