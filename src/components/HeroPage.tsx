import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import ShreyaTitle from './ShreyaTitle'

export default function HeroPage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="page relative bg-bg">
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
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-12 h-px bg-gradient-to-r from-pink/40 via-sky/40 to-pink/40" />
            <p className="font-sans text-[11px] md:text-[13px] text-white/30 max-w-xs leading-relaxed tracking-[0.05em]">
              A little something, just for you
            </p>
          </motion.div>
        )}
      </div>

      {/* scroll indicator */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          {/* page dots */}
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="rounded-full"
                animate={
                  i === 0
                    ? {
                        width: 16,
                        height: 3,
                        background: 'linear-gradient(90deg, rgba(244,114,182,0.7), rgba(3,143,164,0.7))',
                      }
                    : {
                        width: 3,
                        height: 3,
                        background: 'rgba(255,255,255,0.12)',
                      }
                }
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>

          {/* scroll prompt */}
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="flex flex-col items-center gap-0.5">
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-3.5 h-3.5 border-r-[1.5px] border-b-[1.5px] border-white/30 rotate-45"
              />
              <motion.div
                animate={{ opacity: [0.15, 0.5, 0.15] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className="w-3 h-3 border-r-[1.5px] border-b-[1.5px] border-white/20 rotate-45 -mt-1"
              />
            </div>
            <span className="font-mono text-[6px] md:text-[7px] uppercase tracking-[0.4em] text-white/20">
              Continue
            </span>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
