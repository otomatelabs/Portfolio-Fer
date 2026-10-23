// Content for the home page. Every user-facing string is { es, en }; the page renders both and CSS shows one.
export type L = { es: string; en: string };
const l = (es: string, en: string): L => ({ es, en });

export const CATEGORIES = {
  compliance: l('Cumplimiento', 'Compliance'),
  automation: l('Automatización', 'Automation'),
  data: l('Datos y BI', 'Data & BI'),
  ai: l('IA', 'AI'),
  infra: l('Infraestructura y seguridad', 'Infrastructure & security'),
  custom: l('Software a medida', 'Custom software'),
} as const;
export type Category = keyof typeof CATEGORIES;

export const ICONS: Record<string, string> = {
  cloud: '<path d="M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9.5 4.5 4.5 0 0 1 17.5 18z"/>',
  spark: '<path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z"/>',
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  check: '<path d="M9 12l2 2 4-4"/><rect x="3" y="3" width="18" height="18" rx="3"/>',
};

// Cards that have no page of their own (the rest of the grid comes from the content collection).
export const EXTRA_CASES = [
  {
    "slug": "siem",
    "category": "infra",
    "tags": [
      "Serverless",
      "SIEM",
      "Huawei Cloud"
    ],
    "icon": "cloud",
    "title": {
      "es": "Integración Serverless SIEM vía OBS Logs",
      "en": "Serverless SIEM Integration via OBS Logs"
    },
    "desc": {
      "es": "Arquitectura orientada a eventos con FunctionGraph de Huawei Cloud para ingestar logs de auditoría hacia SIEMs Splunk/Wazuh. El procesamiento batch redujo costos de ingesta manteniendo alertas en tiempo real sobre eventos de seguridad.",
      "en": "Event-driven architecture using Huawei Cloud FunctionGraph to ingest database audit logs into Splunk/Wazuh SIEMs. Batch processing cut ingestion costs while maintaining real-time alerting on security events."
    },
    "metric": {
      "es": "Alertas en tiempo real",
      "en": "Real-time alerting"
    },
    "tech": "FunctionGraph · OBS · Splunk"
  },
  {
    "slug": "osint",
    "category": "automation",
    "tags": [
      "n8n",
      "OSINT",
      "Automation"
    ],
    "icon": "spark",
    "title": {
      "es": "Orquestación Empresarial y OSINT",
      "en": "Enterprise Orchestration & OSINT"
    },
    "desc": {
      "es": "Flujo n8n automatizando gestión de inventario en Google Sheets   eliminando entrada manual de datos. Pipeline OSINT con Apify para extracción de leads y API de Perplexity para outreach hiper-personalizado a escala.",
      "en": "n8n workflow automating inventory management in Google Sheets   eliminating manual data entry. OSINT pipeline using Apify for lead extraction and Perplexity API for hyper-personalized outreach at scale."
    },
    "metric": {
      "es": "Captura manual eliminada",
      "en": "Manual entry eliminated"
    },
    "tech": "n8n · Apify · Perplexity API"
  },
  {
    "slug": "university",
    "href": "/projects/university/",
    "category": "custom",
    "tags": [
      "Web Dev",
      "Education"
    ],
    "icon": "doc",
    "title": {
      "es": "Sistema de Gestión de Cursos",
      "en": "Course Management System"
    },
    "desc": {
      "es": "Aplicación web full-stack que redujo el registro de cursos de horas a minutos y ahorró a los profesores más de 5 horas semanales en seguimiento de calificaciones y comunicación con estudiantes.",
      "en": "Full-stack web app that cut course registration from hours to minutes and saved professors 5+ hours per week on grade tracking and student communication."
    },
    "metric": {
      "es": "5+ h/semana por profesor",
      "en": "5+ h/week per professor"
    },
    "tech": "JavaScript · Node.js · SQL"
  }
] as const;

