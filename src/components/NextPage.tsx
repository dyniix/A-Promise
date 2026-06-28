import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

export default function NextPage({ onBack }: { onBack?: () => void }) {
  const [stage, setStage] = useState(0)

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
          onClick={onBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-8 right-8 font-mono text-[6px] md:text-[7px] uppercase tracking-[0.3em] text-white/15 hover:text-white/40 transition-colors duration-500 ease-premium cursor-pointer"
        >
          &larr; Back to Home
        </motion.button>
      )}

      {/* main content */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <p className="font-display italic text-[clamp(1.2rem,4vw,2rem)] text-white/25 leading-[1.6] tracking-[0.02em]">
          <span className="block">This chapter</span>
          <span className="block mb-6">is still being written.</span>
        </p>

        <div className="w-8 h-px bg-gradient-to-r from-pink/30 via-sky/30 to-pink/30 mb-6" />

        <p className="font-sans text-[9px] md:text-[10px] text-white/15 tracking-[0.15em] uppercase">
          Come back soon.
        </p>
      </motion.div>
    </div>
  )
}
