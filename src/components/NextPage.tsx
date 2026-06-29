import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

export default function NextPage({ onBack }: { onBack?: () => void }) {
  const isMobile = useIsMobile()
  const [stage, setStage] = useState(0)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStage(1), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="fixed inset-0 bg-[#050508] flex items-center justify-center">
      {/* soft ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(244,114,182,0.03)_0%,rgba(3,143,164,0.02)_30%,transparent_60%)] pointer-events-none" />

      {/* back to home button */}
      {stage >= 1 && (
        <motion.button
          onClick={() => { if (!triggered) { setTriggered(true); onBack?.() } }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
          whileTap={{ scale: 0.96, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
          className="absolute top-8 right-8 font-mono text-[6px] md:text-[7px] uppercase tracking-[0.3em] text-white/15 hover:text-white/40 transition-colors duration-500 ease-premium cursor-pointer"
        >
          &larr; Back to Home
        </motion.button>
      )}

      {/* main content — staggered reveal */}
      <motion.div
        initial={isMobile ? { opacity: 0, y: 16, scale: 0.95 } : { opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[clamp(1.2rem,4vw,2rem)] text-white/25 leading-[1.6] tracking-[0.02em]"
        >
          <span className="block">This chapter</span>
          <span className="block mb-6">is still being written.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-8 h-px bg-gradient-to-r from-pink/30 via-sky/30 to-pink/30 mb-6"
          style={{ originX: 0.5 }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[9px] md:text-[10px] text-white/15 tracking-[0.15em] uppercase"
        >
          Come back soon.
        </motion.p>
      </motion.div>
    </div>
  )
}