export const NAV = [
  { k: 'como', href: '#como', t: l('Cómo funciona', 'How it works') },
  { k: 'servicios', href: '#servicios', t: l('Servicios', 'Services') },
  { k: 'casos', href: '#casos', t: l('Casos', 'Work') },
  { k: 'laboratorio', href: '#laboratorio', t: l('Laboratorio', 'Lab') },
  { k: 'metodo', href: '#metodo', t: l('Método', 'Method') },
  { k: 'contacto', href: '#contacto', t: l('Contacto', 'Contact') },
] as const;

export const LINKS = {
  call: 'https://cal.com/ferpg/discovery',
  mail: 'mailto:businesscontact@otomatelabs.com',
  linkedin: 'https://www.linkedin.com/in/fernandopgonzalez',
  demo: 'https://demo-auditoria-valor-aduanero.otomatelabs.com',
};

export const HERO = {
  kicker: l('Automatización, IA y datos para operaciones', 'Automation, AI and data for operations'),
  pre: l('Conectamos', 'We connect'),
  words: [
    l('tu correo', 'your email'),
    l('tu ERP', 'your ERP'),
    l('tus hojas de cálculo', 'your spreadsheets'),
    l('WhatsApp', 'WhatsApp'),
    l('Slack', 'Slack'),
  ],
  post: l('y lo que sigue lo hace el sistema.', 'and the system does what comes next.'),
  lead: l(
    'Tus herramientas ya existen. Construimos lo que falta entre ellas: automatizaciones, asistentes de IA y tableros que hacen el trabajo repetitivo, con una persona decidiendo lo importante.',
    'Your tools already exist. We build what is missing between them: automations, AI assistants and dashboards that do the repetitive work, with a person deciding what matters.',
  ),
  cta1: l('Agendar llamada de 30 min →', 'Book a 30-min call →'),
  cta2: l('Ver casos reales', 'See real work'),
  trust: l('EXPERIENCIA PREVIA EN', 'PRIOR EXPERIENCE AT'),
  trustNote: l(
    'Nombres de empresas como referencia de experiencia profesional previa.',
    'Company names refer to prior professional experience.',
  ),
  panelTitle: l('Resultados medidos', 'Measured results'),
  panel: [
    { label: l('Reportes comerciales (ETL + BI)', 'Commercial reporting (ETL + BI)'), value: l('−80 % TIEMPO', '−80 % TIME') },
    { label: l('Asistente Text-to-SQL seguro', 'Secure Text-to-SQL assistant'), value: l('3 DÍAS A PROTOTIPO', '3 DAYS TO PROTOTYPE') },
    { label: l('Triage de mensajes con IA', 'AI message triage'), value: l('−70 % MANUAL', '−70 % MANUAL') },
    { label: l('CRM a medida para una ONG', 'Custom CRM for an NGO'), value: l('10–20 H/SEM', '10–20 H/WK') },
  ],
  panelCta: l('Ver cada caso', 'See each case'),
};

export const FLOW = {
  kicker: l('Cómo funciona', 'How it works'),
  title: l('De tus herramientas al', 'From your tools to the'),
  accent: l('resultado aprobado', 'approved result'),
  tools: [l('Correo', 'Email'), l('Hojas de cálculo', 'Spreadsheets'), l('SAP / ERP', 'SAP / ERP'), l('WhatsApp', 'WhatsApp'), l('Formularios', 'Forms')],
  wires: ['msg', 'xlsx', 'data', 'chat', 'form'],
  core: l('Reglas + IA', 'Rules + AI'),
  labels: { core: l('Núcleo', 'Core'), services: l('Servicios', 'Services'), human: l('Humano', 'Human'), results: l('Resultados', 'Results') },
  services: [l('Procesos e integraciones', 'Process & integration'), l('Agentes de IA', 'AI agents'), l('Datos y BI', 'Data & BI')],
  ok: l('con tu OK', 'your OK'),
  results: [
    [l('Reporte', 'Report'), l('Resumen semanal enviado', 'Weekly summary sent')],
    [l('Clasificación', 'Triage'), l('Mensaje: urgente', 'Message: urgent')],
    [l('Propuesta', 'Proposal'), l('PDF generado con precio', 'PDF generated with pricing')],
    [l('Aprobado', 'Approved'), l('Borrador listo para firma', 'Draft ready to sign')],
    [l('Alerta', 'Alert'), l('Tráfico inusual detectado', 'Unusual traffic detected')],
  ],
  how: [
    { t: l('Conectas lo que ya usas', 'You connect what you already use'), d: l('No cambias de herramientas ni de hábitos. El sistema lee de donde ya vive tu información.', 'No new tools, no new habits. The system reads from where your information already lives.') },
    { t: l('Decides qué requiere tu OK', 'You decide what needs your OK'), d: l('Lo rutinario corre solo. Lo delicado llega como borrador para que una persona lo apruebe.', 'The routine runs on its own. Anything sensitive arrives as a draft for a person to approve.') },
  ],
};

