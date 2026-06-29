import { motion, AnimatePresence } from 'motion/react'
import { useState, useCallback, memo } from 'react'
import ScrollDown from './ScrollDown'
import { useIsMobile } from '../hooks/useIsMobile'

interface Memory {
  id: number
  title: string
  text: string
  icon: string
}

const MEMORIES: Memory[] = [
  {
    id: 1,
    title: 'Memory One',
    text: 'This is where a memory will go. Something that matters.',
    icon: '\u2726',
  },
  {
    id: 2,
    title: 'Memory Two',
    text: 'This is where another memory will go. Replace this text.',
    icon: '\u2727',
  },
  {
    id: 3,
    title: 'Memory Three',
    text: 'One more memory slot. Fill when ready.',
    icon: '\u2606',
  },
]

const NavButton = memo(function NavButton({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className={`w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.08] ${
        direction === 'prev'
          ? 'text-white/30 hover:text-pink/70 hover:border-pink/30 active:text-pink/70 active:border-pink/30 transition-colors duration-500 ease-premium'
          : 'text-white/30 hover:text-sky/70 hover:border-sky/30 active:text-sky/70 active:border-sky/30 transition-colors duration-500 ease-premium'
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={direction === 'prev' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
      </svg>
    </motion.button>
  )
})

function MemoryCard({ memory, isMobile: mobile }: { memory: Memory; isMobile: boolean }) {
  return (
    <motion.div
      initial={mobile ? { opacity: 0, y: 10, scale: 0.96 } : { opacity: 0, y: 15, filter: 'blur(5px)' }}
      animate={mobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={mobile ? { opacity: 0, y: -10, scale: 0.96 } : { opacity: 0, y: -15, filter: 'blur(5px)' }}
      transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-2xl p-8 md:p-10 w-full text-center"
    >
      <span className="text-3xl md:text-4xl text-pink/60 block mb-4">{memory.icon}</span>
      <h3 className="font-display text-lg md:text-xl text-white/80 italic mb-3">{memory.title}</h3>
      <p className="font-sans text-sm text-white/40 leading-relaxed">{memory.text}</p>
    </motion.div>
  )
}

export default function MemoriesPage() {
  const isMobile = useIsMobile()
  const [active, setActive] = useState(0)
  const [locked, setLocked] = useState(false)

  const prev = useCallback(() => {
    if (locked) return
    setLocked(true)
    setActive((a) => (a === 0 ? MEMORIES.length - 1 : a - 1))
    setTimeout(() => setLocked(false), 800)
  }, [locked])
  const next = useCallback(() => {
    if (locked) return
    setLocked(true)
    setActive((a) => (a === MEMORIES.length - 1 ? 0 : a + 1))
    setTimeout(() => setLocked(false), 800)
  }, [locked])

  return (
    <section className="page relative bg-bg">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(244,114,182,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-lg mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-60px' }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.35em] text-sky/40 mb-2"
        >
          Some Moments
        </motion.span>

        <motion.h2
          initial={isMobile ? { opacity: 0, y: 14 } : { opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ margin: '-60px' }}
          transition={{ duration: 1.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(1.8rem,5vw,3rem)] text-white/90 italic tracking-wider mb-10"
        >
          Little <span className="text-pink/70">Memories</span>
        </motion.h2>

        {/* memory card — delayed slightly after heading */}
        <div className="w-full relative min-h-[280px] md:min-h-[320px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <MemoryCard key={MEMORIES[active].id} memory={MEMORIES[active]} isMobile={isMobile} />
          </AnimatePresence>
        </div>

        {/* navigation */}
        <div className="flex items-center gap-3 mt-8">
          <NavButton direction="prev" onClick={prev} />
          <div className="flex items-center gap-2">
            {MEMORIES.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => { if (!locked) { setLocked(true); setActive(i); setTimeout(() => setLocked(false), 800) } }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                className={`rounded-full cursor-pointer ${
                  i === active ? 'w-5 h-1.5 bg-gradient-to-r from-pink/70 to-sky/70' : 'w-1.5 h-1.5 bg-white/15'
                }`}
              />
            ))}
          </div>
          <NavButton direction="next" onClick={next} />
        </div>
      </div>
      <ScrollDown current={1} />
    </section>
  )
}
