import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState, useRef } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

const WORDS = ['Only', 'for', 'you', '...']

const GLASS_NOISE =
  `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="200" height="200" filter="url(#n)" opacity="0.5"/></svg>'
  )}`

export default function TransitionOverlay({ onReveal }: { onReveal: () => void }) {
  const isMobile = useIsMobile()
  const [phase, setPhase] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [bloomWord, setBloomWord] = useState(0)
  const prevWordCount = useRef(0)

  // phase timers
  useEffect(() => {
    const t0 = setTimeout(() => setPhase(1), 100)
    const t1 = setTimeout(() => setPhase(2), 2800)
    const t2 = setTimeout(() => setPhase(3), 4200)
    const t3 = setTimeout(() => setPhase(5), 14000)
    const t4 = setTimeout(onReveal, 15000)
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [onReveal])

  // word sequence
  useEffect(() => {
    if (phase !== 3) {
      setWordCount(0)
      return
    }
    const t1 = setTimeout(() => setWordCount(1), 0)
    const t2 = setTimeout(() => setWordCount(2), 2000)
    const t3 = setTimeout(() => setWordCount(3), 4000)
    const t4 = setTimeout(() => setWordCount(4), 6000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [phase])

  // ambient bloom — triggers when a new word appears
  useEffect(() => {
    if (wordCount > prevWordCount.current) {
      setBloomWord(wordCount)
      prevWordCount.current = wordCount
      const t = setTimeout(() => setBloomWord(0), 500)
      return () => clearTimeout(t)
    }
  }, [wordCount])

  const breathing = phase >= 3 && wordCount >= 1

  return (
    <div className="fixed inset-0 z-[300] pointer-events-none">
      {/* ── own background (no backdrop-filter) ── */}
      {phase >= 1 && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* base dark */}
          <div className="absolute inset-0 bg-[#0a0a0f]" />

          {/* pink-sky atmosphere */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(244,114,182,0.08)_0%,rgba(3,143,164,0.04)_30%,transparent_65%)]" />

          {/* top-edge highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.025] via-transparent to-transparent" />

          {/* bottom depth shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/[0.12] via-transparent to-transparent" />

          {/* edge refraction */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.015] via-transparent to-white/[0.015]" />

          {/* noise grain */}
          <div
            className="absolute inset-0 opacity-[0.012] mix-blend-overlay"
            style={{
              backgroundImage: `url("${GLASS_NOISE}")`,
              backgroundSize: '200px 200px',
              backgroundRepeat: 'repeat',
            }}
          />

          {/* ambient bloom */}
          <AnimatePresence mode="wait">
            {bloomWord > 0 && (
              <motion.div
                key={bloomWord}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 50%, rgba(244,114,182,0.05) 0%, rgba(3,143,164,0.025) 30%, transparent 60%)',
                  transformOrigin: 'center',
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── center composition ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 md:gap-8">
        {/* 1. circular loader — fixed position, arc-only animation */}
        <div className="flex items-center justify-center" style={{ minHeight: '3rem' }}>
          <AnimatePresence>
            {phase >= 2 && phase < 5 && (
              <motion.div
                key="ring"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative">
                  {/* subtle glow bloom — static, no breathing */}
                  <div
                    className="absolute inset-0 rounded-full blur-2xl"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(244,114,182,0.08), rgba(3,143,164,0.04), transparent)',
                      transform: 'scale(1.8)',
                    }}
                  />

                  {/* ghost ring — static */}
                  <svg className="absolute inset-0 w-10 h-10 md:w-12 md:h-12" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="40"
                      fill="none"
                      stroke="rgba(244,114,182,0.06)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeDasharray="8 254"
                    />
                  </svg>

                  {/* main ring — strokeDashoffset animation */}
                  <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f472b6" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
                        <stop offset="100%" stopColor="#038fa4" />
                      </linearGradient>
                      <filter id="ringBloom">
                        <feGaussianBlur stdDeviation="1.2" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <motion.circle
                      cx="50" cy="50" r="38"
                      fill="none"
                      stroke="url(#loaderGradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="140 99"
                      filter="url(#ringBloom)"
                      animate={{ strokeDashoffset: [0, -239] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. text — 175% of original, builds naturally */}
        <div className="flex items-center justify-center" style={{ minHeight: '2.2em' }}>
          <AnimatePresence>
            {(phase >= 2 && phase < 5) && (
              <motion.p
                key="text"
                initial={false}
                exit={isMobile
                  ? { opacity: 0, y: -8, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  : { opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }
                className="font-display italic text-[19px] md:text-[21px] text-white/50 tracking-[0.05em] flex items-center gap-[0.3em]"
              >
                {WORDS.map((word, i) => (
                  <span key={i} className="inline-block overflow-visible">
                    <motion.span
                      className="inline-block"
                      initial={false}
                      animate={{
                        opacity: wordCount > i ? 1 : 0,
                        y: wordCount > i ? 0 : 8,
                        ...(isMobile
                          ? { scale: wordCount > i ? 1 : 0.92 }
                          : { filter: wordCount > i ? 'blur(0px)' : 'blur(5px)' }
                        ),
                      }}
                      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                      style={{ willChange: 'transform, opacity' }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* 3. breathing dots — original size, sync'd breathing */}
        <div className="flex items-center justify-center" style={{ minHeight: '1.2em' }}>
          <AnimatePresence>
            {(phase >= 2 && phase < 5) && (
              <motion.div
                key="dots"
                initial={false}
                exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] } }}
                className="flex items-center gap-2"
              >
                {[0, 1, 2].map((i) => {
                  const visible = wordCount > i
                  return (
                    <motion.div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: '2.5px',
                        height: '2.5px',
                        background: '#f472b6',
                        willChange: 'transform, opacity',
                      }}
                      animate={{
                        opacity: visible
                          ? breathing
                            ? [1, 0.2, 1]
                            : 1
                          : 0,
                        scale: visible
                          ? breathing
                            ? [1, 1.08, 1]
                            : 1
                          : 1,
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: breathing && visible ? Infinity : 0,
                        ease: 'easeInOut',
                      }}
                    />
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