export const SERVICES = {
  kicker: l('Servicios', 'Services'),
  title: l('Automatización que escala tu operación,', 'Automation that scales your operations,'),
  accent: l('no tu plantilla', 'not your headcount'),
  lead: l('Cuatro líneas de trabajo. Elige una para ver qué incluye.', 'Four lines of work. Pick one to see what it includes.'),
  cta: l('Ver casos relacionados', 'See related work'),
  items: [
    {
      n: '01',
      title: l('Automatización para gestión de propiedades', 'Property management automation'),
      sub: l('Rentas y administradores residenciales', 'Vacation rentals and residential managers'),
      desc: l(
        'Automatización de punta a punta para rentas vacacionales y administradores residenciales: comunicación con huéspedes, mantenimiento y reportes a propietarios, sin depender de ti.',
        'End-to-end automation for vacation rentals and residential managers: guest communication, maintenance routing and owner reporting that runs without you.',
      ),
      list: [
        l('Triage de mensajes con IA (−70 % de trabajo manual)', 'AI guest message triage (70 % reduction in manual work)'),
        l('Cobro de renta y avisos de atraso automáticos', 'Automated rent collection & late notices'),
        l('Reportes a propietarios que se generan solos', 'Owner reports that generate themselves'),
        l('Ruteo de mantenimiento y coordinación con proveedores', 'Maintenance request routing & vendor coordination'),
      ],
      category: 'automation',
    },
    {
      n: '02',
      title: l('Procesos e integraciones', 'Process automation & integration'),
      sub: l('n8n, APIs, ETL', 'n8n, APIs, ETL'),
      desc: l(
        'Conecto los sistemas que ya usas y automatizo el trabajo repetitivo entre ellos. Se acabó copiar y pegar datos, los seguimientos manuales y el caos de hojas de cálculo.',
        'I connect the systems you already use and automate the repetitive work between them. No more copy-pasting data, manual follow-ups or spreadsheet chaos.',
      ),
      list: [
        l('Flujos de trabajo en n8n', 'n8n workflow automation'),
        l('Integración por API y middleware', 'API integration & middleware'),
        l('Pipelines ETL (SAP, Google, a medida)', 'ETL pipelines (SAP, Google, custom)'),
        l('Generación de documentos y flujos de aprobación', 'Document generation & approval flows'),
      ],
      category: 'automation',
    },
    {
      n: '03',
      title: l('IA y datos (BI)', 'AI & business intelligence'),
      sub: l('LLM, tableros, agentes', 'LLMs, dashboards, agents'),
      desc: l(
        'Sistemas con LLM que clasifican, responden y deciden, y tableros predictivos. IA que trabaja para ti, y no al revés.',
        'LLM-powered systems that classify, respond and decide, plus predictive dashboards. AI that works for you, not the other way around.',
      ),
      list: [
        l('Integración de LLM (OpenRouter, modelos locales)', 'LLM integration (OpenRouter, local models)'),
        l('Tableros predictivos y pronósticos', 'Predictive dashboards & forecasting'),
        l('Text-to-SQL con seguridad Zero Trust', 'Text-to-SQL with Zero Trust security'),
        l('Agentes de IA con humano en el ciclo', 'AI agents with human-in-the-loop'),
      ],
      category: 'ai',
    },
    {
      n: '04',
      title: l('Infraestructura y hosting', 'Infrastructure & hosting'),
      sub: l('Operación 24/7', '24/7 operation'),
      desc: l(
        'No solo construyo tu automatización: la alojo, la monitoreo y la mantengo. Tus sistemas corren 24/7 con respaldos, alertas y tiempos de respuesta acordados.',
        "I don't just build your automation, I host it, monitor it and maintain it. Your systems run 24/7 with backups, alerts and SLA-backed response times.",
      ),
      list: [
        l('Proxmox VE y despliegue en la nube', 'Proxmox VE & cloud deployment'),
        l('Monitoreo y alertas 24/7', '24/7 monitoring & alerting'),
        l('Respaldos y recuperación ante desastres', 'Automatic backups & disaster recovery'),
        l('Zero Trust (Cloudflare Tunnels)', 'Zero Trust security (Cloudflare Tunnels)'),
      ],
      category: 'infra',
    },
  ],
};

