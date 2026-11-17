/** Spanish texts. Keys must match en.js. */
const es = {
  meta: {
    title: "Alejandro Cabrera Mateo · Software, datos e IA",
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
    title: "He construido software que entiende datos.",
    intro:
      "Soy Alejandro, estudiante de último curso de Ingeniería Informática en la Universidad de Cádiz. Durante la carrera he construido varios proyectos de los que he aprendido mucho, desde aplicaciones móviles y web de principio a fin hasta modelos de machine learning con datos reales, un campo en el que estoy profundizando ahora para desarrollar mi Trabajo de Fin de Grado.",
    availability: "Busco puesto junior o de prácticas · posibilidad de convenio con la universidad",
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
      "Estudio Ingeniería Informática (Sistemas de Información) en la Universidad de Cádiz. El curso 2025–26 lo hice de Erasmus+ estudiando Computer Science en la Universidad de Wrocław (Uniwersytet Wrocławski), con asignaturas en inglés de ingeniería de datos, arquitecturas de software y paradigmas de computación.",
      "Me gusta moverme entre el desarrollo, los datos y la IA, y me importa que lo que hago funcione de verdad: resultados correctos, datos bien separados y código que otra persona pueda entender. Busco mi primer puesto, junior o en prácticas, con posibilidad de convenio con la universidad.",
    ],
    facts: [
      { term: "Estudios", value: "Ingeniería Informática · Universidad de Cádiz" },
      { term: "Erasmus+", value: "Computer Science · Universidad de Wrocław, Polonia · 2025–26" },
      { term: "Idiomas", value: "Español nativo · inglés profesional" },
      { term: "Base", value: "Andalucía, España" },
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
      groups: [
        { name: "Lenguajes", items: "Python, Kotlin, Java, C/C++, JavaScript, TypeScript, SQL" },
        {
          name: "Web y móvil",
          items:
            "Android (Jetpack Compose, Retrofit), React, Node.js, Express.js, REST APIs, HTML, CSS",
        },
        { name: "IA y datos", items: "Scikit-learn, XGBoost, TensorFlow, PyTorch, Pandas, NumPy" },
        {
          name: "Bases de datos y herramientas",
          items:
            "PostgreSQL, MySQL, Oracle SQL, MongoDB, Firebase, Docker, Git, Linux, Postman, Jupyter, Figma",
        },
      ],
    },
  },
  timeline: {
    title: "Trayectoria",
    items: [
      {
        date: "Ahora",
        title: "Buscando un puesto junior o de prácticas",
        text: "Con posibilidad de convenio de prácticas con la universidad.",
        upcoming: true,
      },
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
    text: "Si tienes una vacante junior o de prácticas, o quieres hablar de software, escríbeme a este correo.",
    copy: "Copiar email",
    copied: "Email copiado",
  },
  footer: {
    backToTop: "Volver arriba",
    source: "Código fuente",
  },
};

export default es;
