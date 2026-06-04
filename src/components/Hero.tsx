import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, #C8B49A 1px, transparent 1px),
                            linear-gradient(to bottom, #C8B49A 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(200, 180, 154, 0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <img
            src="/logo.png"
            alt="Ouroboros Studios"
            className="w-36 h-36 md:w-48 md:h-48 object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Company name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label mb-4">Est. 2024</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] text-ob-black dark:text-ob-white leading-none">
            OUROBOROS
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] text-cream leading-none">
            STUDIOS
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-base md:text-lg text-ob-muted dark:text-ob-muted tracking-[0.2em] uppercase font-light"
        >
          Infinitely Reliable
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 w-px h-16 bg-gradient-to-b from-cream to-transparent mx-auto"
        />

        {/* CTA */}
        <motion.a
          href="#work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 flex flex-col items-center gap-2 text-xs text-ob-muted dark:text-ob-muted tracking-widest uppercase hover:text-cream transition-colors duration-300 group"
        >
          <span>View Our Work</span>
          <ChevronDown
            size={14}
            className="animate-bounce group-hover:text-cream transition-colors"
          />
        </motion.a>
      </div>
    </section>
  )
}