export const RESULTS = {
  kicker: l('Resultados', 'Results'),
  title: l('Prueba, no promesas', 'Proof, not promises'),
  items: [
    { big: '80 %', t: l('menos tiempo de reporte', 'less reporting time'), d: l('ETL contra SAP y tableros comerciales. Experiencia previa en Castrol (BP).', 'ETL against SAP and commercial dashboards. Prior experience at Castrol (BP).') },
    { big: '3 días', t: l('a un prototipo funcional', 'to a working prototype'), d: l('Asistente Text-to-SQL con Zero Trust y acceso de solo lectura. Experiencia previa en Huawei Cloud.', 'Text-to-SQL assistant with Zero Trust and read-only access. Prior experience at Huawei Cloud.') },
    { big: '35 %', t: l('menos costo en la nube', 'lower cloud cost'), d: l('Optimización de infraestructura y consumo.', 'Infrastructure and consumption optimization.') },
    { big: '70 %', t: l('menos triage manual', 'less manual triage'), d: l('Agente de IA para mensajes de rentas de corta estancia, con humano en el ciclo.', 'AI agent for short-term rental messages, with a human in the loop.') },
    { big: '10–20 h', t: l('por semana', 'per week'), d: l('Administración ahorrada con un CRM a medida para una ONG.', 'Admin time saved with a custom CRM for an NGO.') },
  ],
};

export const WORK = {
  kicker: l('Casos', 'Work'),
  title: l('Casos destacados', 'Featured work'),
  lead: l('Tres proyectos que resumen el trabajo. Cada uno abre su caso completo.', 'Three projects that sum up the work. Each one opens its full case study.'),
  allTitle: l('Todos los casos', 'All work'),
  allLead: l('Filtra por el tipo de problema.', 'Filter by the kind of problem.'),
  all: l('Todos', 'All'),
  cta: l('Ver caso →', 'View case →'),
  soon: l('Sin página de caso', 'No case page'),
};

export const LAB = {
  kicker: l('Laboratorio', 'Lab'),
  title: l('Problemas reales convertidos en', 'Real problems turned into'),
  accent: l('demos públicas', 'public demos'),
  lead: l(
    'Un proceso propio investiga problemas de operación, construye una demo con datos sintéticos y la documenta con fuentes. Una persona aprueba cada paso antes de publicarse.',
    'A process of my own researches operational problems, builds a demo with synthetic data and documents it with sources. A person approves every step before anything is published.',
  ),
  list: [
    l('Demo que puedes probar sin cuenta', 'A demo you can try without an account'),
    l('Fuentes verificadas; los tiempos supuestos se marcan como tales', 'Verified sources; assumed times are labelled as assumptions'),
    l('Qué no se automatiza y por qué', 'What is not automated, and why'),
  ],
  cta1: l('Probar la primera demo →', 'Try the first demo →'),
  cta2: l('Leer el caso', 'Read the case'),
  gatesTitle: l('Puertas de aprobación', 'Approval gates'),
  gates: [
    [l('1 · Problema validado', '1 · Problem validated'), 'ok'],
    [l('2 · Demo probada', '2 · Demo tested'), 'ok'],
    [l('3 · Caso y texto aprobados', '3 · Case and text approved'), 'ok'],
    [l('4 · Publicación', '4 · Publishing'), 'you'],
  ],
  you: l('TÚ DECIDES', 'YOU DECIDE'),
};

