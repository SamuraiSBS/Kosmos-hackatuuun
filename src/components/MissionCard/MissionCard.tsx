import { getMission, lockedMissions } from '../../game/missions'
import { useGame } from '../../game/gameStore'

export function MissionsView() {
  const { state } = useGame()
  const mission = getMission(state.currentMission)

  return (
    <div className="missions-view scene-page">
      <div className="section-heading">
        <span className="eyebrow">ЖУРНАЛ ЭКСПЕДИЦИИ</span>
        <h1>Задания</h1>
        <p>Наблюдайте за территориями и помогайте хозяйству принимать решения.</p>
      </div>
      <article className={`mission-card ${state.missionCompleted ? 'is-complete' : ''}`}>
        <div className="mission-card-top"><span className="mission-number">01</span><span className="status-chip">{state.missionCompleted ? 'ГОТОВО' : 'АКТИВНО'}</span></div>
        <h2>{mission.title}</h2>
        <p>{mission.description}</p>
        <div className="mission-objective"><span>ЦЕЛЬ</span><strong>{state.missionCompleted ? 'Участок стабилизирован' : mission.objective}</strong></div>
        <div className="mission-reward"><span>НАГРАДА</span><strong>✦ +{mission.xp} XP</strong></div>
      </article>
      <div className="locked-missions">
        <div className="section-label">СКОРО ОТКРОЕТСЯ</div>
        {lockedMissions.map((locked, index) => (
          <div className="locked-mission" key={locked.id}><span className="locked-icon">▣</span><div><span>МИССИЯ 0{index + 2}</span><strong>{locked.title}</strong></div><b>LOCKED</b></div>
        ))}
      </div>
    </div>
  )
}

