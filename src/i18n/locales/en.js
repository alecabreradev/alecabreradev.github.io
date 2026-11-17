/** English texts. Keys must match es.js. */
const en = {
  meta: {
    title: "Alejandro Cabrera Mateo · Junior developer",
  },
  nav: {
    label: "Main navigation",
    about: "About",
    projects: "Projects",
    timeline: "Path",
    contact: "Contact",
    switchLanguage: "Cambiar a español",
    toggleTheme: "Toggle light or dark theme",
    theme: "Theme",
  },
  hero: {
    title: "Junior developer for web, mobile and data.",
    intro:
      "I’m Alejandro Cabrera, a junior developer with a background in Computer Engineering at the University of Cádiz. I’ve built mobile and web apps end to end, from the API and the database to the interface, and machine learning models with real data. You can try my projects here.",
  },
  network: {
    label: "Skill network",
    help: "How what I know connects to what I’ve built. Hover a node or tap a project.",
    columns: { areas: "areas", skills: "tools", projects: "projects" },
    areas: {
      web: { name: "Web & mobile", short: "Web" },
      data: { name: "Data", short: "Data" },
      ai: { name: "AI", short: "AI" },
      tools: { name: "Tools", short: "Tools" },
    },
    usedIn: "used in",
    noProject: "no project of mine here yet",
    builtWith: "built with",
  },
  about: {
    title: "About me",
    paragraphs: [
      "My background is in Computer Engineering (Information Systems) at the University of Cádiz. During my Erasmus+ at the University of Wrocław (Poland) I studied in an international environment and in another language, a challenge that taught me to adapt quickly and solve problems on my own.",
      "I like moving between development, data and AI. I care about understanding the problem before writing code and about delivering things that really work: correct results and code someone else can follow. I’m looking to join a team where I can contribute and keep growing.",
    ],
    facts: [
      { term: "Education", value: "Computer Engineering · University of Cádiz" },
      { term: "Erasmus+", value: "Computer Science · University of Wrocław, Poland · 2025–26" },
      { term: "Languages", value: "Native Spanish · professional English" },
      { term: "Based in", value: "Trebujena, Cádiz, Spain" },
    ],
  },
  projects: {
    title: "Projects you can try",
    tabsLabel: "Projects",
    corteArte: {
      name: "Corte & Arte",
      short: "C&A",
      title: "Corte & Arte: booking app for a hair salon",
      paragraphs: [
        "My first complete project. A Kotlin Android app with Jetpack Compose to browse rooms, book appointments and manage bookings, connected through Retrofit to my own Node.js and Express REST API.",
        "The app includes Firebase Auth login, full booking CRUD through a ViewModel, PDF export, a Google Maps screen and a navigation drawer. The website is built with React and uses the same REST API with MongoDB, so the app and the website share the bookings.",
      ],
      repoLink: "See the code on GitHub",
      demoHint:
        "Interactive recreation. Log in, open the menu, create, edit or delete a booking and watch the API calls on the side.",
      demoLabel: "Corte & Arte app demo",
    },
    no2: {
      name: "NO₂ forecast",
      short: "NO₂",
      title: "Predicting high-NO₂ days in Madrid",
      paragraphs: [
        "Using Madrid City Council’s open air-quality data and Open-Meteo weather, I predict whether tomorrow’s mean NO₂ at the Escuelas Aguirre station will exceed 40 µg/m³. I compare Logistic Regression, Random Forest and XGBoost with time-based validation and against the rule “tomorrow will be like today”.",
      ],
      prAucCaption: "PR-AUC on the test period (January–October 2026)",
      persistence: "Tomorrow like today",
      drivers:
        "The strongest signals are tomorrow’s temperature, today’s NO₂, solar radiation and wind: cold, cloudy, still days trap pollution.",
      repoLink: "See the code and notebook on GitHub",
      chartLabel: "Daily probability of a high-NO₂ day in the 2026 test period",
      legendProbability: "Model probability",
      legendHighDay: "Day above 40 µg/m³",
      threshold: "Threshold",
      summary:
        "At this threshold the model raises {alerts} alerts and catches {caught} of {highDays} high days.",
      metrics: { accuracy: "Accuracy", precision: "Precision", recall: "Recall", f1: "F1" },
      hint: "Real test data. Move the threshold: lower it and you raise more alerts; raise it and high days slip through.",
      months: "JFMAMJJASOND",
    },
    skills: {
      title: "Technologies",
      intro:
        "Filter by area or by where I used it, and pick a technology to see what I did with it.",
      filterLabel: "Filter by area",
      contextsLabel: "Where I used it:",
      categories: {
        all: "All",
        lang: "Languages",
        web: "Web and mobile",
        ai: "AI and data",
        db: "Databases and tools",
      },
      contexts: {
        corteArte: "Corte & Arte",
        no2: "NO₂ forecast",
        portfolio: "This portfolio",
        degree: "Degree",
      },
      openProject: "Open",
      noProject:
        "I used it during my degree. It doesn’t have its own project in this portfolio yet.",
      notes: {
        python: "The whole NO₂ project: downloading open data, cleaning, features and models.",
        kotlin: "The Corte & Arte Android app: screens, navigation and API calls.",
        javascript: "The Corte & Arte API and website, and this portfolio.",
        compose:
          "The screens of the Corte & Arte Android app (login, rooms, bookings, admin and map), using Retrofit to talk to the API.",
        react: "The Corte & Arte website and this portfolio, split into components and tested.",
        node: "The API shared by the Corte & Arte app and website: CRUD routes for /api/reservas with validation and CORS.",
        rest: "A single REST API for both the Android app and the Corte & Arte website.",
        htmlcss:
          "The Corte & Arte website and this portfolio, with hand-written CSS, light and dark themes and a responsive layout.",
        sklearn:
          "Logistic regression (the best model, PR-AUC 0.83) and random forest, with time-based validation and threshold tuning.",
        xgboost: "One of the models compared in the NO₂ forecast (PR-AUC 0.78).",
        pandas:
          "Joining the station’s daily readings with the weather and building previous-day features.",
        mongodb: "The Corte & Arte bookings database, with Mongoose and MongoDB Atlas.",
        firebase: "Sign-in and password recovery in the Corte & Arte app.",
        git: "Version control for all my projects, published on GitHub.",
      },
    },
  },
  timeline: {
    title: "Path so far",
    items: [
      {
        date: "2025 – 2026",
        title: "Erasmus+ · Computer Science · University of Wrocław",
        text: "Courses in English on data engineering, software architectures and computing paradigms.",
      },
      {
        date: "2022 – now",
        title: "Computer Engineering · University of Cádiz",
        text: "Information Systems: AI, machine learning, data, algorithms and databases.",
      },
    ],
  },
  contact: {
    title: "Let’s talk",
    text: "If you’re looking for someone to join your team or want to talk software, write to me here.",
    copy: "Copy email",
    copied: "Email copied",
  },
  footer: {
    backToTop: "Back to top",
    builtWith: "Built with React and Vite",
    label: "Footer links",
    source: "Source code",
  },
};

export default en;
