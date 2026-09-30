export const navLinks = [
  { href: "/", label: "Home", index: "01" },
  { href: "/about", label: "About", index: "02" },
  { href: "/builds", label: "Builds", index: "03" },
  { href: "/community", label: "Community", index: "04" },
] as const;

export const connectLinks = [
  { label: "Instagram" },
  { label: "LinkedIn" },
  { label: "GitHub" },
  { label: "Discord" },
] as const;

export type DocumentBlock = {
  id: string;
  index: string;
  title: string;
  body: string;
};

export const aboutBlocks: DocumentBlock[] = [
  {
    id: "story",
    index: "01",
    title: "Our story",
    body: "The history of AWS Student Builders Group will be written here — why it started, what it refused to become, and the work that shaped it. This is a placeholder until that account is provided.",
  },
  {
    id: "founder",
    index: "02",
    title: "The founder",
    body: "A portrait and biography of the founder will live in this section. No name is shown, because one has not been provided.",
  },
  {
    id: "team",
    index: "03",
    title: "The team",
    body: "Leadership and the people who keep the work moving will be listed here once they are confirmed. No members are invented in the meantime.",
  },
  {
    id: "philosophy",
    index: "04",
    title: "Our philosophy",
    body: "How the group decides, what “shipped” means, and what the community protects will be spelled out here. The principles themselves are still to be written.",
  },
  {
    id: "community",
    index: "05",
    title: "The community",
    body: "Who the group is for, how people join the work, and what participation looks like will be documented here. Those details have not been published yet.",
  },
];

export const buildBlocks: DocumentBlock[] = [
  {
    id: "current",
    index: "01",
    title: "Current builds",
    body: "Active projects — what is being made, what it runs on, and who can try it — will be recorded here. Nothing is listed yet.",
  },
  {
    id: "archive",
    index: "02",
    title: "Archive",
    body: "Finished and abandoned experiments will sit here so the work stays visible after the demo ends. The archive is empty until real projects are added.",
  },
  {
    id: "start",
    index: "03",
    title: "How a build starts",
    body: "The path from a rough idea to a repository, a deploy, and a postmortem will be explained here. The process has not been written down yet.",
  },
];

export const communityBlocks: DocumentBlock[] = [
  {
    id: "gatherings",
    index: "01",
    title: "Gatherings",
    body: "Sessions, build nights, and reviews will be announced here. No dates are listed because none have been supplied.",
  },
  {
    id: "channels",
    index: "02",
    title: "Channels",
    body: "Discord, GitHub, and the other rooms where the work actually happens will be linked here once those destinations exist.",
  },
  {
    id: "join",
    index: "03",
    title: "How to take part",
    body: "What joining looks like — and what is expected after that — will be explained here. Membership details are still pending.",
  },
];
