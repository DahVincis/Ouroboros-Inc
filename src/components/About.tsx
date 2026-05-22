import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: '6', label: 'Projects Built' },
  { value: '2', label: 'Developers' },
  { value: '3+', label: 'Years Experience' },
  { value: '∞', label: 'Reliability' },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 px-6 lg:px-12 border-t border-black/10 dark:border-ob-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="section-label mb-4">About Us</p>
            <h2 className="section-title text-ob-black dark:text-ob-white mb-8">
              Built to last.<br />
              <span className="text-cream">Engineered to scale.</span>
            </h2>
            <div className="space-y-4 text-ob-muted leading-relaxed">
              <p>
                Ouroboros Studios is a software development studio founded by Pedro Fernandes and Kelvyn Luciano.
                We build web applications, desktop tools, and digital products for businesses that demand quality
                and reliability above all else.
              </p>
              <p>
                Our name reflects our philosophy — a cycle of continuous improvement, where every project
                informs the next. We don't just ship code; we craft experiences that stand the test of time.
              </p>
              <p>
                From a local services PWA to a real-time audio control desktop app, our portfolio spans
                industries and platforms. Whatever the challenge, we bring the same level of craft and
                commitment to every build.
              </p>
            </div>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-black/10 dark:border-ob-border bg-white/50 dark:bg-ob-panel p-8 flex flex-col gap-2"
              >
                <span className="text-5xl font-bold text-cream">{stat.value}</span>
                <span className="text-sm text-ob-muted tracking-wide">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
