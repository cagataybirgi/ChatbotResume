import {
  additionalProjectLinks,
  featuredProjectLinks,
  githubProfileLink,
  resumeDocuments,
  supportingDocuments,
  type ChatReply,
} from '../data/resume';

const normalize = (value: string) =>
  value
    .toLocaleLowerCase('tr-TR')
    .replaceAll('ı', 'i')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const includesAny = (query: string, terms: string[]) =>
  terms.some((term) => query.includes(term));

const replies = {
  intro: (): ChatReply => ({
    eyebrow: 'UPDATED PROFILE',
    title: 'Software development, networking, and accessible mobile AI.',
    text: 'Çağatay Birgi is a candidate for a Bachelor of Science in Computer Engineering at İzmir Institute of Technology, with expected graduation in 2027. His updated CV combines a Networking & Systems internship with a solo VPN reporting system and a three-person accessibility application built with Flutter and Gemini.',
    bullets: [
      'Builds with Python, Java, Dart, Kotlin, React, Node.js, Express, Vite, Flutter, SQL, and MariaDB',
      'Has practical exposure to switching, routing, servers, virtualization, backups, and network security',
      'Contributes across UI, service integration, state management, and team coordination',
    ],
  }),

  projects: (): ChatReply => ({
    eyebrow: 'COMPLETE PROJECT PORTFOLIO',
    title: 'Six verified projects across full-stack, AI, mobile, and Java development.',
    text: 'Here is the complete project list currently supported by the CV and verified public project sources.',
    bullets: [
      'VPN Session Reporter — a solo full-stack system that converts Palo Alto GlobalProtect logs into paired VPN sessions, dashboards, exports, and scheduled reports',
      'Peek for the Visually Impaired — a three-person Flutter accessibility app that uses Gemini and voice interaction to describe a user’s surroundings',
      'UzmanBaba — a full-stack Turkish local-services marketplace for finding professionals, managing bookings, and reviewing completed work',
      'In-Context Learning Study — a Python evaluation project comparing few-shot, chain-of-thought, and persona prompting across reasoning datasets',
      'Undergraduate Transfer Management System (UTMS) — a TypeScript/Vite web application supporting undergraduate transfer workflows',
      'FrozenLakePuzzle — a collaborative Java/OOP puzzle-game project',
    ],
    links: [...featuredProjectLinks, ...additionalProjectLinks],
    note: 'VPN Session Reporter and Peek are selected in the updated CV; the remaining projects are additional verified portfolio work. Public links are shown where currently accessible.',
  }),

  selectedProjects: (): ChatReply => ({
    eyebrow: 'CV-SELECTED PROJECTS',
    title: 'Two projects with distinct technical scopes.',
    text: 'The updated CV selects VPN Session Reporter, a solo full-stack networking project, and Peek for the Visually Impaired, a three-person Flutter accessibility project using Google Gemini.',
    bullets: [
      'VPN Session Reporter — parses Palo Alto GlobalProtect connection logs, pairs sessions in MariaDB, and reports activity in a React dashboard',
      'Peek — captures photos or short videos, generates spoken scene descriptions, and supports spoken follow-up questions',
    ],
    links: featuredProjectLinks,
    note: 'These are the two projects selected in the updated CV. VPN Session Reporter now has a verified public repository; a public Peek repository is not currently available.',
  }),

  vpnProject: (): ChatReply => ({
    eyebrow: 'SOLO PROJECT · FULL STACK',
    title: 'VPN Session Reporter.',
    text: 'Çağatay built a full-stack session reporting system for Palo Alto GlobalProtect VPN. A syslog adapter parses PAN-OS connect and disconnect logs, an API pairs and stores sessions in MariaDB, and a React dashboard shows who connected, when, and for how long.',
    bullets: [
      'Backend: Node.js and Express',
      'Frontend: React with Vite',
      'Database: MariaDB',
      'Domain: VPN activity and session-duration reporting',
    ],
    links: featuredProjectLinks,
    note: 'Project description verified from the updated CV and the newly public repository; it is identified in the CV as a solo project.',
  }),

  peekProject: (): ChatReply => ({
    eyebrow: 'GROUP PROJECT · ACCESSIBILITY',
    title: 'Peek for the Visually Impaired.',
    text: 'Peek is a Flutter mobile app built by a three-person team. It captures a photo or short video, sends it to Google’s Gemini vision-language model, and narrates a concise scene description or answers a spoken follow-up question.',
    bullets: [
      'Çağatay contributed UI screens for camera capture, conversation flow, gallery, and settings',
      'He also worked on Gemini integration, speech-to-text, text-to-speech, and state management',
      'The app uses voice-driven interaction, haptic feedback, and audio-first navigation',
    ],
    note: 'Role, team size, accessibility design, and technology details are from the updated CV. No currently accessible public repository link is supplied.',
  }),

  additionalProjects: (): ChatReply => ({
    eyebrow: 'ADDITIONAL PUBLIC PROJECTS',
    title: 'More work is available beyond the two CV-selected projects.',
    text: 'Çağatay’s current public portfolio sources also include UzmanBaba, an in-context learning evaluation study, UTMS, and FrozenLakePuzzle. These are additional portfolio items and are not presented as the two selected projects in the updated CV.',
    bullets: [
      'UzmanBaba — a full-stack Turkish local-services marketplace with booking, reviews, and role-specific dashboards',
      'In-Context Learning Study — prompting strategies and evaluation workflows in Python',
      'UTMS — a TypeScript/Vite undergraduate transfer-management application',
      'FrozenLakePuzzle — a Java team puzzle game',
    ],
    links: additionalProjectLinks,
    note: 'These links were checked against the currently accessible public repositories and are intentionally separated from the updated CV’s selected projects.',
  }),

  uzmanBaba: (): ChatReply => ({
    eyebrow: 'ADDITIONAL PROJECT · FULL STACK',
    title: 'UzmanBaba local-services marketplace.',
    text: 'UzmanBaba is a Turkish marketplace where customers can find service professionals, make bookings, and review completed work. Its public repository contains a React/Vite/Tailwind frontend and a Node.js/Express backend using Prisma and PostgreSQL.',
    bullets: [
      'Authentication includes registration, email verification, password reset, and account controls',
      'Professional discovery supports city and text filters, sorting, pagination, profiles, and reviews',
      'Booking flows cover creation, confirmation, completion, and cancellation for customers and professionals',
    ],
    links: [additionalProjectLinks[0]],
    note: 'Verified from the currently public repository; it is an additional portfolio project rather than a CV-selected project.',
  }),

  inContextProject: (): ChatReply => ({
    eyebrow: 'ADDITIONAL PROJECT · PYTHON',
    title: 'In-Context Learning evaluation study.',
    text: 'This public project compares few-shot prompting, zero-shot chain-of-thought, and persona prompting on GSM8K and StrategyQA using Llama 3.3 70B and Nemotron-3 Super 120B through one NVIDIA NIM endpoint.',
    bullets: [
      'Includes decoding, k-shot, CoT-trigger, persona, and structured-output ablations',
      'Tracks exact match, parse failures, numeric tolerance, token-F1, and ROUGE-L',
      'Includes self-consistency voting, error analysis, resumable runs, and tests',
    ],
    links: [additionalProjectLinks[1]],
    note: 'Verified from the public repository; this is an additional project rather than one of the two selected in the updated CV.',
  }),

  utms: (): ChatReply => ({
    eyebrow: 'ADDITIONAL PROJECT · TYPESCRIPT',
    title: 'Undergraduate Transfer Management System (UTMS).',
    text: 'UTMS is a public multi-package web application for undergraduate transfer workflows, with a TypeScript/Vite interface plus API and backend packages, deployment configuration, and a structured test-plan fix log.',
    links: [additionalProjectLinks[2]],
    note: 'Verified from the public repository; this is an additional project rather than one of the two selected in the updated CV.',
  }),

  javaGames: (): ChatReply => ({
    eyebrow: 'ADDITIONAL PROJECT · JAVA',
    title: 'A collaborative Java puzzle game.',
    text: 'FrozenLakePuzzle is an earlier Java/OOP team project. Its repository remains available as additional portfolio evidence but it is not one of the two projects selected in the updated CV.',
    links: [additionalProjectLinks[3]],
  }),

  skills: (): ChatReply => ({
    eyebrow: 'TECHNICAL SKILLS',
    title: 'Application development backed by networking fundamentals.',
    text: 'The updated CV groups Çağatay’s skills by discipline: programming, web and data, mobile and AI, and networking and systems.',
    bullets: [
      'Programming: Python, Java, Dart, Kotlin, object-oriented programming',
      'Web and data: React, Node.js, Express, Vite, CSS, SQL, MariaDB',
      'Mobile and AI: Flutter, Gemini API, speech-to-text, text-to-speech, state management',
      'Networking and systems: VLANs, trunking, EtherChannel, OSPF, Cisco hardware, Windows Server, Linux, virtualization, RAID, backups, FortiGate, IPsec',
    ],
    note: 'The headline skill list and internship technologies are taken from the updated CV.',
  }),

  education: (): ChatReply => ({
    eyebrow: 'EDUCATION',
    title: 'İzmir Institute of Technology (İYTE).',
    text: 'Çağatay is pursuing a Bachelor of Science in Computer Engineering at İzmir Institute of Technology from 2023 to 2027, with graduation expected in 2027. The updated CV lists him as a fourth-year student for the 2026–2027 academic year.',
  }),

  internship: (): ChatReply => ({
    eyebrow: 'NETWORKING & SYSTEMS INTERNSHIP',
    title: 'Bilgitürk Technology · July–August 2026.',
    text: 'The updated CV lists Çağatay as a Networking & Systems Intern at Bilgitürk Technology for July–August 2026. The placement spans networking, server infrastructure, and network security.',
    bullets: [
      'Switching and routing: VLANs, trunking, EtherChannel, and OSPF on Cisco hardware',
      'Servers and infrastructure: Windows Server, Linux, virtualization, RAID, and backups',
      'Security: FortiGate firewalls and IPsec-based domain isolation',
    ],
    note: 'Dates and technical scope are taken directly from the updated CV.',
  }),

  experience: (): ChatReply => ({
    eyebrow: 'EXPERIENCE',
    title: 'Networking, systems, team coordination, and customer relations.',
    text: 'The updated CV combines a technical internship with project planning, team coordination, and customer-relations experience.',
    bullets: [
      'Bilgitürk Technology · Networking & Systems Intern · July–August 2026',
      'Yurt-Time Project · Team Member · September–December 2024',
      'Tourism Sector · Customer Relations Support · July 2022',
    ],
    note: 'Dates and role descriptions are taken directly from the updated one-page CV.',
  }),

  social: (): ChatReply => ({
    eyebrow: 'SOCIAL IMPACT',
    title: 'Sustained participation in ÇYDD activities.',
    text: 'The updated CV states that Çağatay served on ÇYDD Urla’s youth executive committee from November 2023 through November 2025, helping discuss event schedules and contributing to social-responsibility projects and organizational processes.',
    bullets: [
      'Volunteer coding workshop instructor for KODLAMACA, 2025–2026',
      'Mentee in ÇYDD Mentorship Project terms 13 and 14, covering 2024–2026',
      'Participant in Köyde Şenlik Var!, 24–29 June 2025',
      'Career Roadmap workshops covering social-impact design, teamwork, conflict management, and creativity',
    ],
    attachments: supportingDocuments,
    note: 'Committee dates come from the updated CV; activity details are supported by the supplied certificates.',
  }),

  documents: (): ChatReply => ({
    eyebrow: 'DOCUMENT LIBRARY',
    title: 'The updated CV and supporting certificates.',
    text: 'Open or download Çağatay’s new one-page English CV and the supplied source documents behind the social-impact answers.',
    attachments: [...resumeDocuments, ...supportingDocuments],
    note: 'The previous English and Turkish CV exports are no longer presented in the document library.',
  }),

  languages: (): ChatReply => ({
    eyebrow: 'LANGUAGES',
    title: 'Turkish, English, and German.',
    text: 'The updated CV lists Turkish as native, English at B2 (upper-intermediate), and German at A2 (beginner).',
  }),

  hobbies: (): ChatReply => ({
    eyebrow: 'BEYOND THE CV',
    title: 'Curious, outdoors-oriented, and technology-aware.',
    text: 'Çağatay’s updated CV lists interests in historical events, global geography, scientific articles, technology trends, hiking, and cycling.',
  }),

  contact: (): ChatReply => ({
    eyebrow: 'CONTACT',
    title: 'Continue the conversation directly.',
    text: 'Çağatay can be reached by email or phone, and his public work is available on GitHub.',
    links: [
      { label: 'cagataybirgi@gmail.com', meta: 'Email', url: 'mailto:cagataybirgi@gmail.com' },
      { label: '+90 545 727 11 77', meta: 'Phone', url: 'tel:+905457271177' },
      githubProfileLink,
    ],
  }),

  strengths: (): ChatReply => ({
    eyebrow: 'REVIEWER SUMMARY',
    title: 'Why Çağatay stands out.',
    text: 'The updated profile shows breadth across application development and infrastructure: a solo full-stack networking tool, an accessibility-focused mobile AI project, and practical exposure to enterprise networking and systems.',
    bullets: [
      'Connects networking concepts with a working VPN reporting application',
      'Contributed across UI and service layers in a three-person accessibility project',
      'Has exposure to both application stacks and physical or virtual infrastructure',
      'Combines technical work with coordination, customer relations, and community participation',
    ],
    note: 'This is a conservative synthesis of the updated CV and supporting sources.',
  }),

  availability: (): ChatReply => ({
    eyebrow: 'NOT IN THE SOURCE MATERIAL',
    title: 'Current availability is best confirmed directly.',
    text: 'The updated CV does not specify current internship availability, preferred start date, location flexibility, or work authorization. Please contact Çağatay for an up-to-date answer.',
    links: [
      { label: 'Email Çağatay', meta: 'Ask about availability', url: 'mailto:cagataybirgi@gmail.com' },
    ],
  }),

  fallback: (): ChatReply => ({
    eyebrow: 'LET’S NARROW IT DOWN',
    title: 'I couldn’t tie that question to a verified résumé detail.',
    text: 'I only answer from Çağatay’s updated CV, certificates, and clearly identified public repositories. Try asking about the Bilgitürk internship, VPN Session Reporter, Peek, UzmanBaba, skills, education, languages, volunteering, contact details, additional projects, or documents.',
  }),
};

