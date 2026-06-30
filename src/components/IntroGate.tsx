import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect, useMemo, useRef } from 'react'
import ShreyaTitle from './ShreyaTitle'
import { useIsMobile } from '../hooks/useIsMobile'
import { useLoadingProgress } from '../hooks/useLoadingProgress'

const PHRASES = [
  'Preparing something special...',
  'Gathering the right words...',
  'Wrapping it with care...',
  'Almost ready...',
]

const LOADING_GRADIENT =
  'linear-gradient(90deg, #FFF8FC 0%, #FCEEF6 33%, #F6F4FA 66%, #EEF7FF 100%)'

interface Particle {
  left: string
  top: string
  size: number
  delay: number
  duration: number
  drift: number
}

function StatusMessage() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx((i) => (i + 1) % PHRASES.length)
        setVisible(true)
      }, 500)
    }, 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="h-4 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.3em] text-white/40"
          >
            {PHRASES[idx]}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

function CornerFrame({ pos, index }: { pos: string; index: number }) {
  const isFirstHalf = index < 4
  return (
    <div className={`absolute ${pos} flex`}>
      {isFirstHalf ? (
        <motion.div
          className="w-6 h-px bg-gradient-to-r from-pink/40 to-sky/40"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.3 + (index % 4) * 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: index % 2 === 0 ? 0 : 1, willChange: 'transform' }}
        />
      ) : (
        <motion.div
          className="w-px h-6 bg-gradient-to-b from-pink/40 to-sky/40"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.3 + (index % 4) * 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ originY: index < 6 ? 0 : 1, willChange: 'transform' }}
        />
      )}
    </div>
  )
}

function CornerFrames() {
  const positions = ['top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8']
  const allCorners = useMemo(() => [...positions, ...positions], [])
  return (
    <div className="absolute inset-0 pointer-events-none">
      {allCorners.map((pos, i) => (
        <CornerFrame key={i} pos={pos} index={i} />
      ))}
    </div>
  )
}

function DustParticle({ p }: { p: Particle }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white/15 pointer-events-none"
      style={{ left: p.left, top: p.top, width: p.size, height: p.size, willChange: 'transform, opacity' }}
      animate={{
        y: [0, p.drift, 0],
        opacity: [0, 0.18, 0],
      }}
      transition={{
        duration: p.duration,
        repeat: Infinity,
        delay: p.delay,
        ease: 'easeInOut',
      }}
    />
  )
}

function LoadingBar({ value, showGlow }: { value: number; showGlow: boolean }) {
  return (
    <div className="relative w-40 md:w-48">
      <div className="h-[1.5px] bg-white/5 overflow-hidden rounded-full">
        <motion.div
          className="h-full origin-left rounded-full"
          style={{
            scaleX: value,
            background: 'linear-gradient(90deg, rgba(244,114,182,0.85), rgba(248,234,244,0.75), rgba(125,211,252,0.85))',
            willChange: 'transform',
          }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-full pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(248,234,244,0.08) 30%, rgba(125,211,252,0.12) 70%, rgba(125,211,252,0.06) 100%)',
            }}
          />
        </motion.div>
      </div>

      {showGlow && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(90deg, rgba(244,114,182,0.12), rgba(248,234,244,0.08), rgba(125,211,252,0.12))',
            filter: 'blur(8px)',
            willChange: 'opacity',
          }}
        />
      )}
    </div>
  )
}

