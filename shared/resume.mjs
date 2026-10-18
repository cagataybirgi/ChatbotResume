// Single source of truth for every résumé fact on the site.
// The chat API builds the model's context from this file, and the browser builds
// the sidebar, link cards, and offline answers from it. Update facts here only.

export const profile = {
  name: 'Çağatay Birgi',
  role: 'Computer Engineering BSc candidate',
  focus: 'Software · Networking',
  email: 'cagataybirgi@gmail.com',
  phone: '+90 545 727 11 77',
  phoneHref: 'tel:+905457271177',
  github: 'https://github.com/cagataybirgi',
  education: {
    degree: 'Bachelor of Science in Computer Engineering',
    school: 'İzmir Institute of Technology',
    shortSchool: 'İYTE',
    years: '2023–2027',
    graduation: '2027',
    standing: 'Fourth-year student in the 2026–2027 academic year',
  },
  summary: 'Çağatay Birgi is a fourth-year Computer Engineering student at İzmir Institute of Technology, graduating in 2027. He completed a Networking & Systems internship at Bilgitürk Technology in summer 2026, built a solo VPN session reporting system, and worked on a three-person accessibility app built with Flutter and Gemini.',
  highlights: [
    'Connects networking concepts with a working VPN reporting application',
    'Worked across the UI and service layers of a three-person accessibility app',
    'Has exposure to both application stacks and physical or virtual infrastructure',
    'Combines technical work with team coordination, customer relations, and community volunteering',
  ],
  seeking: {
    badge: 'Open to part-time & internships',
    now: 'Part-time roles or internships during the 2026–2027 academic year',
    later: 'Full-time roles after graduating in 2027',
    location: 'Open to relocating abroad',
  },
  unknowns: [
    'work authorization or visa status',
    'salary expectations',
    'GPA',
    'quantified project outcomes',
  ],
};

export const skills = [
  { area: 'Programming', items: ['Python', 'Java', 'Dart', 'Kotlin', 'object-oriented programming'] },
  { area: 'Web and data', items: ['React', 'Node.js', 'Express', 'Vite', 'CSS', 'SQL', 'MariaDB'] },
  { area: 'Mobile and AI', items: ['Flutter', 'Gemini API', 'speech-to-text', 'text-to-speech', 'state management'] },
  {
    area: 'Networking and systems',
    items: ['VLANs', 'trunking', 'EtherChannel', 'OSPF', 'Cisco hardware', 'Windows Server', 'Linux', 'virtualization', 'RAID', 'backups', 'FortiGate', 'IPsec'],
  },
];

export const experience = [
  {
    org: 'Bilgitürk Technology',
    role: 'Networking & Systems Intern',
    dates: 'July–August 2026',
    summary: 'Completed a Networking & Systems internship covering switching and routing, server infrastructure, and network security.',
    details: [
      'Switching and routing: VLANs, trunking, EtherChannel, and OSPF on Cisco hardware',
      'Server infrastructure: Windows Server, Linux, virtualization, RAID, and backups',
      'Network security: FortiGate firewalls and IPsec-based domain isolation',
    ],
  },
  {
    org: 'Yurt-Time Project',
    role: 'Team Member',
    dates: 'September–December 2024',
    summary: 'Supported task planning and team coordination, strengthening collaboration and time-management skills.',
    details: [],
  },
  {
    org: 'Tourism sector',
    role: 'Customer Relations Support',
    dates: 'July 2022',
    summary: 'Supported customer relations in a tourism setting, strengthening communication and service skills.',
    details: [],
  },
];

