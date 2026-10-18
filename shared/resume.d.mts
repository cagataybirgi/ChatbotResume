// Types for resume.mjs, so the React app can import the shared data with full type checking.

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

export type Project = {
  id: string;
  name: string;
  onCv: boolean;
  team: string | null;
  stack: string;
  url: string | null;
  summary: string;
  details: string[];
  technologies: string[];
  keywords: string[];
};

export type ExperienceItem = {
  org: string;
  role: string;
  dates: string;
  summary: string;
  details: string[];
};

export type VolunteeringItem = {
  text: string;
  source: 'CV' | 'certificate';
  document?: string;
};

export type DocumentItem = Attachment & {
  id: string;
  description: string;
};

export type LinkCard = LinkItem & { id: string };

export declare const profile: {
  name: string;
  role: string;
  focus: string;
  email: string;
  phone: string;
  phoneHref: string;
  github: string;
  education: {
    degree: string;
    school: string;
    shortSchool: string;
    years: string;
    graduation: string;
    standing: string;
  };
  summary: string;
  highlights: string[];
  seeking: {
    badge: string;
    now: string;
    later: string;
    location: string;
  };
  unknowns: string[];
};

export declare const skills: { area: string; items: string[] }[];
export declare const experience: ExperienceItem[];
export declare const projects: Project[];
export declare const volunteering: VolunteeringItem[];
export declare const languages: { name: string; level: string }[];
export declare const interests: string[];
export declare const documents: DocumentItem[];
export declare const contactCards: LinkCard[];
export declare const linkCards: LinkCard[];
export declare const cardIds: string[];

export declare function resolveCards(ids: readonly string[]): {
  links: LinkItem[];
  attachments: Attachment[];
};
