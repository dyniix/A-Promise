import { useEffect, useState } from 'react'

export function useLoadingProgress({ minDuration = 4000 }: { minDuration?: number } = {}) {
  const [progress, setProgress] = useState(0)
  const [loadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    setProgress(0)
    setLoadingComplete(false)

    const half = minDuration / 2
    let stage = 0

    const start = Date.now()
    let raf: number

    const tick = () => {
      const elapsed = Date.now() - start

      if (stage === 0) {
        const t = Math.min(elapsed / half, 1)
        const val = 50 * (1 - Math.pow(1 - t, 1.8))
        setProgress(val)

        if (t >= 1) stage = 1
        raf = requestAnimationFrame(tick)
        return
      }

      if (stage === 1) {
        const stage2Duration = minDuration * 0.75
        const t = Math.min((elapsed - half) / stage2Duration, 1)
        const val = 50 + 50 * (1 - Math.pow(1 - t, 1.6))
        setProgress(val)

        if (t >= 1) {
          setProgress(100)
          setLoadingComplete(true)
          return
        }

        raf = requestAnimationFrame(tick)
        return
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [minDuration])

  return { progress, loadingComplete }
}
