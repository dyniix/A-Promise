import { useRef, useEffect, useState, useCallback, lazy, Suspense, memo } from 'react'
import { AnimatePresence, useScroll, useTransform, motion } from 'motion/react'
import IntroGate from './components/IntroGate'
import TransitionOverlay from './components/TransitionOverlay'

// separate import functions for manual preloading
const preloadHero = () => import('./components/HeroPage')
const preloadMemories = () => import('./components/MemoriesPage')
const preloadMessage = () => import('./components/MessagePage')
const preloadFinal = () => import('./components/FinalPage')
const preloadNext = () => import('./components/NextPage')

const HeroPage = lazy(preloadHero)
const MemoriesPage = lazy(preloadMemories)
const MessagePage = lazy(preloadMessage)
const FinalPage = lazy(preloadFinal)
const NextPage = lazy(preloadNext)

const LABELS = ['Hey', 'Moments', 'Message', 'Celebrate']
const PAGE_LOADER = <div className="page bg-bg" />

const SectionIndicator = memo(function SectionIndicator({ active, opacity, scale }: { active: number; opacity: any; scale: any }) {
  return (
    <motion.div
      style={{ opacity, scale }}
      className="fixed top-5 right-5 z-50 flex items-center gap-3 pointer-events-none"
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
  )
})

export default function App() {
  const [entered, setEntered] = useState(false)
  const [nextState, setNextState] = useState<'hidden' | 'preparing' | 'revealed'>('hidden')
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [scrollStarted, setScrollStarted] = useState(false)

  useEffect(() => {
    if (nextState !== 'hidden') return
    const sections = document.querySelectorAll('.page')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.getAttribute('data-index')))
            if (!scrollStarted) setScrollStarted(true)
          }
        }
      },
      { threshold: 0.4 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [nextState, scrollStarted])

  // page streaming — preload next page chunk when current page becomes active
  useEffect(() => {
    if (nextState !== 'hidden') return
    const preloaders = [preloadHero, preloadMemories, preloadMessage, preloadFinal]
    if (active < preloaders.length - 1) {
      preloaders[active + 1]()
    }
  }, [active, nextState])

  const { scrollYProgress } = useScroll({ container: containerRef })
  const opacity = useTransform(scrollYProgress, [0.95, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0.95, 1], [1, 0.92])

  const handleContinue = useCallback(() => setNextState('preparing'), [])
  const handleReveal = useCallback(() => setNextState('revealed'), [])
  const handleBack = useCallback(() => setNextState('hidden'), [])

  return (
    <>
      <AnimatePresence>
        {!entered && <IntroGate onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      <div className="relative bg-bg">
        {nextState === 'hidden' && (
          <SectionIndicator active={active} opacity={opacity} scale={scale} />
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'opacity' }}
        >
        {nextState === 'hidden' && (
          <div
            ref={containerRef}
            className="h-dvh snap-y snap-mandatory hide-scrollbar overflow-y-auto"
            style={{ willChange: 'scroll-position' }}
          >
            <div data-index={0} className="snap-start" style={{ scrollSnapStop: 'always' }}>
              <Suspense fallback={PAGE_LOADER}><HeroPage /></Suspense>
            </div>
            <div data-index={1} className="snap-start" style={{ scrollSnapStop: 'always' }}>
              <Suspense fallback={PAGE_LOADER}><MemoriesPage /></Suspense>
            </div>
            <div data-index={2} className="snap-start" style={{ scrollSnapStop: 'always' }}>
              <Suspense fallback={PAGE_LOADER}><MessagePage /></Suspense>
            </div>
            <div data-index={3} className="snap-start" style={{ scrollSnapStop: 'always' }}>
              <Suspense fallback={PAGE_LOADER}>
                <FinalPage onContinue={handleContinue} />
              </Suspense>
            </div>
          </div>
        )}
        </motion.div>

        {nextState === 'preparing' && (
          <TransitionOverlay onReveal={handleReveal} />
        )}

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
              <Suspense fallback={null}>
                <NextPage onBack={handleBack} />
              </Suspense>
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
