import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { X, Github, ExternalLink, Loader2, ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [loading, setLoading] = useState(true)
  const [thumbError, setThumbError] = useState(false)

  const isOpen = project !== null

  const handleOpen = () => {
    setLoading(true)
    setThumbError(false)
  }

  if (!project) return null

  const embedUrl = project.youtubeId
    ? `https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&rel=0&modestbranding=1`
    : project.iframeUrl

  const externalUrl = project.liveUrl ?? project.iframeUrl ?? null

  const thumbUrl = project.screenshot ?? null

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" />
        </TransitionChild>

        {/* Modal panel */}
        <div className="fixed inset-0 flex items-center justify-center p-2 md:p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-400"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
            afterEnter={handleOpen}
          >
            <DialogPanel className="w-full max-w-7xl h-[95vh] bg-ob-dark border border-ob-border rounded-2xl overflow-hidden flex flex-col shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-ob-border flex-shrink-0">
                <div className="flex items-center gap-4">
                  <h2 className="text-base font-semibold text-ob-white">{project.name}</h2>
                  <div className="hidden sm:flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono tracking-wide text-cream/70 bg-cream/10 border border-cream/20 rounded-full px-2 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-ob-muted hover:text-ob-white hover:bg-white/10 transition-colors"
                    aria-label="View on GitHub"
                  >
                    <Github size={16} />
                  </a>
                  {externalUrl && (
                    <a
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-ob-muted hover:text-ob-white hover:bg-white/10 transition-colors"
                      aria-label="Open in new tab"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg text-ob-muted hover:text-ob-white hover:bg-white/10 transition-colors"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="relative flex-1 min-h-0">
                {embedUrl ? (
                  /* Embeddable iframe (YouTube or direct embed) */
                  <>
                    {loading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-ob-dark z-10">
                        <Loader2 size={32} className="text-cream animate-spin" />
                      </div>
                    )}
                    <iframe
                      key={project.id}
                      src={embedUrl}
                      title={project.name}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      onLoad={() => setLoading(false)}
                    />
                  </>
                ) : project.liveUrl ? (
                  /* Live site — blocked from embedding, show screenshot preview */
                  <div className="absolute inset-0 flex flex-col">
                    {/* Screenshot */}
                    <div className="relative flex-1 min-h-0 overflow-hidden">
                      {!thumbError && thumbUrl ? (
                        <>
                          {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-ob-dark z-10">
                              <Loader2 size={32} className="text-cream animate-spin" />
                            </div>
                          )}
                          <img
                            src={thumbUrl}
                            alt={`${project.name} screenshot`}
                            className="w-full h-full object-cover object-top"
                            onLoad={() => setLoading(false)}
                            onError={() => { setThumbError(true); setLoading(false) }}
                          />
                        </>
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`} />
                      )}
                      {/* Overlay blur at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ob-dark to-transparent" />
                    </div>

                    {/* CTA bar */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-4 px-8 py-8 bg-ob-dark border-t border-ob-border">
                      <p className="text-sm text-ob-muted text-center max-w-lg leading-relaxed">
                        {project.longDescription}
                      </p>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold tracking-widest uppercase bg-cream text-ob-black hover:bg-cream/90 transition-colors rounded-full px-6 py-3"
                      >
                        Open Live Site
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Coming soon */
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-ob-dark">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                      <span className="text-3xl font-bold text-white">{project.name[0]}</span>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-ob-white mb-2">{project.name}</h3>
                      <p className="text-sm text-ob-muted max-w-md leading-relaxed">
                        {project.longDescription}
                      </p>
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase bg-cream text-ob-black hover:bg-cream/90 transition-colors rounded-full px-5 py-2.5"
                    >
                      <Github size={13} />
                      View on GitHub
                    </a>
                    <p className="text-xs text-ob-muted font-mono tracking-wider">
                      — Live demo coming soon —
                    </p>
                  </div>
                )}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}
