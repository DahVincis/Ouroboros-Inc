import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { team } from '../data/team'

export default function TeamBios() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="team" className="py-24 px-6 lg:px-12 border-t border-black/10 dark:border-ob-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="section-label mb-4">People</p>
          <h2 className="section-title text-ob-black dark:text-ob-white">The Team</h2>
          <div className="mt-6 h-px bg-gradient-to-r from-cream/40 via-cream/20 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamCard({
  member,
  index,
  inView,
}: {
  member: (typeof team)[0]
  index: number
  inView: boolean
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-black/10 dark:border-ob-border bg-white/50 dark:bg-ob-panel p-8 flex flex-col gap-6 hover:border-cream/40 dark:hover:border-cream/30 transition-colors duration-300"
    >
      {/* Photo + name */}
      <div className="flex items-center gap-5">
        <div className="relative flex-shrink-0">
          {!imgError ? (
            <img
              src={member.photo}
              alt={member.firstName}
              className="w-20 h-20 rounded-2xl object-cover object-top"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-ob-panel to-ob-border flex items-center justify-center">
              <span className="text-2xl font-bold text-cream">{member.firstName[0]}</span>
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cream border-2 border-[#F5F0EB] dark:border-ob-panel" />
        </div>
        <div>
          <h3 className="font-semibold text-ob-black dark:text-ob-white text-base leading-tight">
            {member.name}
          </h3>
          <p className="text-xs text-cream font-mono tracking-wider mt-1">{member.role}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-ob-muted leading-relaxed">{member.bio}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {member.skills.map((skill) => (
          <span
            key={skill}
            className="text-[10px] font-mono tracking-wide text-cream/70 bg-cream/10 border border-cream/20 rounded-full px-2.5 py-0.5"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-2 pt-2 border-t border-black/10 dark:border-ob-border">
        <a
          href={member.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-ob-muted hover:text-ob-black dark:hover:text-ob-white transition-colors px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
        >
          <Github size={14} />
          GitHub
        </a>
        <a
          href={member.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-ob-muted hover:text-ob-black dark:hover:text-ob-white transition-colors px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
        >
          <Linkedin size={14} />
          LinkedIn
        </a>
        <a
          href={`mailto:${member.links.email}`}
          className="flex items-center gap-1.5 text-xs text-ob-muted hover:text-ob-black dark:hover:text-ob-white transition-colors px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
        >
          <Mail size={14} />
          Email
        </a>
      </div>
    </motion.div>
  )
}
