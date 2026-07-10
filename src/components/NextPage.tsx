import { motion, AnimatePresence } from 'motion/react'
import { useMemo, useState, useEffect } from 'react'

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 0,
      staggerChildren: 0.15,
    },
  },
}

const childVariants = {
  initial: {
    opacity: 0,
    filter: 'blur(12px)',
    y: 12,
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

const ORBS = [
  { x: '0%', y: '0%', color: 'rgba(3,143,164,0.1)', size: 600 },
  { x: '60%', y: '50%', color: 'rgba(244,114,182,0.1)', size: 550 },
  { x: '25%', y: '25%', color: 'rgba(168,85,247,0.05)', size: 700 },
]

const DUST_COUNT = 14

const BURST_EMOJIS = ['\u2728', '\uD83D\uDC96', '\uD83C\uDF38', '\u2728', '\uD83D\uDC9C', '\uD83C\uDF1F']

export default function NextPage() {
  const [phase, setPhase] = useState<'gift' | 'burst' | 'letter'>('gift')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('burst'), 1500)
    const t2 = setTimeout(() => setPhase('letter'), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const dust = useMemo(
    () =>
      Array.from({ length: DUST_COUNT }, (_, i) => ({
        left: `${2 + (i * 7.3) % 96}%`,
        bottom: `${-2 - (i % 3) * 4}%`,
        delay: i * 0.6 + Math.random() * 0.5,
        driftX: (i % 5 - 2) * 6,
        driftY: 30 + (i % 4) * 15,
        duration: 10 + (i % 3) * 4,
        size: i % 3 === 0 ? 2 : 1.5,
        fadeDelay: Math.random() * 3,
      })),
    [],
  )

  const burstParticles = useMemo(
    () =>
      BURST_EMOJIS.map((emoji, i) => ({
        emoji,
        x: (i % 3 - 1) * (60 + Math.random() * 80),
        y: (Math.floor(i / 3) * 2 - 1) * (40 + Math.random() * 60),
        delay: i * 0.03,
        rotation: (Math.random() - 0.5) * 360,
      })),
    [],
  )

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center min-h-screen w-full overflow-hidden select-none bg-gradient-to-b from-[#0a0a1a] via-[#110a1f] to-[#05050a] px-6 md:px-12">
      {/* flash overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(244,114,182,0.06) 40%, transparent 70%)',
          willChange: 'opacity',
        }}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ambient orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: 'blur(140px)',
            willChange: 'transform, opacity',
          }}
          animate={{ opacity: [0.12, 0.22, 0.12], scale: [0.9, 1.1, 0.9] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 2,
          }}
        />
      ))}

      {/* floating magic dust */}
      {dust.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
            background: 'rgba(244,114,182,0.25)',
            boxShadow: '0 0 4px rgba(244,114,182,0.15), 0 0 8px rgba(3,143,164,0.1)',
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [-p.driftY, p.driftY],
            x: [-p.driftX, p.driftX],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
            times: [0, 0.3 + p.fadeDelay * 0.05, 1],
          }}
        />
      ))}

      {/* ── PHASE 1 & 2: GIFT DROP + BURST ── */}
      <AnimatePresence>
        {phase !== 'letter' && (
          <motion.div
            key="gift-burst"
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {/* gift emoji drop */}
            {phase === 'gift' && (
              <motion.span
                key="gift-emoji"
                className="text-5xl md:text-6xl"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 12,
                  mass: 0.8,
                }}
              >
                {'\uD83D\uDC8C'}
              </motion.span>
            )}

            {/* burst emojis */}
            {phase === 'burst' && (
              <motion.div
                key="burst-container"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                {/* center pop */}
                <motion.span
                  className="text-5xl md:text-6xl absolute"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {'\uD83D\uDC8C'}
                </motion.span>

                {/* scattered particles */}
                {burstParticles.map((p, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-lg md:text-xl"
                    initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.5 }}
                    animate={{
                      x: p.x,
                      y: p.y,
                      opacity: 0,
                      rotate: p.rotation,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: p.delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {p.emoji}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PHASE 3: LETTER REVEAL ── */}
      {phase === 'letter' && (
        <motion.div
          className="relative z-10 flex flex-col items-center w-full max-w-[36rem] md:max-w-[42rem] mx-auto"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.span
            variants={childVariants}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="text-3xl md:text-4xl mb-4 will-change-transform"
          >
            {'\uD83E\uDDF8'}
          </motion.span>

          <motion.h1
            variants={childVariants}
            className="text-xl md:text-2xl font-semibold tracking-tight text-slate-100 mb-6 will-change-transform"
            style={{ textShadow: '0 0 30px rgba(244,114,182,0.15), 0 0 60px rgba(3,143,164,0.08)' }}
          >
            A Little Wish, Just For You... <span className="text-pink/70">{'\u2728'}</span>
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="text-sm md:text-base font-medium leading-relaxed md:leading-loose text-slate-300 mt-6 will-change-transform text-center max-w-[90%] md:max-w-none"
          >
            Didi, some years bring changes, but the promises we keep always stay the same. I wanted to create this little surprise just to remind you how incredibly special you are didi. Shreya, no matter what happens, I just want to see you truly happy and always smiling. Whatever has happened or will happen doesn&rsquo;t matter; I just want to see that smile. Didi you deserve every bit of peace and warmth this world has to offer. Even when distances grow, please know that you are always in my prayers. Keep shining, my sweetest sister. Happy Birthday once again! <span className="text-pink/50">{'\uD83C\uDF82'}</span><span className="text-sky/50">{'\uD83C\uDF88'}</span><span className="text-pink/50">{'\u2764'}</span><span className="text-sky/50">{'\u2728'}</span>
          </motion.p>

          <motion.footer
            variants={childVariants}
            className="font-mono text-[10px] md:text-xs font-normal tracking-widest text-slate-500 mt-10 will-change-transform"
          >
            Made with care. &bull; 01 &middot; 08
          </motion.footer>
        </motion.div>
      )}

      {/* hidden signature */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        whileHover={{ opacity: 0.15, transition: { duration: 0.5 } }}
        transition={{ delay: 3, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 right-5 font-mono text-[8px] md:text-[9px] italic tracking-[0.05em] z-50 will-change-transform"
      >
        &mdash; The depth was always the signal.
      </motion.p>
    </div>
  )
}
