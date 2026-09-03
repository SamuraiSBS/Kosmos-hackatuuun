import { useEffect, useRef, useState, type CSSProperties } from 'react'

interface SpaceSceneProps {
  onComplete: () => void
  onSkip: () => void
}

export const SPACE_DURATION_MS = 4300
export const SPACE_EXIT_MS = 200

const stars = Array.from({ length: 34 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  top: `${(index * 61) % 100}%`,
  delay: `${(index % 7) * 0.18}s`,
  size: index % 5 === 0 ? 3 : 2,
}))

export function SpaceScene({ onComplete, onSkip }: SpaceSceneProps) {
  const [isLeaving, setIsLeaving] = useState(false)
  const finishedRef = useRef(false)

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      if (finishedRef.current) return
      setIsLeaving(true)
    }, SPACE_DURATION_MS)
    const completeTimer = window.setTimeout(() => {
      if (finishedRef.current) return
      finishedRef.current = true
      onComplete()
    }, SPACE_DURATION_MS + SPACE_EXIT_MS)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(completeTimer)
    }
  }, [onComplete])

  const handleSkip = () => {
    if (finishedRef.current) return
    finishedRef.current = true
    onSkip()
  }

  const sceneStyle = {
    '--space-duration': `${SPACE_DURATION_MS}ms`,
    '--space-exit-duration': `${SPACE_EXIT_MS}ms`,
  } as CSSProperties

  return (
    <main className={`space-scene ${isLeaving ? 'is-leaving' : ''}`} style={sceneStyle}>
      <div className="stars" aria-hidden="true">
        {stars.map((star, index) => <span key={index} style={{ left: star.left, top: star.top, width: star.size, height: star.size, animationDelay: star.delay }} />)}
      </div>
      <div className="space-label"><span className="eyebrow">ORBITAL EARTH OBSERVATION</span><h1>ЧИСТЫЙ<br /><em>БЕРЕГ</em></h1><p>Наблюдение береговой линии по данным ДЗЗ</p></div>
      <div className="orbit-scene" aria-hidden="true">
        <div className="earth-glow" />
        <div className="earth"><span className="earth-land land-one" /><span className="earth-land land-two" /><span className="earth-land land-three" /><span className="earth-cloud cloud-earth-one" /><span className="earth-cloud cloud-earth-two" /></div>
        <div className="satellite-flyby"><i /><b /><span /><small /></div>
      </div>
      <div className="terrain-transition" aria-hidden="true"><span className="terrain-patch patch-one" /><span className="terrain-patch patch-two" /><span className="terrain-water" /></div>
      <div className="cloud-transition" aria-hidden="true"><span className="cloud cloud-one" /><span className="cloud cloud-two" /><span className="cloud cloud-three" /><span className="cloud cloud-four" /></div>
      <div className="space-status"><span className="status-dot" /> ПЕРЕХОД К БЕРЕГОВОМУ СЕКТОРУ 07 <i>•</i> ДЗЗ</div>
      <button className="skip-button" type="button" onClick={handleSkip}>Пропустить <span>»</span></button>
      <div className="scene-progress"><span /></div>
    </main>
  )
}
