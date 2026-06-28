import { useRef, useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { useScroll, useTransform, motion } from 'motion/react'
import IntroGate from './components/IntroGate'
import HeroPage from './components/HeroPage'
import MemoriesPage from './components/MemoriesPage'
import MessagePage from './components/MessagePage'
import FinalPage from './components/FinalPage'

function useSectionIndicator() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const sections = document.querySelectorAll('.page')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.getAttribute('data-index')))
          }
        }
      },
      { threshold: 0.4 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])
  return active
}

const LABELS = ['Hey', 'Moments', 'Message', 'Celebrate']

export default function App() {
  const [entered, setEntered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const active = useSectionIndicator()
  const { scrollYProgress } = useScroll({ container: containerRef })
  const opacity = useTransform(scrollYProgress, [0.95, 1], [1, 0])

  return (
    <>
      <AnimatePresence>
        {!entered && <IntroGate onEnter={() => setEntered(true)} />}
      </AnimatePresence>

    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* section indicator */}
      <motion.div
        style={{ opacity }}
        className="fixed top-5 right-5 z-50 flex items-center gap-3"
      >
        <div className="flex items-center gap-1.5">
          {LABELS.map((_label, i) => (
            <div
              key={i}
              className={`h-0.5 rounded-full transition-all duration-700 ${
                i === active
                  ? 'w-6 bg-gradient-to-r from-pink/60 to-sky/60'
                  : 'w-1.5 bg-white/10'
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-[6px] uppercase tracking-[0.3em] text-white/20">
          {LABELS[active]}
        </span>
      </motion.div>

      {/* pages */}
      <div
        ref={containerRef}
        className="h-dvh overflow-y-auto snap-y snap-mandatory hide-scrollbar"
      >
        <div data-index={0} className="snap-start">
          <HeroPage />
        </div>
        <div data-index={1} className="snap-start">
          <MemoriesPage />
        </div>
        <div data-index={2} className="snap-start">
          <MessagePage />
        </div>
        <div data-index={3} className="snap-start">
          <FinalPage />
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </motion.div>
    </>
  )
}
