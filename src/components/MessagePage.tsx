import { motion } from 'motion/react'
import ScrollDown from './ScrollDown'
import { useIsMobile } from '../hooks/useIsMobile'

const GENERIC_MESSAGE = `Happy Birthday, Shreya.

This is a small wish from someone who remembers you. May your year ahead be filled with everything that makes you smile — laughter, warmth, and moments that stay with you.

You deserve a day as beautiful as you are.`

const HIDDEN_HINT = '\u2014 The depth was always the signal.'

const SPARKLES = [
  { x: '10%', y: '8%', size: 2, delay: 0 },
  { x: '90%', y: '15%', size: 1.5, delay: 1 },
  { x: '80%', y: '85%', size: 2, delay: 0.5 },
  { x: '15%', y: '88%', size: 1.5, delay: 1.5 },
  { x: '50%', y: '3%', size: 1, delay: 2 },
]

function Sparkle({ s, mobile }: { s: typeof SPARKLES[0]; mobile: boolean }) {
  if (mobile && s.size < 2) return null
  return (
    <motion.div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{ left: s.x, top: s.y, width: s.size, height: s.size, willChange: 'opacity, scale' }}
      animate={{ opacity: [0, 0.8, 0], scale: [0, 1.3, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
    />
  )
}

export default function MessagePage() {
  const isMobile = useIsMobile()
  return (
    <section className="page relative bg-bg w-full min-h-dvh">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(3,143,164,0.04)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(244,114,182,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-lg mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-60px' }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.35em] text-sky/40 mb-2"
        >
          A Message For You
        </motion.span>

        <motion.h2
          initial={isMobile ? { opacity: 0, y: 14 } : { opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ margin: '-60px' }}
          transition={{ duration: 1.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(1.8rem,5vw,3rem)] text-white/90 italic tracking-wider mb-10"
        >
          Just <span className="text-pink/70">For You</span>
        </motion.h2>

        {/* card wrapper — glow + sparkles */}
        <div className="relative w-full">
          {/* breathing glow */}
          <motion.div
            className="absolute -inset-8 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(244,114,182,0.07), transparent 60%)',
              filter: 'blur(50px)',
              willChange: 'opacity, scale',
            }}
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.92, 1.08, 0.92] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {SPARKLES.map((s, i) => <Sparkle key={i} s={s} mobile={isMobile} />)}

          <motion.div
            initial={isMobile ? { opacity: 0, y: 16, scale: 0.97 } : { opacity: 0, y: 30, filter: 'blur(6px)' }}
            whileInView={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ margin: '-60px' }}
            transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-2xl p-8 md:p-10 w-full shadow-[0_0_30px_rgba(244,114,182,0.06)]"
          >
            {/* wax seal accent */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink/20 to-sky/20 flex items-center justify-center mx-auto mb-6 border border-white/[0.06]">
              <span className="text-sm text-pink/60">&#x2726;</span>
            </div>

            {/* message */}
            <div className="relative">
              {/* opening quote flourish */}
              <span className="absolute -top-2 -left-1 font-display text-3xl text-pink/20 leading-none select-none">&ldquo;</span>
              <p className="font-display text-sm md:text-base text-white/70 leading-[1.9] italic whitespace-pre-line px-2">
                {GENERIC_MESSAGE}
              </p>
              <span className="block text-right font-display text-3xl text-pink/20 leading-none -mb-4 select-none">&rdquo;</span>
            </div>

            {/* divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent my-6" />

            {/* hidden hint */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: '-40px' }}
              transition={{ duration: 1.3, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[7px] md:text-[8px] text-right tracking-[0.15em] text-white/15 hover:text-white/25 active:text-white/25 transition-colors duration-700 ease-premium italic"
            >
              {HIDDEN_HINT}
            </motion.p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: '-40px' }}
          transition={{ duration: 1.3, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[7px] text-white/20 mt-6 tracking-[0.3em] uppercase"
        >
          With warmth, someone who remembers
        </motion.p>
      </div>
      <ScrollDown current={2} />
    </section>
  )
}
