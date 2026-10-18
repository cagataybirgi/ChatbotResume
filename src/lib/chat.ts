import {
  documents,
  experience,
  interests,
  languages,
  profile,
  projects,
  resolveCards,
  skills,
  volunteering,
  type ChatReply,
  type Project,
} from '../../shared/resume.mjs';

// Offline answers, used only when the AI endpoint is unavailable. Every fact comes from
// shared/resume.mjs; this file only decides which answer fits a question.

const normalize = (value: string) =>
  value
    .toLocaleLowerCase('tr-TR')
    .replaceAll('ı', 'i')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const includesAny = (query: string, terms: string[]) =>
  terms.some((term) => query.includes(normalize(term)));

const cvProjects = projects.filter((project) => project.onCv);
const otherProjects = projects.filter((project) => !project.onCv);
const internship = experience[0];

const projectLine = (project: Project) => `${project.name} — ${project.summary}`;
const cards = (ids: string[]) => {
  const { links, attachments } = resolveCards(ids);
  return {
    links: links.length ? links : undefined,
    attachments: attachments.length ? attachments : undefined,
  };
};

export const welcomeReply: ChatReply = {
  eyebrow: 'RESUME ASSISTANT',
  title: 'Hello — I’m Çağatay’s interactive résumé.',
  text: 'Ask me about his projects, his networking internship, technical skills, education, volunteering, or what roles he’s looking for. You can also open his CV right here.',
  ...cards(['cv']),
};

export const quickQuestions = [
  'Show all of his projects',
  'What roles is he looking for?',
  'Tell me about his Bilgitürk internship',
  'Show all documents',
];