const T_: Record<string, L> = {
  "skills.data.title": {
    "es": "Datos e Inteligencia de Negocios",
    "en": "Data & Business Intelligence"
  },
  "skills.cloud.title": {
    "es": "Cloud y DevOps",
    "en": "Cloud & DevOps"
  },
  "skills.soft.title": {
    "es": "Entrega al Cliente",
    "en": "Client Delivery"
  },
  "skill.incident": {
    "es": "Gestión de Incidentes (ITIL/SLA)",
    "en": "Incident Management (ITIL/SLA)"
  },
  "process.heading": {
    "es": "Tu socio de automatización, no solo un proveedor",
    "en": "Your automation partner, not just a vendor"
  },
  "skill.consulting": {
    "es": "Consultoría Técnica",
    "en": "Technical Consulting"
  },
  "skills.ai.title": {
    "es": "IA e Integración de LLMs",
    "en": "AI & LLM Integration"
  },
  "process.sub": {
    "es": "No solo construyo y desaparezco. Soy tu socio a largo plazo en automatización, creciendo con tu negocio desde el primer workflow hasta operaciones a escala completa.",
    "en": "I don't just build and disappear. I'm your long-term partner in automation, growing with your business from first workflow to full-scale operations."
  },
  "skill.client": {
    "es": "Relaciones con Clientes",
    "en": "Client Relations"
  },
  "footer.tagline": {
    "es": "Automatización que escala.",
    "en": "Automation that scales."
  },
  "skill.training": {
    "es": "Capacitación de Usuarios",
    "en": "User Training"
  },
  "skill.documentation": {
    "es": "Documentación",
    "en": "Documentation"
  },
  "skill.us": {
    "es": "Ciudadano Estadounidense",
    "en": "US Citizen"
  },
  "skill.agile": {
    "es": "Ágil / Basado en Sprints",
    "en": "Agile / Sprint-Based"
  },
  "skill.bilingual": {
    "es": "Bilingüe (EN/ES Nativo)",
    "en": "Bilingual (EN/ES Native)"
  },
  "skills.auto.title": {
    "es": "Automatización y Orquestación",
    "en": "Automation & Orchestration"
  },
  "skills.infra.title": {
    "es": "Infraestructura y Seguridad",
    "en": "Infrastructure & Security"
  }
};
const L_ = (k: string): L => T_[k];
const chips = (es: string[], en: string[] = es): L[] => es.map((s, i) => l(s, en[i] ?? s));
export const CAPS = {
  kicker: l('Capacidades', 'Capabilities'),
  title: l('Construido para automatizar,', 'Built for automation,'),
  accent: l('probado en producción', 'proven in production'),
  groups: [
    { t: L_('skills.auto.title'), items: chips(['n8n (avanzado)', 'Diseño de flujos', 'Integración por API', 'Webhooks', 'ETL', 'Generación de documentos', 'Flujos de aprobación', 'Manejo de errores'], ['n8n (Advanced)', 'Workflow design', 'API integration', 'Webhooks', 'ETL pipelines', 'Document generation', 'Approval flows', 'Error handling']) },
    { t: L_('skills.ai.title'), items: chips(['OpenRouter', 'LLM locales (Ollama)', 'Prompt engineering', 'Agentes de IA', 'Human-in-the-loop', 'Text-to-SQL', 'Clasificación de mensajes', 'Optimización de costos'], ['OpenRouter', 'Local LLMs (Ollama)', 'Prompt engineering', 'AI agents', 'Human-in-the-loop', 'Text-to-SQL', 'Message classification', 'Cost optimization']) },
    { t: L_('skills.data.title'), items: chips(['Power BI', 'Power Query (M)', 'SQL (MySQL, PostgreSQL)', 'Python (pandas)', 'Integración SAP', 'Modelado de datos', 'Pronósticos', 'Diseño de tableros'], ['Power BI', 'Power Query (M)', 'SQL (MySQL, PostgreSQL)', 'Python (pandas)', 'SAP ERP integration', 'Data modeling', 'Forecasting', 'Dashboard design']) },
    { t: L_('skills.infra.title'), items: chips(['Proxmox VE', 'Docker / LXC', 'Cloudflare Tunnels', 'Zero Trust (ZTNA)', 'Nginx Proxy Manager', 'Administración Linux', 'Respaldo y recuperación', 'Monitoreo 24/7'], ['Proxmox VE', 'Docker / LXC', 'Cloudflare Tunnels', 'Zero Trust (ZTNA)', 'Nginx Proxy Manager', 'Linux administration', 'Backup & recovery', '24/7 monitoring']) },
    { t: L_('skills.cloud.title'), items: chips(['Google Cloud Platform', 'Huawei Cloud', 'Serverless (FunctionGraph)', 'REST APIs', 'Node.js / TypeScript', 'Python', 'Git / GitHub', 'CI/CD básico'], ['Google Cloud Platform', 'Huawei Cloud', 'Serverless (FunctionGraph)', 'REST APIs', 'Node.js / TypeScript', 'Python', 'Git / GitHub', 'CI/CD basics']) },
    { t: L_('skills.soft.title'), items: [L_('skill.bilingual'), L_('skill.us'), L_('skill.consulting'), L_('skill.incident'), L_('skill.training'), L_('skill.documentation'), L_('skill.client'), L_('skill.agile')] },
  ],
};

