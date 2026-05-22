export interface Project {
  id: string
  name: string
  description: string
  longDescription: string
  iframeUrl: string | null
  liveUrl: string | null
  screenshot: string | null
  youtubeId: string | null
  tech: string[]
  type: 'web' | 'desktop' | 'pwa'
  github: string
  gradient: string
}

export const projects: Project[] = [
  {
    id: 'lucianos-services',
    name: "Luciano's Services",
    description: 'Professional PWA for a services business with parallax scrolling, carousels, and Google Maps.',
    longDescription:
      'A fully responsive Progressive Web Application built for a local services company. Features parallax scrolling, image carousels, Google Maps integration, particle animations, and smooth scroll reveals.',
    iframeUrl: 'https://941fd915.lucianos-services-web-app.pages.dev/',
    liveUrl: 'https://941fd915.lucianos-services-web-app.pages.dev/',
    screenshot: '/screenshots/lucianos-services.jpg',
    youtubeId: null,
    tech: ['React', 'PWA', 'Google Maps', 'AWS S3'],
    type: 'pwa',
    github: 'https://github.com/Kelvinluciano312/Lucianos-Services-Web-App',
    gradient: 'from-[#0F2027] via-[#203A43] to-[#2C5364]',
  },
  {
    id: 'tusky-app',
    name: 'Tusky App',
    description: 'Financial dashboard with Plaid integration for secure bank account linking and transaction management.',
    longDescription:
      'A modern financial dashboard built with React and TypeScript. Integrates Plaid for secure bank account linking and transaction tracking, with Clerk handling authentication and session management.',
    iframeUrl: null,
    liveUrl: null,
    screenshot: null,
    youtubeId: null,
    tech: ['React', 'TypeScript', 'Plaid', 'Clerk', 'Vite'],
    type: 'web',
    github: 'https://github.com/Kelvinluciano312/Tusky-App',
    gradient: 'from-[#0D1B2A] via-[#1B3A4B] to-[#1A4A5A]',
  },
  {
    id: 'project-special',
    name: 'Special Finishes',
    description: 'Showcase website for a specialty finishes company featuring interactive product carousels.',
    longDescription:
      'A React-based showcase website for a specialty finishes company. Features smooth carousels, intersection observer-driven lazy loading, and a clean presentation of the full product catalog.',
    iframeUrl: null,
    liveUrl: null,
    screenshot: null,
    youtubeId: null,
    tech: ['React', 'React Slick', 'CSS Animations'],
    type: 'web',
    github: 'https://github.com/DahVincis/Project-Special',
    gradient: 'from-[#1A0A00] via-[#3D1F00] to-[#5C3300]',
  },
  {
    id: 'stolochi',
    name: 'Stolochi - Makeup & Hair',
    description: 'Next.js business site for a makeup and hair studio with Google Calendar booking and email integration.',
    longDescription:
      'A polished Next.js 14 business website for a makeup and hair studio. Includes Google Calendar API for booking, email notifications via Resend, and a curated service showcase with TypeScript and Tailwind CSS.',
    iframeUrl: null,
    liveUrl: null,
    screenshot: null,
    youtubeId: null,
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Resend', 'Google APIs'],
    type: 'web',
    github: 'https://github.com/DahVincis/Stolochi_MakeupAndHair',
    gradient: 'from-[#1A0010] via-[#3D0028] to-[#5C003C]',
  },
  {
    id: 'lagoinhaçt',
    name: 'LagoinhaCT',
    description: 'Full-stack app with user auth, file uploads, image processing, and MySQL-backed data management.',
    longDescription:
      'A collaborative full-stack application built with Express.js and MySQL. Features Passport.js authentication, session management, Multer file uploads, Sharp image processing, and an admin control panel.',
    iframeUrl: null,
    liveUrl: null,
    screenshot: null,
    youtubeId: null,
    tech: ['Node.js', 'Express', 'MySQL', 'Passport.js', 'Multer'],
    type: 'web',
    github: 'https://github.com/DahVincis/LagoinhaCT',
    gradient: 'from-[#0F0527] via-[#261748] to-[#3D2070]',
  },
  {
    id: 'audiopilot',
    name: 'AudioPilot',
    description: 'Desktop app for real-time audio mixer control via OSC with parametric EQ and live RTA display.',
    longDescription:
      'A PyQt6 desktop application for controlling professional audio mixing consoles in real time. Features a full mixer GUI, parametric EQ, Real-Time Analyzer (RTA) visualization, pitch correction, and OSC protocol communication. Packaged as a standalone Windows executable.',
    iframeUrl: null,
    liveUrl: null,
    screenshot: null,
    youtubeId: 'NkdS8KENr0k',
    tech: ['Python', 'PyQt6', 'OSC Protocol', 'NumPy', 'PyInstaller'],
    type: 'desktop',
    github: 'https://github.com/DahVincis/AudioPilot',
    gradient: 'from-[#0A0A0A] via-[#1A1A2E] to-[#16213E]',
  },
]