export default function IntroGate({ onEnter }: { onEnter: () => void }) {
  const isMobile = useIsMobile()
  const [scene, setScene] = useState<'intro' | 'open'>('intro')
  const [phase, setPhase] = useState<'booting' | 'shreya'>('booting')
  const shreyaShowAtRef = useRef(0)
  const [fontsReady, setFontsReady] = useState(false)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true))
  }, [])

  const { progress, loadingComplete } = useLoadingProgress({ minDuration: 6000 })
  const fullyReady = loadingComplete && fontsReady
  const barScale = progress / 100

  useEffect(() => {
    if (phase === 'booting' && progress >= 60) {
      setPhase('shreya')
      shreyaShowAtRef.current = Date.now()
    }
  }, [progress, phase])

  useEffect(() => {
    if (phase !== 'shreya' || !fullyReady || scene === 'open') return
    const elapsed = Date.now() - shreyaShowAtRef.current
    const remaining = Math.max(0, 200 - elapsed)
    const t = setTimeout(() => setScene('open'), remaining)
    return () => clearTimeout(t)
  }, [phase, fullyReady, scene])

  useEffect(() => {
    if (scene === 'open') return
    const t = setTimeout(() => setScene('open'), 12000)
    return () => clearTimeout(t)
  }, [scene])

  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: isMobile ? 3 : 6 }, (_, i) => ({
      left: `${15 + (i * 13) % 70}%`,
      top: `${20 + (i * 17) % 60}%`,
      size: 1 + (i % 2),
      delay: i * 1.4,
      duration: 8 + i * 1.2,
      drift: -8 - i * 2,
    })),
  [])

  const openVisible = scene === 'open'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#050508]"
    >
      {/* ── INTRO SCENE ── always mounted, visibility via animate ── */}
      <motion.div
        animate={openVisible ? { opacity: 0, scale: 0.94 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ pointerEvents: openVisible ? 'none' : 'auto' }}
      >
        <CornerFrames />
        <div className="absolute inset-[-50%] flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="absolute w-[60%] h-[80%] bg-pink/[0.025] blur-[120px] rounded-full" />
          <div className="absolute w-[60%] h-[80%] bg-sky/[0.02] blur-[120px] rounded-full" />
        </div>

        {phase === 'shreya' && !openVisible && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p, i) => (
              <DustParticle key={i} p={p} />
            ))}
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center" style={{ height: '304px' }}>
          <div className="flex items-center justify-center overflow-visible" style={{ height: '80px', width: '320px' }}>
            {phase === 'shreya' && (
              <ShreyaTitle
                size="intro"
                delayStart={0.1}
                staggerDelay={0.12}
                gradient={LOADING_GRADIENT}
                glow="subtle"
              />
            )}
          </div>

          <div style={{ height: '10px' }} />

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center" style={{ height: '16px' }}>
              <LoadingBar value={barScale} showGlow={progress >= 80} />
            </div>

            {phase === 'booting' && <StatusMessage />}
          </div>
        </div>
      </motion.div>

      {/* ── OPEN SCENE ── always mounted (pre-rendered), instant appearance ── */}
      <motion.div
        animate={openVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ pointerEvents: openVisible ? 'auto' : 'none' }}
      >
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/30">
              A Birthday Wish
            </span>
            <div className="w-6 h-px bg-gradient-to-r from-pink/40 to-sky/40" />
          </div>

          <motion.button
            onClick={() => { if (!triggered) { setTriggered(true); setTimeout(() => onEnter(), 250) } }}
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(244,114,182,0.15), rgba(3,143,164,0.15), transparent 70%)',
                filter: 'blur(25px)',
                willChange: 'opacity',
              }}
              animate={{ opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink/10 to-sky/10 blur-[40px] rounded-2xl opacity-40 group-hover:opacity-80 group-active:opacity-80 transition-opacity duration-500 ease-premium pointer-events-none" />

            <div className="relative px-10 py-4 md:px-14 md:py-5 rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm group-hover:border-pink/30 group-hover:bg-white/[0.07] group-active:border-pink/30 group-active:bg-white/[0.07] transition-all duration-500 ease-premium">
              <span className="relative font-display text-lg md:text-xl uppercase italic tracking-[0.2em] text-white/70 transition-colors duration-500 ease-premium group-hover:text-white group-active:text-white">
                Open
              </span>
            </div>
          </motion.button>

          <div className="flex flex-col items-center gap-1.5">
            <div className="w-4 h-px bg-gradient-to-r from-pink/30 via-sky/30 to-pink/30" />
            <span className="font-mono text-[6px] md:text-[7px] uppercase tracking-[0.5em] text-white/20">
              A little something, just for you
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
