import { useState } from 'react'
import { useGame } from '../game/gameStore'

interface DecisionSceneProps {
  onBack: () => void
}

const decisions = [
  { id: 'irrigate', icon: '♒', title: 'Увеличить полив', detail: 'Восполнить влагу на северном участке', correct: true },
  { id: 'fertilize', icon: '✿', title: 'Внести удобрения', detail: 'Поддержать растения питательными веществами', correct: false },
  { id: 'observe', icon: '◉', title: 'Продолжить наблюдение', detail: 'Оставить участок под контролем спутника', correct: false },
]

export function DecisionScene({ onBack }: DecisionSceneProps) {
  const { dispatch } = useGame()
  const [feedback, setFeedback] = useState<string | null>(null)

  const choose = (decision: (typeof decisions)[number]) => {
    if (decision.correct) {
      dispatch({ type: 'MAKE_DECISION', decision: decision.id, correct: true })
      return
    }
    setFeedback('Это решение не соответствует данным наблюдения. Обратите внимание на показатель влажности — он всего 41%.')
    dispatch({ type: 'MAKE_DECISION', decision: decision.id, correct: false })
  }

  return (
    <main className="decision-scene scene-page">
      <div className="analysis-header"><button className="back-button" type="button" onClick={onBack}>← <span>Анализ</span></button><span className="decision-step">ШАГ 03 / 03</span></div>
      <div className="decision-hero"><div className="decision-orbit"><span>41</span><small>% H₂O</small><i /></div><span className="eyebrow">ДАННЫЕ ПОЛУЧЕНЫ</span><h1>Что сделать<br /><em>с участком?</em></h1><p>Выбери действие, которое поможет стабилизировать северную часть поля.</p></div>
      <div className="decision-options">
        {decisions.map((decision, index) => <button className="decision-option" type="button" key={decision.id} onClick={() => choose(decision)}><span className="option-index">0{index + 1}</span><span className="option-icon">{decision.icon}</span><span className="option-copy"><strong>{decision.title}</strong><small>{decision.detail}</small></span><span className="option-arrow">→</span></button>)}
      </div>
      {feedback && <div className="decision-feedback"><span>!</span><p>{feedback}</p><button type="button" onClick={() => setFeedback(null)} aria-label="Скрыть подсказку">×</button></div>}
      <div className="decision-tip"><span>TIP</span> Решение можно изменить до отправки данных.</div>
    </main>
  )
}

