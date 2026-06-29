import { motion } from 'motion/react'
import ScrollDown from './ScrollDown'
import { useIsMobile } from '../hooks/useIsMobile'

const GENERIC_MESSAGE = `Happy Birthday, Shreya.

This is a small wish from someone who remembers you. May your year ahead be filled with everything that makes you smile — laughter, warmth, and moments that stay with you.

You deserve a day as beautiful as you are.`

// Hidden hint — if she remembers, she'll know
const HIDDEN_HINT = '\u2014 The depth was always the signal.'

export default function MessagePage() {
  const isMobile = useIsMobile()
  return (
    <section className="page relative bg-bg">
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

        {/* message card — delayed slightly after heading */}
        <motion.div
          initial={isMobile ? { opacity: 0, y: 16, scale: 0.97 } : { opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ margin: '-60px' }}
          transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-2xl p-8 md:p-10 w-full"
        >
          <p className="font-display text-sm md:text-base text-white/60 leading-[1.9] italic whitespace-pre-line">
            {GENERIC_MESSAGE}
          </p>

          {/* divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent my-6" />

          {/* hidden hint — subtle, no explanation */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: '-40px' }}
            transition={{ duration: 1.3, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[7px] md:text-[8px] text-right tracking-[0.15em] text-white/15 hover:text-white/25 transition-colors duration-700 ease-premium italic"
          >
            {HIDDEN_HINT}
          </motion.p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: '-40px' }}
          transition={{ duration: 1.3, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[7px] text-white/10 mt-6 tracking-[0.3em] uppercase"
        >
          With warmth, someone who remembers
        </motion.p>
      </div>
      <ScrollDown current={2} />
    </section>
  )
}
