import { motion, useInView } from 'motion/react'
import { useRef, useMemo } from 'react'

const TOTAL = 4

export default function ScrollDown({ current, label = 'Scroll' }: { current: number; label?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useInView(ref, { margin: '-60px 0px' })
  const dots = useMemo(() => Array.from({ length: TOTAL }), [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ margin: '-40px' }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
    >
      {/* page dots */}
      <div className="flex items-center gap-2">
        {dots.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            animate={
              i === current
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
            style={{ willChange: 'width, height' }}
          />
        ))}
      </div>

      {/* chevron */}
      <motion.div
        animate={isVisible ? { y: [0, 4, 0] } : { y: 0 }}
        transition={{ duration: 2.5, repeat: isVisible ? Infinity : 0, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-0.5"
        style={{ willChange: 'transform' }}
      >
        <motion.div
          animate={isVisible ? { opacity: [0.3, 0.7, 0.3] } : { opacity: 0.3 }}
          transition={{ duration: 2.5, repeat: isVisible ? Infinity : 0, ease: 'easeInOut' }}
          className="w-3 h-3 border-r-[1.5px] border-b-[1.5px] border-white/20 rotate-45"
          style={{ willChange: 'opacity' }}
        />
        <motion.div
          animate={isVisible ? { opacity: [0.15, 0.4, 0.15] } : { opacity: 0.15 }}
          transition={{ duration: 2.5, repeat: isVisible ? Infinity : 0, ease: 'easeInOut', delay: 0.3 }}
          className="w-2.5 h-2.5 border-r-[1.5px] border-b-[1.5px] border-white/15 rotate-45 -mt-1"
          style={{ willChange: 'opacity' }}
        />
      </motion.div>
      <span className="font-mono text-[5px] md:text-[6px] uppercase tracking-[0.4em] text-white/15">
        {label}
      </span>
    </motion.div>
  )
}
