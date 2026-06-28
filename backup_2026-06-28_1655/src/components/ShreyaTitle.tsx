import { motion, useAnimation } from 'motion/react'
import { useEffect, useRef } from 'react'

interface ShreyaTitleProps {
  size?: 'hero' | 'intro'
  animate?: boolean
  delayStart?: number
  staggerDelay?: number
  gradient?: string
}

const LETTERS = 'Shreya'.split('')
const DEFAULT_GRADIENT =
  'linear-gradient(90deg, #F472B6 0%, #F7B8D8 25%, #F8F3FB 50%, #DCEFFF 75%, #7DD3FC 100%)'

export default function ShreyaTitle({
  size = 'hero',
  animate = true,
  delayStart = 0.6,
  staggerDelay = 0.1,
  gradient = DEFAULT_GRADIENT,
}: ShreyaTitleProps) {
  const isHero = size === 'hero'
  const driftControls = useAnimation()
  const mountedRef = useRef(true)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const drift = async () => {
      if (!mountedRef.current) return
      await driftControls.start({ x: 1.5, transition: { duration: 2, ease: 'easeInOut' } })
      if (!mountedRef.current) return
      await driftControls.start({ x: 0, transition: { duration: 2.5, ease: 'easeInOut' } })
      if (!mountedRef.current) return
      timer = setTimeout(drift, 12000)
    }

    timer = setTimeout(drift, 8000)

    return () => {
      mountedRef.current = false
      clearTimeout(timer)
    }
  }, [driftControls])

  return (
    <div className="relative flex items-center justify-center">
      {/* bloom glow layers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
        <div className="absolute left-[-10%] w-[40%] h-[180%]">
          <div className="w-full h-full rounded-full bg-pink/10 blur-[80px] animate-bloom-breathe" />
        </div>
        <div className="absolute left-[30%] w-[40%] h-[160%]">
          <div
            className="w-full h-full rounded-full bg-white/[0.03] blur-[80px] animate-bloom-breathe"
            style={{ animationDelay: '2s' }}
          />
        </div>
        <div className="absolute right-[-10%] w-[40%] h-[180%]">
          <div
            className="w-full h-full rounded-full bg-sky/10 blur-[80px] animate-bloom-breathe"
            style={{ animationDelay: '4s' }}
          />
        </div>
      </div>

      {/* vertical float */}
      <motion.div
        animate={{ y: [0, -0.5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* gradient drift */}
        <motion.div animate={driftControls}>
          {/* letter layout */}
          <div className="flex items-center gap-2 md:gap-3">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={
                  animate
                    ? { opacity: 0, y: 30, filter: 'blur(6px)' }
                    : { opacity: 1 }
                }
                animate={
                  animate ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}
                }
                transition={
                  animate
                    ? {
                        delay: delayStart + i * staggerDelay,
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      }
                    : {}
                }
                className={`font-display uppercase italic tracking-tight leading-none overflow-visible inline-block ${
                  isHero
                    ? 'text-[clamp(3.5rem,18vw,10rem)] py-[0.15em] px-[0.04em]'
                    : 'text-3xl md:text-4xl py-[0.1em] px-[0.02em]'
                }`}
                style={{
                  backgroundImage: gradient,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  backgroundSize: '600% 100%',
                  backgroundPosition: `${(i / (LETTERS.length - 1)) * 100}% 50%`,
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.06))',
                  textShadow:
                    '0 0 24px rgba(244,114,182,0.04), 0 0 40px rgba(255,255,255,0.02)',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
