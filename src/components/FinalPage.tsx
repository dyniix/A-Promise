import { motion } from 'motion/react'
import { useEffect, useState, useMemo } from 'react'

const AMBIENT = [
  { x: 30, y: 40, size: 250, color: '#f472b6', delay: 0 },
  { x: 70, y: 50, size: 200, color: '#038fa4', delay: 3 },
  { x: 50, y: 70, size: 180, color: '#f472b6', delay: 6 },
  { x: 20, y: 80, size: 160, color: '#038fa4', delay: 9 },
]

const HAPPY_LETTERS = 'Happy'.split('')
const BIRTHDAY_LETTERS = 'Birthday'.split('')

export default function FinalPage({ onContinue }: { onContinue?: () => void }) {
  const [stage, setStage] = useState(0)
  const ambient = useMemo(() => AMBIENT, [])

  const dust = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        left: `${8 + (i * 9) % 84}%`,
        top: `${12 + (i * 11) % 76}%`,
        size: 1 + (i % 2),
        delay: i * 1.1,
        duration: 15 + i * 1.5,
        driftY: -12 - i * 1.2,
      })),
    [],
  )

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 2000)
    const t2 = setTimeout(() => setStage(2), 4000)
    const t3 = setTimeout(() => setStage(3), 6500)
    const t4 = setTimeout(() => setStage(4), 8500)
    const t5 = setTimeout(() => setStage(5), 11000)
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5)
    }
  }, [])

  return (
    <section className="page relative bg-bg overflow-hidden">
      {/* aurora layer - pink */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '75%',
          height: '75%',
          left: '12%',
          top: '12%',
          background:
            'radial-gradient(ellipse, rgba(244,114,182,0.05), transparent 60%)',
          filter: 'blur(70px)',
        }}
        animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* aurora layer - sky */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '65%',
          height: '65%',
          right: '8%',
          bottom: '8%',
          background:
            'radial-gradient(ellipse, rgba(3,143,164,0.04), transparent 60%)',
          filter: 'blur(70px)',
        }}
        animate={{ x: [0, -12, 0], y: [0, 14, 0] }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />

      {/* aurora layer - warm center */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '55%',
          height: '55%',
          left: '22%',
          bottom: '22%',
          background:
            'radial-gradient(ellipse, rgba(244,114,182,0.03), transparent 60%)',
          filter: 'blur(90px)',
        }}
        animate={{ x: [0, -8, 0], y: [0, 12, 0] }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 10,
        }}
      />

      {/* ambient orbs — slow breathing */}
      {ambient.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: orb.color,
          }}
          animate={{
            y: [0, -10, 0, 8, 0],
            x: [0, 6, -5, 4, 0],
            scale: [1, 1.04, 0.97, 1.03, 1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: 22 + i * 4,
            repeat: Infinity,
            delay: orb.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {dust.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/15"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, p.driftY, 0],
              opacity: [0, 0.15, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 text-center w-full max-w-full min-h-screen justify-center">
        {/* Happy Birthday */}
        <div className="flex flex-col items-center gap-2 md:gap-3 mb-6">
          {/* bloom glow behind HB */}
          {stage >= 1 && (
            <motion.div
              className="absolute w-[80%] h-[200%] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse, rgba(244,114,182,0.05), rgba(3,143,164,0.025), transparent 60%)',
                filter: 'blur(90px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.55, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Happy row */}
          <motion.div
            className="relative flex items-center justify-center gap-0 md:gap-1 overflow-visible px-2"
            animate={
              stage >= 1 ? { y: [0, -0.5, 0] } : {}
            }
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {HAPPY_LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ margin: '-40px' }}
                transition={{
                  delay: i * 0.15,
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-[clamp(1.6rem,6.5vw,3rem)] uppercase italic tracking-tight leading-none overflow-visible py-[0.15em] px-[0.05em] inline-block"
                style={{
                  backgroundImage:
                    'linear-gradient(180deg, #f9a8d4, #f472b6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.05))',
                  textShadow:
                    '0 0 30px rgba(244,114,182,0.05), 0 0 50px rgba(255,255,255,0.02)',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Birthday row */}
          <motion.div
            className="relative flex items-center justify-center gap-0 md:gap-1 overflow-visible px-2"
            animate={
              stage >= 1 ? { y: [0, 0.4, 0] } : {}
            }
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          >
            {BIRTHDAY_LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ margin: '-40px' }}
                transition={{
                  delay: 0.6 + i * 0.15,
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-[clamp(1.6rem,6.5vw,3rem)] uppercase italic tracking-tight leading-none overflow-visible py-[0.15em] px-[0.05em] inline-block"
                style={{
                  backgroundImage:
                    'linear-gradient(180deg, #7dd3fc, #038fa4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.05))',
                  textShadow:
                    '0 0 30px rgba(3,143,164,0.05), 0 0 50px rgba(255,255,255,0.02)',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* blessing + divider */}
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: [0.4, 0.65, 0.4], scaleX: 1 }}
              transition={{
                opacity: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                scaleX: { duration: 1, ease: [0.16, 1, 0.3, 1] },
              }}
              style={{ originX: 0.5 }}
              className="w-16 h-px bg-gradient-to-r from-pink/40 via-sky/40 to-pink/40"
            />

            <p className="font-sans text-[10px] md:text-[12px] text-white/25 max-w-xs leading-[2.2] tracking-[0.08em]">
              May every moment ahead feel as special as you are.
            </p>
          </motion.div>
        )}

        {/* footer */}
        {stage >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-8"
          >
            <span className="font-mono text-[5px] md:text-[6px] uppercase tracking-[0.5em] text-white/[0.07]">
              01 · 08
            </span>
          </motion.div>
        )}

        {/* continue button — premium glass pill */}
        {stage >= 5 && (
          <motion.div
            className="absolute bottom-16 md:bottom-20 flex flex-col items-center"
            initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* bloom glow - left */}
            <motion.div
              className="absolute w-[55%] h-[200%] left-[-10%] bg-pink/[0.06] blur-[65px] rounded-full pointer-events-none"
              animate={{ opacity: [0.25, 0.55, 0.25] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* bloom glow - right */}
            <motion.div
              className="absolute w-[55%] h-[200%] right-[-10%] bg-sky/[0.06] blur-[65px] rounded-full pointer-events-none"
              animate={{ opacity: [0.25, 0.55, 0.25] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
            />

            {/* idle float + hover/click scale */}
            <motion.div
              animate={{ y: [0, -0.5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.03, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
              whileTap={{ scale: 0.97, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
            >
              <button
                onClick={onContinue}
                className="relative rounded-full px-14 py-[18px] md:px-16 md:py-[22px] cursor-pointer overflow-hidden group"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              >
                {/* breathing glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 25px rgba(244,114,182,0.12), 0 0 25px rgba(3,143,164,0.12)',
                      '0 0 60px rgba(244,114,182,0.35), 0 0 60px rgba(3,143,164,0.35)',
                      '0 0 25px rgba(244,114,182,0.12), 0 0 25px rgba(3,143,164,0.12)',
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* gradient border */}
                <div
                  className="absolute inset-0 rounded-full transition-all duration-500 ease-premium group-hover:border-pink/40"
                  style={{
                    border: '1px solid rgba(244,114,182,0.3)',
                    boxShadow: 'inset 0 0 0 1px rgba(3,143,164,0.25)',
                  }}
                />

                {/* ambient tint */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink/[0.05] via-white/[0.02] to-sky/[0.05] group-hover:from-pink/[0.15] group-hover:to-sky/[0.15] transition-all duration-500 ease-premium" />

                <span
                  className="relative font-display italic text-[11px] md:text-[12px] tracking-[0.18em] uppercase"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, rgba(244,114,182,0.85), rgba(255,255,255,0.9), rgba(3,143,164,0.85))',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Step Inside
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
