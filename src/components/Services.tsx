import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Globe, Monitor, Palette, Cloud } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Full-stack web applications built with modern frameworks. From MVPs to production-grade platforms, we build fast, accessible, and maintainable.',
  },
  {
    icon: Monitor,
    title: 'Desktop Applications',
    description:
      'Cross-platform desktop apps with native-feeling UIs. Packaged as standalone executables ready for distribution.',
  },
  {
    icon: Palette,
    title: 'UI / UX Design',
    description:
      'Clean, functional interfaces designed with the end user in mind. We prioritize clarity, consistency, and visual polish.',
  },
  {
    icon: Cloud,
    title: 'Cloud & Deployment',
    description:
      "End-to-end deployment pipelines on AWS. S3, CloudFront, EC2, Route 53 - we handle infrastructure so you don't have to.",
  },
]

export default function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-24 px-6 lg:px-12 border-t border-black/10 dark:border-ob-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="section-label mb-4">What We Do</p>
          <h2 className="section-title text-ob-black dark:text-ob-white">Services</h2>
          <div className="mt-6 h-px bg-gradient-to-r from-cream/40 via-cream/20 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl border border-black/10 dark:border-ob-border bg-white/50 dark:bg-ob-panel p-7 hover:border-cream/40 dark:hover:border-cream/30 transition-colors duration-300"
              >
                <div className="mb-5 w-10 h-10 rounded-xl bg-cream/10 border border-cream/20 flex items-center justify-center group-hover:bg-cream/20 transition-colors">
                  <Icon size={18} className="text-cream" />
                </div>
                <h3 className="text-base font-semibold text-ob-black dark:text-ob-white mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-ob-muted leading-relaxed">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
