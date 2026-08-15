export type LinkItem = {
  label: string;
  url: string;
  meta?: string;
};

export type Attachment = {
  name: string;
  meta: string;
  path: string;
  kind: 'pdf' | 'image';
};

export type ChatReply = {
  eyebrow?: string;
  title?: string;
  text: string;
  bullets?: string[];
  links?: LinkItem[];
  attachments?: Attachment[];
  note?: string;
};

export const resumeDocuments: Attachment[] = [
  {
    name: 'Çağatay Birgi — CV',
    meta: 'English · PDF · 2 pages',
    path: '/documents/Cagatay-Birgi-CV.pdf',
    kind: 'pdf',
  },
];

export const supportingDocuments: Attachment[] = [
  {
    name: 'Köyde Şenlik Var! — Participation',
    meta: 'ÇYDD Urla · June 2025 · PDF',
    path: '/documents/Koyde-Senlik-Var.pdf',
    kind: 'pdf',
  },
  {
    name: 'Career Roadmap — Social Impact Design',
    meta: '2-hour seminar · PDF',
    path: '/documents/Career-Roadmap-Social-Impact.pdf',
    kind: 'pdf',
  },
  {
    name: 'ÇYDD Mentorship & Career Workshops',
    meta: '2024–2026 · 5 pages · PDF',
    path: '/documents/CYDD-Mentorship-and-Workshops.pdf',
    kind: 'pdf',
  },
  {
    name: 'KODLAMACA — Volunteer Instructor',
    meta: '2025–2026 · Certificate image',
    path: '/documents/Kodlamaca-Instructor.jpeg',
    kind: 'image',
  },
];

export const featuredProjectLinks: LinkItem[] = [
  {
    label: 'VPN Session Reporter',
    meta: 'React · Node.js · MariaDB',
    url: 'https://github.com/cagataybirgi/vpn_reporter',
  },
];

export const additionalProjectLinks: LinkItem[] = [
  {
    label: 'UzmanBaba',
    meta: 'TypeScript · Full-stack marketplace',
    url: 'https://github.com/cagataybirgi/Uzmanbaba',
  },
  {
    label: 'In-Context Learning Study',
    meta: 'Python · AI evaluation',
    url: 'https://github.com/cagataybirgi/in-context-learning-project',
  },
  {
    label: 'Undergraduate Transfer Management System',
    meta: 'TypeScript · Full-stack application',
    url: 'https://github.com/cagataybirgi/utms',
  },
  {
    label: 'FrozenLakePuzzle',
    meta: 'Java · Team puzzle game',
    url: 'https://github.com/MrAkfook/FrozenLakePuzzle',
  },
];

export const githubProfileLink: LinkItem = {
  label: 'github.com/cagataybirgi',
  meta: 'GitHub profile',
  url: 'https://github.com/cagataybirgi',
};

export const welcomeReply: ChatReply = {
  eyebrow: 'RESUME ASSISTANT',
  title: 'Hello — I’m Çağatay’s interactive résumé.',
  text: 'I can help you review Çağatay Birgi’s updated background without hunting through a document. Ask about his networking internship, selected projects, technical skills, education, community work, additional public projects, or supporting documents.',
  attachments: [resumeDocuments[0]],
  note: 'Answers are grounded in the updated CV, certificates, and clearly identified public repositories.',
};

export const quickQuestions = [
  'Show all of his projects',
  'Show his public GitHub projects',
  'Tell me about his Bilgitürk internship',
  'Show all documents',
];