const replies = {
  intro: (): ChatReply => ({
    eyebrow: 'PROFILE',
    title: 'Software development, networking, and accessible mobile AI.',
    text: profile.summary,
    bullets: profile.highlights,
  }),

  projects: (): ChatReply => ({
    eyebrow: 'PROJECTS',
    title: `${projects.length} projects, from full-stack web apps to mobile AI.`,
    text: `${cvProjects.map((project) => project.name).join(' and ')} are featured on his CV; the rest are on GitHub.`,
    bullets: projects.map(projectLine),
    ...cards(projects.map((project) => project.id)),
  }),

  cvProjects: (): ChatReply => ({
    eyebrow: 'FEATURED ON THE CV',
    title: 'Two projects with distinct technical scopes.',
    text: `His CV features ${cvProjects.map((project) => (project.team ? `${project.name} (${project.team.toLowerCase()})` : project.name)).join(' and ')}.`,
    bullets: cvProjects.map(projectLine),
    ...cards(cvProjects.map((project) => project.id)),
  }),

  otherProjects: (): ChatReply => ({
    eyebrow: 'MORE ON GITHUB',
    title: 'More work beyond the two CV projects.',
    text: 'These public projects aren’t on his CV but show more of his range.',
    bullets: otherProjects.map(projectLine),
    ...cards(otherProjects.map((project) => project.id)),
  }),

  project: (project: Project): ChatReply => ({
    eyebrow: `${project.onCv ? 'FEATURED PROJECT' : 'GITHUB PROJECT'} · ${project.stack.split(' · ')[0].toUpperCase()}`,
    title: `${project.name}.`,
    text: project.team ? `${project.summary}. ${project.team}.` : `${project.summary}.`,
    bullets: project.details.length ? project.details : undefined,
    ...cards([project.id]),
  }),

  skills: (): ChatReply => ({
    eyebrow: 'TECHNICAL SKILLS',
    title: 'Application development backed by networking fundamentals.',
    text: `His skills span ${skills.map((group) => group.area.toLowerCase()).join(', ')}.`,
    bullets: skills.map((group) => `${group.area}: ${group.items.join(', ')}`),
  }),

  education: (): ChatReply => ({
    eyebrow: 'EDUCATION',
    title: `${profile.education.school} (${profile.education.shortSchool}).`,
    text: `${profile.education.degree}, ${profile.education.years}, graduating in ${profile.education.graduation}. ${profile.education.standing}.`,
  }),

  internship: (): ChatReply => ({
    eyebrow: 'INTERNSHIP',
    title: `${internship.org} · ${internship.dates}.`,
    text: internship.summary,
    bullets: internship.details,
  }),

  experience: (): ChatReply => ({
    eyebrow: 'EXPERIENCE',
    title: 'Networking, systems, team coordination, and customer relations.',
    text: experience.map((item) => `${item.org}: ${item.summary}`).join(' '),
    bullets: experience.map((item) => `${item.org} · ${item.role} · ${item.dates}`),
  }),

  volunteering: (): ChatReply => ({
    eyebrow: 'VOLUNTEERING',
    title: 'Long-running involvement with ÇYDD and coding education.',
    text: volunteering[0].text + '.',
    bullets: volunteering.slice(1).map((item) => item.text),
    ...cards(volunteering.flatMap((item) => (item.document ? [item.document] : []))),
  }),

  documents: (): ChatReply => ({
    eyebrow: 'DOCUMENTS',
    title: 'His CV and certificates.',
    text: 'Open or download his one-page English CV and the certificates behind his volunteering work.',
    ...cards(documents.map((document) => document.id)),
  }),

  languages: (): ChatReply => ({
    eyebrow: 'LANGUAGES',
    title: languages.map((language) => language.name).join(', ') + '.',
    text: languages.map((language) => `${language.name}: ${language.level}`).join(' · '),
  }),

  interests: (): ChatReply => ({
    eyebrow: 'BEYOND WORK',
    title: 'Curious, outdoors-oriented, and technology-aware.',
    text: `His interests include ${interests.slice(0, -1).join(', ')}, and ${interests.at(-1)}.`,
  }),

  contact: (): ChatReply => ({
    eyebrow: 'CONTACT',
    title: 'Get in touch directly.',
    text: 'Çağatay can be reached by email or phone, and his public work is on GitHub.',
    ...cards(['email', 'phone', 'github']),
  }),

  strengths: (): ChatReply => ({
    eyebrow: 'SUMMARY',
    title: 'Why Çağatay stands out.',
    text: 'He combines application development with hands-on infrastructure work.',
    bullets: profile.highlights,
  }),

  availability: (): ChatReply => ({
    eyebrow: 'LOOKING FOR',
    title: profile.seeking.badge + '.',
    text: `${profile.seeking.now}; ${profile.seeking.later.charAt(0).toLowerCase()}${profile.seeking.later.slice(1)}. ${profile.seeking.location}.`,
    ...cards(['email']),
  }),

  fallback: (): ChatReply => ({
    eyebrow: 'TRY ANOTHER QUESTION',
    title: 'I don’t have an answer for that one.',
    text: 'Try asking about his projects, the Bilgitürk internship, skills, education, languages, volunteering, what he’s looking for, or his documents. For anything else, email Çağatay directly.',
    ...cards(['email']),
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

  if (includesAny(query, ['available', 'availability', 'looking for', 'start date', 'part-time', 'part time', 'full-time', 'full time', 'relocat', 'location', 'remote', 'open to', 'musait', 'ariyor'])) {
    return replies.availability();
  }

  if (query === 'cv' || includesAny(query, ['document', 'certificate', 'proof', 'download', 'resume', 'belge', 'sertifika', 'ozgecmis'])) {
    return replies.documents();
  }

  if (includesAny(query, ['volunteer', 'social impact', 'social responsibility', 'cydd', 'kodlamaca', 'mentorship', 'mentor', 'koyde', 'gonullu', 'sosyal sorumluluk'])) {
    return replies.volunteering();
  }

  if (includesAny(query, ['bilgiturk', 'networking intern', 'systems intern', 'internship', 'staj', 'vlan', 'etherchannel', 'ospf', 'fortigate', 'ipsec'])) {
    return replies.internship();
  }

  const project = projects.find((item) => includesAny(query, item.keywords));
  if (project) return replies.project(project);

  if (includesAny(query, ['selected project', 'cv project', 'projects on the cv', 'projects in the cv', 'featured project'])) {
    return replies.cvProjects();
  }

  if (includesAny(query, ['more project', 'other project', 'additional project', 'beyond the cv', 'not on the cv', 'github project'])) {
    return replies.otherProjects();
  }

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
    return replies.interests();
  }

  if (includesAny(query, ['strength', 'why hire', 'stand out', 'good fit', 'candidate', 'guclu', 'neden'])) {
    return replies.strengths();
  }

  return replies.fallback();
}
