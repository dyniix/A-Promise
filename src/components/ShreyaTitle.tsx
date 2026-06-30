import { motion } from 'motion/react'
import { useIsMobile } from '../hooks/useIsMobile'

interface ShreyaTitleProps {
  size?: 'hero' | 'intro'
  animate?: boolean
  delayStart?: number
  staggerDelay?: number
  gradient?: string
  glow?: 'premium' | 'subtle'
  active?: boolean
}

const LETTERS = 'Shreya'.split('')
const DEFAULT_GRADIENT =
  'linear-gradient(90deg, #F472B6 0%, #F7B8D8 25%, #F8F3FB 50%, #DCEFFF 75%, #7DD3FC 100%)'

function BloomGlow({ className, intensity, active }: { className: string; intensity: string; active: boolean }) {
  return (
    <div className={`absolute ${className}`}>
      <motion.div
        className={`w-full h-full rounded-full blur-[80px] pointer-events-none ${intensity}`}
        style={{ willChange: 'opacity' }}
        animate={active ? { opacity: [0.25, 0.5, 0.25] } : { opacity: 0.25 }}
        transition={{ duration: 6, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
      />
    </div>
  )
}

export default function ShreyaTitle({
  size = 'hero',
  animate = true,
  delayStart = 0.6,
  staggerDelay = 0.1,
  gradient = DEFAULT_GRADIENT,
  glow = 'premium',
  active = true,
}: ShreyaTitleProps) {
  const isHero = size === 'hero'
  const isMobile = useIsMobile()

  return (
    <div className="relative flex items-center justify-center">
      {/* bloom glow layers — static blur + opacity breathing */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
        <BloomGlow
          className="left-[-10%] w-[40%] h-[180%]"
          intensity={glow === 'subtle' ? 'bg-pink/[0.04]' : 'bg-pink/10'}
          active={active}
        />
        <BloomGlow
          className="left-[30%] w-[40%] h-[160%]"
          intensity={glow === 'subtle' ? 'bg-white/[0.015]' : 'bg-white/[0.03]'}
          active={active}
        />
        <BloomGlow
          className="right-[-10%] w-[40%] h-[180%]"
          intensity={glow === 'subtle' ? 'bg-sky/[0.04]' : 'bg-sky/10'}
          active={active}
        />
      </div>

      {/* vertical float */}
      <motion.div
        animate={active ? { y: [0, -0.5, 0] } : { y: 0 }}
        transition={{ duration: 10, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
        style={{ willChange: 'transform' }}
      >
        {/* letter layout */}
        <div className="flex items-center gap-2 md:gap-3">
          {LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              initial={animate
                ? isMobile
                  ? { opacity: 0, y: 20, scale: 0.92 }
                  : { opacity: 0, y: 20, filter: 'blur(4px)' }
                : { opacity: 1 }
              }
              animate={animate
                ? isMobile
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 1, y: 0, filter: 'blur(0px)' }
                : {}
              }
              transition={animate
                ? { delay: delayStart + i * staggerDelay, duration: 1.3, ease: [0.16, 1, 0.3, 1] }
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
                willChange: 'transform, opacity',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
