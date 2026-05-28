import { motion } from 'framer-motion'
import { Globe, Monitor, Smartphone, Github, Play } from 'lucide-react'
import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
  onClick: () => void
  index: number
}

const typeIcons = {
  web: Globe,
  desktop: Monitor,
  pwa: Smartphone,
}

const typeLabels = {
  web: 'Web App',
  desktop: 'Desktop',
  pwa: 'PWA',
}

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const Icon = typeIcons[project.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3]"
      onClick={onClick}
    >
      {/* Background: logo, screenshot, or gradient */}
      {project.cardLogo ? (
        <>
          {/* Gradient base layer fills letterbox gaps around contained logo */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
          <div
            className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.cardLogo})` }}
          />
        </>
      ) : project.screenshot ? (
        <>
          {/* Gradient base layer — fills letterbox gaps for bg-contain desktop cards */}
          {project.type === 'desktop' && (
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
          )}
          <div
            className={`absolute inset-0 transition-transform duration-700 group-hover:scale-105 ${project.type === 'desktop' ? 'bg-contain bg-no-repeat bg-center' : 'bg-cover bg-top'}`}
            style={{ backgroundImage: `url(${project.screenshot})` }}
          />
        </>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 group-hover:scale-105`} />
      )}

      {/* Subtle dark overlay so text stays readable over screenshots */}
      {(project.cardLogo || project.screenshot) && (
        <div className="absolute inset-0 bg-black/30" />
      )}

      {/* Grid overlay texture */}
      {!project.cardLogo && !project.screenshot && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      )}

      {/* Default state content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between transition-opacity duration-300 group-hover:opacity-0">
        {/* Type badge */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-white/50 border border-white/20 rounded-full px-3 py-1">
            <Icon size={10} />
            {typeLabels[project.type]}
          </span>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Github size={13} className="text-white/70" />
          </a>
        </div>

        {/* Project name */}
        <div>
          <h3 className="text-xl font-bold text-white leading-tight">{project.name}</h3>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-ob-black/85 backdrop-blur-sm p-6 flex flex-col justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-ob-white">{project.name}</h3>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Github size={13} className="text-white/70" />
            </a>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">{project.description}</p>
        </div>

        <div>
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono tracking-wide text-cream/80 bg-cream/10 border border-cream/20 rounded-full px-2.5 py-0.5"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA button */}
          <button className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ob-black bg-cream hover:bg-cream-light transition-colors rounded-full px-5 py-2.5">
            <Play size={11} fill="currentColor" />
            {project.youtubeId ? 'Watch Demo' : 'View Demo'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
