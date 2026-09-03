import { useEffect, useState } from 'react'
import { useGame } from '../game/gameStore'
import { ProgressBar } from '../components/ProgressBar/ProgressBar'
import { FieldTile } from '../components/FieldTile/FieldTile'
import type { FieldState } from '../game/types'

interface ResultSceneProps {
  onReturn: () => void
}

const TILE_STEP_MS = 55
const ANIMATION_START_DELAY_MS = 120
const ANIMATION_FINISH_DELAY_MS = 180

const cloneField = (field: FieldState[][]): FieldState[][] => field.map((row) => [...row])

const resolveTile = (state: FieldState): FieldState => {
  if (state === 'critical') return 'resolved'
  if (state === 'warning') return 'healthy'
  return state
}

const resolvePreviewTile = (field: FieldState[][], tileIndex: number): FieldState[][] => {
  let currentIndex = 0
  return field.map((row) => row.map((tile) => {
    const nextTile = currentIndex === tileIndex ? resolveTile(tile) : tile
    currentIndex += 1
    return nextTile
  }))
}

export function ResultScene({ onReturn }: ResultSceneProps) {
  const { state, dispatch } = useGame()
  const [tileAnimation, setTileAnimation] = useState(!state.resultApplied)
  const [previewStates, setPreviewStates] = useState<FieldState[][]>(() => cloneField(state.fieldStates['field-a']))

  useEffect(() => {
    if (state.resultApplied) {
      setPreviewStates(cloneField(state.fieldStates['field-a']))
      setTileAnimation(false)
      return
    }

    let cancelled = false
    let tileIndex = 0
    const sourceField = cloneField(state.fieldStates['field-a'])
    const timers: number[] = []

    setPreviewStates(sourceField)
    setTileAnimation(true)

    const animateNextTile = () => {
      if (cancelled) return
      const totalTiles = sourceField.reduce((total, row) => total + row.length, 0)
      if (tileIndex >= totalTiles) {
        timers.push(window.setTimeout(() => {
          if (cancelled) return
          dispatch({ type: 'APPLY_SUCCESS' })
          setTileAnimation(false)
        }, ANIMATION_FINISH_DELAY_MS))
        return
      }

      const currentTile = tileIndex
      tileIndex += 1
      setPreviewStates((current) => resolvePreviewTile(current, currentTile))
      timers.push(window.setTimeout(animateNextTile, TILE_STEP_MS))
    }

    timers.push(window.setTimeout(animateNextTile, ANIMATION_START_DELAY_MS))
    return () => {
      cancelled = true
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [dispatch, state.resultApplied])

  const oldHealth = 72
  const newHealth = state.resultApplied ? state.farmHealth : oldHealth

  return (
    <main className={`result-scene scene-page ${tileAnimation ? 'is-updating' : 'is-complete'}`}>
      <div className="result-stars" aria-hidden="true"><span>✦</span><span>✧</span><span>✦</span></div>
      <div className="result-badge">{tileAnimation ? 'СИНХРОНИЗАЦИЯ' : 'МИССИЯ ВЫПОЛНЕНА'}</div>
      <div className="result-icon"><span>✓</span></div>
      <h1>{tileAnimation ? 'Стабилизация<br /><em>участка...</em>' : 'Решение<br /><em>принято</em>'}</h1>
      <p className="result-subtitle">{tileAnimation ? 'Применяем решение к полю A-04' : 'Состояние участка улучшилось'}</p>
      <div className="result-field-preview-wrap">
        <span className="result-preview-label">СОСТОЯНИЕ ПОЛЯ A-04</span>
        <div className={`result-field-preview ${tileAnimation ? 'is-animating' : ''}`} aria-label="Предпросмотр изменения поля">
          {previewStates.flatMap((row, rowIndex) => row.map((fieldState, columnIndex) => (
            <FieldTile key={`${rowIndex}-${columnIndex}`} state={fieldState} index={rowIndex * row.length + columnIndex} />
          )))}
        </div>
      </div>
      <div className="health-change"><div><span>FARM HEALTH</span><strong>{oldHealth}%</strong></div><div className="health-arrow">→</div><div className="health-new"><span>FARM HEALTH</span><strong>{newHealth}%</strong></div></div>
      <ProgressBar value={newHealth} label="СОСТОЯНИЕ ХОЗЯЙСТВА" />
      <div className="result-reward"><span className="reward-star">✦</span><div><span>НАГРАДА ЗА АНАЛИЗ</span><strong>{state.resultApplied ? '+120 XP' : '...'}</strong></div></div>
      <button className="primary-button full-button" type="button" onClick={onReturn} disabled={!state.resultApplied}>{state.resultApplied ? 'Вернуться на карту' : 'Обновляем поле…'} <span>→</span></button>
    </main>
  )
}