export const METHOD = {
  kicker: l('Método', 'Method'),
  title: L_('process.heading'),
  lead: L_('process.sub'),
  steps: [
  {
    "title": {
      "es": "Auditoría y Descubrimiento",
      "en": "Audit & Discovery"
    },
    "desc": {
      "es": "Me sumerjo en tus operaciones, mapeando cada proceso manual, cuello de botella y punto de dolor. Definimos juntos métricas de éxito claras para saber exactamente a qué apuntamos y poder medir el ROI desde el día uno.",
      "en": "I dive deep into your operations, mapping every manual process, bottleneck, and pain point. We define clear success metrics together so we know exactly what we're aiming for and can measure ROI from day one."
    }
  },
  {
    "title": {
      "es": "Estrategia y Diseño",
      "en": "Strategy & Design"
    },
    "desc": {
      "es": "Diseño la arquitectura de automatización adaptada a tu stack y objetivos de negocio. No son plantillas genéricas. Es un plan personalizado construido alrededor de tus flujos específicos, con prioridades claras y una hoja de ruta para escalar.",
      "en": "I design the automation architecture tailored to your stack and business goals. This isn't generic templates. It's a custom blueprint built around your specific workflows, with clear priorities and a roadmap for scaling."
    }
  },
  {
    "title": {
      "es": "Construcción e Integración",
      "en": "Build & Integrate"
    },
    "desc": {
      "es": "Construyo los workflows de automatización, conecto tus sistemas existentes y pruebo todo rigurosamente. Ves incrementos funcionales cada semana, no solo reportes de progreso. Iteramos juntos hasta que sea exactamente lo que necesitas.",
      "en": "I build the automation workflows, connect your existing systems, and test everything rigorously. You see working increments every week, not just progress reports. We iterate together until it's exactly right."
    }
  },
  {
    "title": {
      "es": "Lanzamiento y Capacitación",
      "en": "Launch & Train"
    },
    "desc": {
      "es": "Salimos a producción juntos. Capacito a tu equipo, documento todo y me mantengo activo durante la transición. No te tiro el código por encima del muro. Me aseguro de que tu equipo esté confiado y el sistema funcione sin problemas.",
      "en": "We go live together. I train your team, document everything, and stay hands-on during the transition. No throwing code over the wall. I make sure your team is confident and the system is running smoothly."
    }
  },
  {
    "title": {
      "es": "Monitoreo y Optimización",
      "en": "Monitor & Optimize"
    },
    "desc": {
      "es": "Aquí es donde la mayoría de los proveedores desaparecen. Yo no. Monitoreo tus workflows 24/7, rastreo métricas de rendimiento y optimizo continuamente. Si algo se rompe, lo arreglo. Si algo puede ser mejor, lo mejoro. Este es mi compromiso de retainer contigo.",
      "en": "This is where most vendors disappear. I don't. I monitor your workflows 24/7, track performance metrics, and continuously optimize. If something breaks, I fix it. If something can be better, I improve it. This is my retainer commitment to you."
    }
  },
  {
    "title": {
      "es": "Escalamiento y Expansión",
      "en": "Scale & Expand"
    },
    "desc": {
      "es": "A medida que tu negocio crece, tu automatización crece contigo. Identificamos nuevas oportunidades, construimos workflows adicionales y expandimos tu ecosistema de automatización. No solo mantengo lo que construimos. Te ayudo a escalar al siguiente nivel.",
      "en": "As your business grows, your automation grows with it. We identify new opportunities, build additional workflows, and expand your automation ecosystem. I'm not just maintaining what we built. I'm helping you scale to the next level."
    }
  }
],
};

