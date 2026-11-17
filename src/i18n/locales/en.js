/** English texts. Keys must match es.js. */
const en = {
  meta: {
    title: "Alejandro Cabrera Mateo · Software, data and AI",
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
    title: "I’ve built software that understands data.",
    intro:
      "I’m Alejandro, a final-year Computer Engineering student at the University of Cádiz. During my degree I’ve built several projects that taught me a lot, from mobile and web apps built end to end to machine learning models with real data, an area I’m now exploring further as the basis for my bachelor’s thesis.",
    availability:
      "Looking for a junior or internship role · university internship agreement possible",
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
      "I study Computer Engineering (Information Systems) at the University of Cádiz. In 2025–26 I studied Computer Science at the University of Wrocław (Uniwersytet Wrocławski) on Erasmus+, taking courses in English on data engineering, software architectures and computing paradigms.",
      "I like moving between development, data and AI, and I care that what I build really works: correct results, well-separated data and code someone else can follow. I’m looking for my first role, junior or internship, with the option of a university internship agreement.",
    ],
    facts: [
      { term: "Studies", value: "Computer Engineering · University of Cádiz" },
      { term: "Erasmus+", value: "Computer Science · University of Wrocław, Poland · 2025–26" },
      { term: "Languages", value: "Native Spanish · professional English" },
      { term: "Based in", value: "Andalusia, Spain" },
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
      groups: [
        { name: "Languages", items: "Python, Kotlin, Java, C/C++, JavaScript, TypeScript, SQL" },
        {
          name: "Web and mobile",
          items:
            "Android (Jetpack Compose, Retrofit), React, Node.js, Express.js, REST APIs, HTML, CSS",
        },
        { name: "AI and data", items: "Scikit-learn, XGBoost, TensorFlow, PyTorch, Pandas, NumPy" },
        {
          name: "Databases and tools",
          items:
            "PostgreSQL, MySQL, Oracle SQL, MongoDB, Firebase, Docker, Git, Linux, Postman, Jupyter, Figma",
        },
      ],
    },
  },
  timeline: {
    title: "Path so far",
    items: [
      {
        date: "Now",
        title: "Looking for a junior or internship role",
        text: "With the option of a university internship agreement.",
        upcoming: true,
      },
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
    text: "If you have a junior or internship opening, or want to talk software, write to me here.",
    copy: "Copy email",
    copied: "Email copied",
  },
  footer: {
    backToTop: "Back to top",
    source: "Source code",
  },
};

export default en;
