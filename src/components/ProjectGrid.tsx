import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import { projects, type Project } from '../data/projects'

export default function ProjectGrid() {
  const [selected, setSelected] = useState<Project | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="work" className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="section-label mb-4">Portfolio</p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="section-title text-ob-black dark:text-ob-white">
              Our Work
            </h2>
            <p className="text-sm text-ob-muted max-w-sm leading-relaxed">
              A selection of projects spanning web applications, desktop tools, and progressive web apps.
            </p>
          </div>
          <div className="mt-6 h-px bg-gradient-to-r from-cream/40 via-cream/20 to-transparent" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