export function createReply(input: string): ChatReply {
  const query = normalize(input);

  if (!query) return replies.fallback();

  if (
    ['hello', 'hi', 'hey', 'merhaba'].includes(query) ||
    includesAny(query, ['who is', 'about cagatay', 'introduce', 'kimdir'])
  ) {
    return replies.intro();
  }

  if (includesAny(query, ['contact', 'email', 'phone', 'reach', 'iletisim', 'e-posta', 'github profile'])) {
    return replies.contact();
  }

  if (includesAny(query, ['available', 'availability', 'start date', 'work authorization', 'musait'])) {
    return replies.availability();
  }

  if (query === 'cv' || includesAny(query, ['document', 'certificate', 'proof', 'download', 'resume', 'belge', 'sertifika', 'ozgecmis'])) {
    return replies.documents();
  }

  if (includesAny(query, ['volunteer', 'social impact', 'social responsibility', 'cydd', 'kodlamaca', 'mentorship', 'mentor', 'koyde', 'gonullu', 'sosyal sorumluluk'])) {
    return replies.social();
  }

  if (includesAny(query, ['bilgiturk', 'networking intern', 'systems intern', 'internship', 'staj', 'vlan', 'etherchannel', 'ospf', 'fortigate', 'ipsec'])) {
    return replies.internship();
  }

  if (includesAny(query, ['vpn', 'globalprotect', 'pan-os', 'session reporter', 'mariadb'])) {
    return replies.vpnProject();
  }

  if (includesAny(query, ['peek', 'visually impaired', 'accessibility app', 'flutter', 'gemini', 'haptic', 'speech-to-text', 'text-to-speech'])) {
    return replies.peekProject();
  }

  if (includesAny(query, ['selected project', 'cv project', 'projects on the cv', 'projects in the cv'])) {
    return replies.selectedProjects();
  }

  if (includesAny(query, ['more project', 'other project', 'additional project', 'beyond the cv', 'not on the cv'])) {
    return replies.additionalProjects();
  }

  if (includesAny(query, ['uzmanbaba', 'uzman baba', 'local services', 'service marketplace'])) {
    return replies.uzmanBaba();
  }

  if (includesAny(query, ['in-context', 'in context', 'chain of thought', 'prompting', 'gsm8k', 'strategyqa', 'nemotron', 'llama'])) {
    return replies.inContextProject();
  }

  if (includesAny(query, ['utms', 'transfer management', 'typescript project'])) return replies.utms();
  if (includesAny(query, ['frozen', 'lake puzzle'])) return replies.javaGames();

  if (includesAny(query, ['project', 'portfolio', 'built', 'build', 'proje'])) {
    return replies.projects();
  }

  if (includesAny(query, ['skill', 'technology', 'tech stack', 'python', 'java', 'react', 'node', 'dart', 'kotlin', 'css', 'sql', 'programming', 'networking', 'yetenek', 'teknoloji'])) {
    return replies.skills();
  }

  if (includesAny(query, ['education', 'university', 'degree', 'graduat', 'school', 'egitim', 'universite', 'mezun'])) {
    return replies.education();
  }

  if (includesAny(query, ['experience', 'work', 'tourism', 'yurt-time', 'yurt time', 'job', 'deneyim', 'is tecrubesi'])) {
    return replies.experience();
  }

  if (includesAny(query, ['language', 'english', 'german', 'turkish', 'dil', 'ingilizce', 'almanca', 'turkce'])) {
    return replies.languages();
  }

  if (includesAny(query, ['hobby', 'interest', 'outside work', 'free time', 'hobi', 'ilgi'])) {
    return replies.hobbies();
  }

  if (includesAny(query, ['strength', 'why hire', 'stand out', 'good fit', 'candidate', 'guclu', 'neden'])) {
    return replies.strengths();
  }

  return replies.fallback();
}
