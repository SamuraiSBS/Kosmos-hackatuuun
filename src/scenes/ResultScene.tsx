import { useEffect, useState } from 'react'
import { useGame } from '../game/gameStore'
import { ProgressBar } from '../components/ProgressBar/ProgressBar'
import { FieldTile } from '../components/FieldTile/FieldTile'
import type { ZoneState } from '../game/types'

interface ResultSceneProps {
  onReturn: () => void
}

const TILE_STEP_MS = 55
const ANIMATION_START_DELAY_MS = 120
const ANIMATION_FINISH_DELAY_MS = 180

const cloneZone = (zone: ZoneState[][]): ZoneState[][] => zone.map((row) => [...row])

const resolveTile = (state: ZoneState): ZoneState => {
  if (state === 'polluted') return 'restored'
  if (state === 'watch') return 'clear'
  return state
}

const resolvePreviewTile = (zone: ZoneState[][], tileIndex: number): ZoneState[][] => {
  let currentIndex = 0
  return zone.map((row) => row.map((tile) => {
    const nextTile = currentIndex === tileIndex ? resolveTile(tile) : tile
    currentIndex += 1
    return nextTile
  }))
}

export function ResultScene({ onReturn }: ResultSceneProps) {
  const { state, dispatch } = useGame()
  const [tileAnimation, setTileAnimation] = useState(!state.resultApplied)
  const [previewStates, setPreviewStates] = useState<ZoneState[][]>(() => cloneZone(state.zoneStates['zone-north']))

  useEffect(() => {
    if (state.resultApplied) {
      setPreviewStates(cloneZone(state.zoneStates['zone-north']))
      setTileAnimation(false)
      return
    }

    let cancelled = false
    let tileIndex = 0
    const sourceZone = cloneZone(state.zoneStates['zone-north'])
    const timers: number[] = []

    setPreviewStates(sourceZone)
    setTileAnimation(true)

    const animateNextTile = () => {
      if (cancelled) return
      const totalTiles = sourceZone.reduce((total, row) => total + row.length, 0)
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
  const newHealth = state.resultApplied ? state.coastHealth : oldHealth

  return (
    <main className={`result-scene scene-page ${tileAnimation ? 'is-updating' : 'is-complete'}`}>
      <div className="result-stars" aria-hidden="true"><span>✦</span><span>✧</span><span>✦</span></div>
      <div className="result-badge">{tileAnimation ? 'СИНХРОНИЗАЦИЯ' : 'МИССИЯ ВЫПОЛНЕНА'}</div>
      <div className="result-icon"><span>✓</span></div>
      <h1>{tileAnimation ? 'Очистка<br /><em>участка...</em>' : 'Берег<br /><em>чище</em>'}</h1>
      <p className="result-subtitle">{tileAnimation ? 'Полевой план направлен в зону A-04' : 'Сигнал проверен, зона очищена'}</p>
      <div className="result-zone-preview-wrap">
        <span className="result-preview-label">СОСТОЯНИЕ БЕРЕГА / ZONE A-04</span>
        <div className={`result-zone-preview ${tileAnimation ? 'is-animating' : ''}`} aria-label="Предпросмотр очистки береговой зоны">
          {previewStates.flatMap((row, rowIndex) => row.map((zoneState, columnIndex) => (
            <FieldTile key={`${rowIndex}-${columnIndex}`} state={zoneState} index={rowIndex * row.length + columnIndex} />
          )))}
        </div>
      </div>
      <div className="health-change"><div><span>БЕРЕГ ДО</span><strong>{oldHealth}%</strong></div><div className="health-arrow">→</div><div className="health-new"><span>БЕРЕГ ПОСЛЕ</span><strong>{newHealth}%</strong></div></div>
      <ProgressBar value={newHealth} label="СОСТОЯНИЕ БЕРЕГА" />
      <div className="result-reward"><span className="reward-star">✦</span><div><span>РЕЗУЛЬТАТ ЭКСПЕДИЦИИ</span><strong>{state.resultApplied ? '+120 XP' : '...'}</strong></div></div>
      {state.resultApplied && <div className="educational-payoff"><span>ЧИСТЫЙ БЕРЕГ / ДЗЗ</span><p>Спутниковые снимки помогают выбрать точку для полевой работы; в реальном проекте к данным добавляются исследования побережья и снимки БПЛА.</p></div>}
      <button className="primary-button full-button" type="button" onClick={onReturn} disabled={!state.resultApplied}>{state.resultApplied ? 'Вернуться к берегу' : 'Обновляем зону…'} <span>→</span></button>
    </main>
  )
}
