import { useRef, useEffect, useState, useCallback } from 'react'
import { AnimatePresence, useScroll, useTransform, motion } from 'motion/react'
import IntroGate from './components/IntroGate'
import HeroPage from './components/HeroPage'
import MemoriesPage from './components/MemoriesPage'
import MessagePage from './components/MessagePage'
import FinalPage from './components/FinalPage'
import NextPage from './components/NextPage'
import TransitionOverlay from './components/TransitionOverlay'

const LABELS = ['Hey', 'Moments', 'Message', 'Celebrate']

export default function App() {
  const [entered, setEntered] = useState(false)
  const [nextState, setNextState] = useState<'hidden' | 'preparing' | 'revealed'>('hidden')
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // observe .page sections — re-runs when pages (re)mount via nextState
  useEffect(() => {
    if (nextState !== 'hidden') return
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
  }, [nextState])
  const { scrollYProgress } = useScroll({ container: containerRef })
  const opacity = useTransform(scrollYProgress, [0.95, 1], [1, 0])

  const handleContinue = useCallback(() => {
    setNextState('preparing')
  }, [])

  const handleReveal = useCallback(() => {
    setNextState('revealed')
  }, [])

  const handleBack = useCallback(() => {
    setNextState('hidden')
  }, [])

  return (
    <>
      <AnimatePresence>
        {!entered && <IntroGate onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      <div className="relative bg-bg">
        {/* section indicator — only visible during normal browsing */}
        {nextState === 'hidden' && (
          <motion.div
            style={{ opacity }}
            className="fixed top-5 right-5 z-50 flex items-center gap-3"
          >
            <div className="flex items-center gap-1.5">
              {LABELS.map((_label, i) => (
                <div
                  key={i}
                  className={`h-0.5 rounded-full transition-all duration-700 ease-premium ${
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
        )}

        {/* pages — only rendered during normal browsing */}
        {nextState === 'hidden' && (
          <div
            ref={containerRef}
            className="h-dvh snap-y snap-mandatory hide-scrollbar overflow-y-auto"
          >
            <div data-index={0} className="snap-start" style={{ scrollSnapStop: 'always' }}>
              <HeroPage />
            </div>
            <div data-index={1} className="snap-start" style={{ scrollSnapStop: 'always' }}>
              <MemoriesPage />
            </div>
            <div data-index={2} className="snap-start" style={{ scrollSnapStop: 'always' }}>
              <MessagePage />
            </div>
            <div data-index={3} className="snap-start" style={{ scrollSnapStop: 'always' }}>
              <FinalPage onContinue={handleContinue} />
            </div>
          </div>
        )}

        {/* transition overlay — only during preparing */}
        {nextState === 'preparing' && (
          <TransitionOverlay onReveal={handleReveal} />
        )}

        {/* NextPage — only during revealed */}
        <AnimatePresence>
          {nextState === 'revealed' && (
            <motion.div
              key="next-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[200]"
            >
              <NextPage onBack={handleBack} />
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </>
  )
}
