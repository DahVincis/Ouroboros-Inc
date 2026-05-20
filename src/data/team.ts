export interface TeamMember {
  name: string
  firstName: string
  role: string
  bio: string
  photo: string
  links: {
    github: string
    linkedin: string
    email: string
  }
  skills: string[]
}

export const team: TeamMember[] = [
  {
    name: 'Kelvyn Luciano',
    firstName: 'Kelvyn',
    role: 'Full-Stack Developer',
    bio: "Creative technologist with a sharp eye for design and usability. Kelvyn specializes in building modern, polished web experiences - from responsive PWAs to full-featured production apps - always focused on the end user.",
    photo: '/team-photos/kelvyn.jpg',
    links: {
      github: 'https://github.com/Kelvinluciano312',
      linkedin: 'https://www.linkedin.com/in/kelvyn-luciano/',
      email: 'ouroboros2043@gmail.com',
    },
    skills: ['React', 'Next.js', 'TypeScript', 'AWS', 'UI/UX'],
  },
  {
    name: 'Pedro Henrique Fernandes',
    firstName: 'Pedro',
    role: 'Full-Stack Developer',
    bio: "Passionate about building seamless, high-performance digital products from concept to deployment. Pedro brings experience across web, desktop, and cloud - with a focus on clean architecture and developer tooling.",
    photo: '/team-photos/pedro.jpg',
    links: {
      github: 'https://github.com/DahVincis',
      linkedin: 'https://www.linkedin.com/in/dahvincis/',
      email: 'ouroboros2043@gmail.com',
    },
    skills: ['React', 'TypeScript', 'Python', 'Node.js', 'AWS'],
  },
]
