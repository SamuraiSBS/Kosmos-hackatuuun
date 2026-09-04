import { useState } from 'react'
import { useGame } from '../game/gameStore'

interface DecisionSceneProps {
  onBack: () => void
}

const decisions = [
  { id: 'cleanup', icon: '✦', title: 'Спланировать уборку', detail: 'Направить волонтёров в зону сигнала мусора', correct: true },
  { id: 'ignore', icon: '—', title: 'Оставить без внимания', detail: 'Считать сигнал случайным и ждать', correct: false },
  { id: 'search', icon: '⌁', title: 'Искать наугад', detail: 'Отправить команду без координат ДЗЗ', correct: false },
]

export function DecisionScene({ onBack }: DecisionSceneProps) {
  const { dispatch } = useGame()
  const [feedback, setFeedback] = useState<string | null>(null)

  const choose = (decision: (typeof decisions)[number]) => {
    if (decision.correct) {
      dispatch({ type: 'MAKE_DECISION', decision: decision.id })
      return
    }
    setFeedback('Это решение не использует данные наблюдения. Слой ДЗЗ уже показал, где сосредоточен мусор: направь команду точно в зону сигнала.')
    dispatch({ type: 'MAKE_DECISION', decision: decision.id })
  }

  return (
    <main className="decision-scene scene-page">
      <div className="analysis-header"><button className="back-button" type="button" onClick={onBack}>← <span>Анализ</span></button><span className="decision-step">ШАГ 03 / 03</span></div>
      <div className="decision-hero"><div className="decision-orbit"><span>41</span><small>% СИГНАЛ</small><i /></div><span className="eyebrow">СЛОЙ ДЗЗ ИНТЕРПРЕТИРОВАН</span><h1>Как помочь<br /><em>этому берегу?</em></h1><p>Выбери действие, которое превратит наблюдение из космоса в реальную полевую работу.</p></div>
      <div className="decision-options">
        {decisions.map((decision, index) => <button className="decision-option" type="button" key={decision.id} onClick={() => choose(decision)}><span className="option-index">0{index + 1}</span><span className="option-icon">{decision.icon}</span><span className="option-copy"><strong>{decision.title}</strong><small>{decision.detail}</small></span><span className="option-arrow">→</span></button>)}
      </div>
      {feedback && <div className="decision-feedback"><span>!</span><p>{feedback}</p><button type="button" onClick={() => setFeedback(null)} aria-label="Скрыть подсказку">×</button></div>}
      <div className="decision-tip"><span>TIP</span> Хороший план уборки начинается с точных координат, а не с поиска наугад.</div>
    </main>
  )
}
