import { Github, Linkedin, Mail } from 'lucide-react'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Team', href: '#team' },
]

const socials = [
  {
    label: 'Pedro -GitHub',
    href: 'https://github.com/DahVincis',
    icon: Github,
  },
  {
    label: 'Kelvyn -GitHub',
    href: 'https://github.com/Kelvinluciano312',
    icon: Github,
  },
  {
    label: 'Pedro -LinkedIn',
    href: 'https://www.linkedin.com/in/dahvincis/',
    icon: Linkedin,
  },
  {
    label: 'Kelvyn -LinkedIn',
    href: 'https://www.linkedin.com/in/kelvyn-luciano/',
    icon: Linkedin,
  },
]

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-black/10 dark:border-ob-border bg-white/30 dark:bg-ob-dark"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Ouroboros Inc." className="h-8 w-8 object-contain" />
              <span className="text-sm font-semibold tracking-widest uppercase text-ob-black dark:text-ob-white">
                Ouroboros Inc.
              </span>
            </div>
            <p className="text-xs text-ob-muted font-mono tracking-[0.2em] uppercase">
              Infinitely Reliable
            </p>
            <p className="text-sm text-ob-muted leading-relaxed mt-2">
              A software development studio crafting reliable digital products.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="section-label mb-5">Navigate</p>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-ob-muted hover:text-ob-black dark:hover:text-ob-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="section-label mb-5">Contact</p>
            <a
              href="mailto:ouroboros2043@gmail.com"
              className="flex items-center gap-2 text-sm text-ob-muted hover:text-cream transition-colors mb-6"
            >
              <Mail size={14} />
              ouroboros2043@gmail.com
            </a>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.href + s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="p-2 rounded-lg border border-black/10 dark:border-ob-border text-ob-muted hover:text-ob-black dark:hover:text-ob-white hover:border-cream/40 dark:hover:border-cream/30 transition-all"
                    title={s.label}
                  >
                    <Icon size={15} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-black/10 dark:border-ob-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ob-muted">
            © {new Date().getFullYear()} Ouroboros Inc. All rights reserved.
          </p>
          <p className="text-xs text-ob-muted font-mono">
            Built with React + Tailwind + Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
