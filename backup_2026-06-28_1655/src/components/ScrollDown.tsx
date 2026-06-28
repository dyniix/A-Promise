import { motion } from 'motion/react'

const TOTAL = 4

export default function ScrollDown({ current }: { current: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ margin: '-40px' }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
    >
      {/* page dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            animate={
              i === current
                ? {
                    width: 16,
                    height: 3,
                    background: 'linear-gradient(90deg, rgba(244,114,182,0.7), rgba(3,143,164,0.7))',
                    boxShadow: '0 0 6px rgba(244,114,182,0.3)',
                  }
                : {
                    width: 3,
                    height: 3,
                    background: 'rgba(255,255,255,0.12)',
                    boxShadow: '0 0 0px transparent',
                  }
            }
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>

      {/* chevron */}
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-0.5"
      >
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-3 h-3 border-r-[1.5px] border-b-[1.5px] border-white/20 rotate-45"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="w-2.5 h-2.5 border-r-[1.5px] border-b-[1.5px] border-white/15 rotate-45 -mt-1"
        />
      </motion.div>
      <span className="font-mono text-[5px] md:text-[6px] uppercase tracking-[0.4em] text-white/15">
        Scroll
      </span>
    </motion.div>
  )
}