export const projects = [
  {
    id: 'vpn_reporter',
    name: 'VPN Session Reporter',
    onCv: true,
    team: 'Solo project',
    stack: 'React · Node.js · MariaDB',
    url: 'https://github.com/cagataybirgi/vpn_reporter',
    summary: 'A full-stack system that turns Palo Alto GlobalProtect VPN logs into paired sessions, dashboards, exports, and scheduled reports',
    details: [
      'A syslog adapter parses PAN-OS connect and disconnect logs',
      'An API pairs and stores sessions in MariaDB',
      'A React dashboard shows who connected, when, and for how long',
      'The repository also documents HMAC-signed event ingestion, scheduled email reports with PDF attachments, filtered Excel exports, and production deployment support',
    ],
    technologies: ['Node.js', 'Express', 'React', 'Vite', 'MariaDB'],
    keywords: ['vpn', 'globalprotect', 'pan-os', 'session reporter', 'mariadb', 'syslog'],
  },
  {
    id: 'peek',
    name: 'Peek for the Visually Impaired',
    onCv: true,
    team: 'Group project with three members',
    stack: 'Flutter · Gemini API',
    url: null,
    summary: 'A Flutter app that describes a user’s surroundings aloud using Gemini and voice interaction',
    details: [
      'Captures a photo or short video, sends it to Google’s Gemini vision-language model, and reads back a concise scene description or answers a spoken follow-up question',
      'Çağatay built UI screens for camera capture, listening and conversation flow, gallery, and settings',
      'He also worked on the service layer: Gemini integration, the speech-to-text and text-to-speech pipeline, and state management',
      'Accessibility design: voice-driven interaction, haptic feedback, and audio-first navigation that does not rely on reading the screen',
    ],
    technologies: ['Flutter', 'Dart', 'Gemini API', 'speech-to-text', 'text-to-speech'],
    keywords: ['peek', 'visually impaired', 'accessibility', 'flutter', 'gemini', 'haptic', 'speech-to-text', 'text-to-speech'],
  },
  {
    id: 'uzmanbaba',
    name: 'UzmanBaba',
    onCv: false,
    team: null,
    stack: 'TypeScript · Full-stack marketplace',
    url: 'https://github.com/cagataybirgi/Uzmanbaba',
    summary: 'A full-stack Turkish local-services marketplace for finding professionals, booking them, and reviewing completed work',
    details: [
      'Frontend: React 18, Vite, and Tailwind. Backend: Node.js, Express, Prisma, and PostgreSQL',
      'Authentication with registration, email verification, and password reset',
      'Professional search with city and text filters, sorting, pagination, profiles, and reviews',
      'Booking lifecycle (create, confirm, complete, cancel) with customer and professional dashboards, plus profile editing, avatar upload, and notification preferences',
    ],
    technologies: ['React', 'Vite', 'Tailwind', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    keywords: ['uzmanbaba', 'uzman baba', 'local services', 'marketplace', 'booking'],
  },
  {
    id: 'in_context_learning',
    name: 'In-Context Learning Study',
    onCv: false,
    team: null,
    stack: 'Python · AI evaluation',
    url: 'https://github.com/cagataybirgi/in-context-learning-project',
    summary: 'A Python evaluation study comparing few-shot, zero-shot chain-of-thought, and persona prompting on reasoning datasets',
    details: [
      'Runs GSM8K and StrategyQA on Llama 3.3 70B and Nemotron-3 Super 120B through the same NVIDIA NIM endpoint',
      'Ablations over decoding, k-shot, chain-of-thought trigger, persona, and structured output',
      'Metrics: exact match, parse failures, numeric tolerance, token-F1, and ROUGE-L',
      'Self-consistency voting, error analysis, resumable runs, and tests',
    ],
    technologies: ['Python', 'NVIDIA NIM', 'Llama 3.3 70B', 'Nemotron-3 Super 120B'],
    keywords: ['in-context', 'in context', 'chain of thought', 'prompting', 'gsm8k', 'strategyqa', 'nemotron', 'llama', 'llm'],
  },
  {
    id: 'utms',
    name: 'Undergraduate Transfer Management System (UTMS)',
    onCv: false,
    team: null,
    stack: 'TypeScript · Full-stack application',
    url: 'https://github.com/cagataybirgi/utms',
    summary: 'A TypeScript/Vite web application for managing undergraduate transfer workflows',
    details: [
      'TypeScript/Vite interface with separate API and backend packages',
      'Deployment configuration and a structured test-plan fix log',
    ],
    technologies: ['TypeScript', 'Vite'],
    keywords: ['utms', 'transfer management', 'undergraduate transfer'],
  },
  {
    id: 'frozen_lake',
    name: 'FrozenLakePuzzle',
    onCv: false,
    team: 'Team project',
    stack: 'Java · Team puzzle game',
    url: 'https://github.com/MrAkfook/FrozenLakePuzzle',
    summary: 'An earlier Java/OOP team puzzle game',
    details: [],
    technologies: ['Java'],
    keywords: ['frozen', 'lake puzzle', 'puzzle game'],
  },
];

export const volunteering = [
  {
    text: 'Youth executive committee member at ÇYDD Urla, November 2023 – November 2025: discussed event schedules (many volunteers were university students), took part in social-responsibility projects, and contributed to organizational processes',
    source: 'CV',
  },
  { text: 'Volunteer coding workshop instructor at KODLAMACA, 2025–2026', source: 'CV', document: 'kodlamaca' },
  { text: 'Mentee in the ÇYDD Mentorship Project, terms 13 and 14 (2024–2026)', source: 'certificate', document: 'cydd_mentorship' },
  { text: 'Participant in Köyde Şenlik Var!, 24–29 June 2025', source: 'certificate', document: 'koyde_senlik_var' },
  {
    text: 'Career Roadmap workshops on social-impact design, teamwork and conflict management, and drawing-based creativity',
    source: 'certificate',
    document: 'career_roadmap',
  },
];

export const languages = [
  { name: 'Turkish', level: 'native' },
  { name: 'English', level: 'B2 (upper-intermediate)' },
  { name: 'German', level: 'A2 (beginner)' },
];

export const interests = ['historical events', 'global geography', 'scientific articles', 'technology trends', 'hiking', 'cycling'];

export const documents = [
  {
    id: 'cv',
    name: 'Çağatay Birgi — CV',
    meta: 'English · PDF · 1 page',
    path: '/documents/Cagatay-Birgi-CV.pdf',
    kind: 'pdf',
    description: 'One-page English CV',
  },
  {
    id: 'koyde_senlik_var',
    name: 'Köyde Şenlik Var! — Participation',
    meta: 'ÇYDD Urla · June 2025 · PDF',
    path: '/documents/Koyde-Senlik-Var.pdf',
    kind: 'pdf',
    description: 'Participation certificate, ÇYDD Urla, June 2025',
  },
  {
    id: 'career_roadmap',
    name: 'Career Roadmap — Social Impact Design',
    meta: '2-hour seminar · PDF',
    path: '/documents/Career-Roadmap-Social-Impact.pdf',
    kind: 'pdf',
    description: 'Certificate for a 2-hour social-impact design seminar',
  },
  {
    id: 'cydd_mentorship',
    name: 'ÇYDD Mentorship & Career Workshops',
    meta: '2024–2026 · 5 pages · PDF',
    path: '/documents/CYDD-Mentorship-and-Workshops.pdf',
    kind: 'pdf',
    description: 'Mentorship and career workshop certificates, 2024–2026, 5 pages',
  },
  {
    id: 'kodlamaca',
    name: 'KODLAMACA — Volunteer Instructor',
    meta: '2025–2026 · Certificate image',
    path: '/documents/Kodlamaca-Instructor.jpeg',
    kind: 'image',
    description: 'Volunteer instructor certificate image, 2025–2026',
  },
];

export const contactCards = [
  { id: 'email', label: profile.email, meta: 'Email', url: `mailto:${profile.email}` },
  { id: 'phone', label: profile.phone, meta: 'Phone', url: profile.phoneHref },
  { id: 'github', label: profile.github.replace('https://', ''), meta: 'GitHub profile', url: profile.github },
];

export const linkCards = [
  ...projects
    .filter((project) => project.url)
    .map((project) => ({ id: project.id, label: project.name, meta: project.stack, url: project.url })),
  ...contactCards,
];

export const cardIds = [...linkCards.map((card) => card.id), ...documents.map((document) => document.id)];

// Turns card IDs (chosen by the model or by the offline router) into link and document cards.
export function resolveCards(ids) {
  const unique = [...new Set(ids)];
  const links = unique.flatMap((id) => {
    const card = linkCards.find((item) => item.id === id);
    return card ? [{ label: card.label, meta: card.meta, url: card.url }] : [];
  });
  const attachments = unique.flatMap((id) => {
    const document = documents.find((item) => item.id === id);
    return document ? [{ name: document.name, meta: document.meta, path: document.path, kind: document.kind }] : [];
  });
  return { links, attachments };
}
