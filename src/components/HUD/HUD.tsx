import { getMission } from '../../game/missions'
import { useGame } from '../../game/gameStore'
import { ProgressBar } from '../ProgressBar/ProgressBar'

export function HUD() {
  const { state } = useGame()
  const mission = getMission(state.currentMission)
  const missionDone = state.missionCompleted

  return (
    <header className="hud">
      <div className="brand-mark" aria-label="Космос Ферма">
        <span className="brand-orbit" />
        <span className="brand-name">КОСМОС<br />ФЕРМА</span>
      </div>
      <div className="hud-stats">
        <div className="xp-stat"><span className="xp-star">✦</span><span><small>ОПЫТ</small><strong>{state.xp} XP</strong></span></div>
        <ProgressBar label="ЗДОРОВЬЕ ХОЗЯЙСТВА" value={state.farmHealth} />
      </div>
      <div className={`mission-strip ${missionDone ? 'mission-done' : ''}`}>
        <span className="mission-kicker">{missionDone ? 'МИССИЯ ВЫПОЛНЕНА' : 'ТЕКУЩАЯ МИССИЯ'}</span>
        <span className="mission-title">{missionDone ? 'Северное поле стабилизировано' : mission.title}</span>
      </div>
    </header>
  )
}