export const FAQ = {
  kicker: l('Preguntas', 'FAQ'),
  title: l('Preguntas frecuentes', 'Frequently asked questions'),
  items: [
    {
      q: l('¿Para quién trabajan?', 'Who do you work with?'),
      a: l('Para empresas y equipos que quieren quitar procesos manuales: automatización, datos y reportes, IA aplicada, software a medida e infraestructura. También administradores de propiedades.', 'Companies and teams that want to remove manual processes: automation, data and reporting, applied AI, custom software and infrastructure. Property managers too.'),
    },
    {
      q: l('¿Cómo empezamos?', 'How do we start?'),
      a: l('Con una llamada de descubrimiento. Mapeamos el proceso o problema, definimos métricas de éxito y de ahí sale el diseño, la ruta y la cotización.', 'With a discovery call. We map the process or problem, define success metrics, and the design, roadmap and quote come out of that.'),
    },
    {
      q: l('¿Qué pasa si la IA se equivoca?', 'What if the AI gets it wrong?'),
      a: l('Donde una decisión importa, el sistema propone y una persona aprueba. Los agentes de IA se diseñan con humano en el ciclo.', 'Where a decision matters, the system proposes and a person approves. AI agents are designed with a human in the loop.'),
    },
    {
      q: l('¿Con qué herramientas trabajan?', 'Which tools do you use?'),
      a: l('n8n, Python, bases de datos SQL, Power BI, modelos locales o por API (OpenRouter, Ollama) y infraestructura en la nube o propia.', 'n8n, Python, SQL databases, Power BI, local or API models (OpenRouter, Ollama) and cloud or self-hosted infrastructure.'),
    },
    {
      q: l('¿Qué pasa después del lanzamiento?', 'What happens after launch?'),
      a: l('El soporte posterior se define en la cotización y los acuerdos de cada proyecto: qué incluye (por ejemplo monitoreo, respaldos, alertas, correcciones o mejoras), por cuánto tiempo y con qué tiempos de respuesta.', 'Post-launch support is defined in each project\'s quote and agreements: what it includes (for example monitoring, backups, alerts, fixes or improvements), for how long and with what response times.'),
    },
  ],
};

export const CONTACT = {
  title: l('Cuéntanos el proceso que hoy se hace', 'Tell us about the process that is still'),
  accent: l('a mano', 'done by hand'),
  lead: l('30 minutos para mapear una solución a tu medida.', '30 minutes to map out a solution tailored to your business.'),
  call: l('Agendar llamada →', 'Book a call →'),
  mail: l('Escribir por correo', 'Send an email'),
  linkedin: l('Comparto ideas de automatización, infraestructura y BI en LinkedIn.', 'I share insights on automation, cloud infrastructure and BI on LinkedIn.'),
};

export const FOOT = {
  tagline: L_('footer.tagline'),
  copy: l('© 2026 Otomate Labs', '© 2026 Otomate Labs'),
  col: { site: l('Sitio', 'Site'), lab: l('Laboratorio', 'Lab'), contact: l('Contacto', 'Contact') },
};
