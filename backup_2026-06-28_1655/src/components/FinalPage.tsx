import { motion } from 'motion/react'
import { useMemo } from 'react'

const ORBS = [
  { x: 10, y: 15, w: 4, h: 4, driftX: 8, driftY: -25, dur: 5 },
  { x: 25, y: 70, w: 7, h: 7, driftX: -12, driftY: 20, dur: 6 },
  { x: 50, y: 20, w: 3, h: 3, driftX: 15, driftY: -30, dur: 4.5 },
  { x: 70, y: 60, w: 5, h: 5, driftX: -8, driftY: -20, dur: 5.5 },
  { x: 85, y: 30, w: 6, h: 6, driftX: 10, driftY: 15, dur: 7 },
  { x: 40, y: 80, w: 3, h: 3, driftX: -15, driftY: -18, dur: 4 },
  { x: 15, y: 50, w: 8, h: 8, driftX: 6, driftY: 22, dur: 6.5 },
  { x: 65, y: 10, w: 4, h: 4, driftX: -10, driftY: -28, dur: 5.2 },
]

// ambient orbs
const AMBIENT = [
  { x: 30, y: 40, size: 250, color: '#f472b6', delay: 0 },
  { x: 70, y: 50, size: 200, color: '#038fa4', delay: 1 },
  { x: 50, y: 70, size: 180, color: '#f472b6', delay: 2 },
]

export default function FinalPage() {
  const orbs = useMemo(() => ORBS, [])
  const ambient = useMemo(() => AMBIENT, [])

  return (
    <section className="page relative bg-bg">
      {/* ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(244,114,182,0.05)_0%,rgba(3,143,164,0.03)_40%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(244,114,182,0.08)_0%,transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_90%,rgba(3,143,164,0.06)_0%,transparent_40%)] pointer-events-none" />

      {/* ambient orbs */}
      {ambient.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{ width: orb.size, height: orb.size, left: `${orb.x}%`, top: `${orb.y}%`, background: orb.color }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 10, -8, 5, 0],
            scale: [1, 1.06, 0.96, 1.03, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 7 + i * 2,
            repeat: Infinity,
            delay: orb.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* floating sparkles */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.w,
            height: orb.h,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: i % 2 === 0 ? 'rgba(244,114,182,0.25)' : 'rgba(3,143,164,0.25)',
            boxShadow: i % 2 === 0
              ? '0 0 6px rgba(244,114,182,0.3)'
              : '0 0 6px rgba(3,143,164,0.3)',
          }}
          animate={{
            y: [0, orb.driftY, 0],
            x: [0, orb.driftX, 0],
            opacity: [0.15, 0.7, 0.15],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center px-4 text-center w-full max-w-full">
        {/* letter-by-letter — two rows */}
        <div className="flex flex-col items-center gap-2 md:gap-3 mb-6 w-full max-w-full">
          <div className="flex items-center justify-center gap-0 md:gap-1 overflow-visible px-2">
            {['H','a','p','p','y'].map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(1.6rem,6.5vw,3rem)] uppercase italic tracking-tight leading-none overflow-visible py-[0.15em] px-[0.05em] inline-block"
              >
                <span className="text-gradient-pink">{letter}</span>
              </motion.span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-0 md:gap-1 overflow-visible px-2">
            {['B','i','r','t','h','d','a','y'].map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ margin: '-40px' }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(1.6rem,6.5vw,3rem)] uppercase italic tracking-tight leading-none overflow-visible py-[0.15em] px-[0.05em] inline-block"
              >
                <span className="text-gradient-sky">{letter}</span>
              </motion.span>
            ))}
          </div>
        </div>

        {/* final message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-40px' }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-16 h-px bg-gradient-to-r from-pink/40 via-sky/40 to-pink/40" />
          <p className="font-sans text-[10px] md:text-[12px] text-white/25 max-w-xs leading-relaxed">
            May every moment ahead feel as special as you are.
          </p>
        </motion.div>

        {/* subtle footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: '-20px' }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="absolute bottom-8"
        >
          <span className="font-mono text-[6px] uppercase tracking-[0.4em] text-white/10">
            01 · 08
          </span>
        </motion.div>
      </div>
    </section>
  )
}
