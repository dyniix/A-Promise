import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import ShreyaTitle from './ShreyaTitle'
import ScrollDown from './ScrollDown'

export default function HeroPage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="page relative bg-bg w-full min-h-dvh">
      {/* background glow — static, no animation */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(3,143,164,0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(244,114,182,0.04)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* opening line */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-pink/40 mb-8"
        >
          A Special Birthday Wish
        </motion.span>

        {/* animated name */}
        <div className="mb-6">
          <ShreyaTitle size="hero" delayStart={0.6} staggerDelay={0.1} />
        </div>

        {/* tagline */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-12 h-px bg-gradient-to-r from-pink/40 via-sky/40 to-pink/40" />
            <p className="font-sans text-[11px] md:text-[13px] text-white/30 max-w-xs leading-relaxed tracking-[0.05em]">
              A quiet celebration, made for you
            </p>
          </motion.div>
        )}
      </div>

      {/* scroll indicator — shared component like other pages */}
      {showContent && <ScrollDown current={0} label="Continue" />}
    </section>
  )
}
