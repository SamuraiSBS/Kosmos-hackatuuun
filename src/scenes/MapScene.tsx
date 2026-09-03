import { useState } from 'react'
import { useGame } from '../game/gameStore'
import { mapFields, mapObjects, roadTiles, TILE_SIZE } from '../game/mapConfig'
import type { FieldId } from '../game/types'
import { GameAsset } from '../components/GameAsset/GameAsset'
import { HUD } from '../components/HUD/HUD'
import { Field } from '../components/Field/Field'

interface MapSceneProps {
  onToast: (message: string) => void
  onOpenAnalysis: () => void
}

export function MapScene({ onToast, onOpenAnalysis }: MapSceneProps) {
  const { state, dispatch } = useGame()
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)

  const isMissionActive = state.introCompleted && !state.missionCompleted
  const selectField = (fieldId: FieldId) => {
    if (state.missionCompleted && fieldId === 'field-a') {
      onToast('Миссия уже выполнена. Северное поле стабилизировано.')
      return
    }
    if (fieldId !== 'field-a') {
      onToast('Эта территория станет доступна позже.')
      return
    }
    dispatch({ type: 'SELECT_FIELD', fieldId })
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (target.closest('button')) return
    setDragStart({ x: event.clientX - mapOffset.x, y: event.clientY - mapOffset.y })
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart) return
    setMapOffset({ x: event.clientX - dragStart.x, y: event.clientY - dragStart.y })
  }

  const stopDragging = () => setDragStart(null)

  return (
    <div className="map-scene scene-page">
      <HUD />
      <div
        className="map-viewport"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        data-dragging={Boolean(dragStart)}
      >
        <div className="map-compass"><span>N</span><i /></div>
        <div className="map-caption"><span>СЕКТОР 07</span><strong>АГРОЗОНА «ЗАРЯ»</strong></div>
        <div className="map-world" style={{ transform: `translate(calc(-50% + ${mapOffset.x}px), calc(-50% + ${mapOffset.y}px)) scale(.8)` }}>
          <div className="map-grid-lines" aria-hidden="true" />
          {roadTiles.map(([x, y]) => <GameAsset key={`${x}-${y}`} asset="road" showLabel={false} className="road-tile" style={{ left: x * TILE_SIZE, top: y * TILE_SIZE }} />)}
          {mapObjects.map((object) => {
            const style = { left: object.x * TILE_SIZE, top: object.y * TILE_SIZE }
            if (object.id === 'water') return <GameAsset key={object.id} asset={object.asset} showLabel={false} className="map-decor water-object" style={style} />
            if (object.id.startsWith('tree')) return <GameAsset key={object.id} asset={object.asset} className={`map-decor tree-object tree-${object.size ?? 'medium'}`} style={style} />
            if (object.id === 'house') return <button key={object.id} className="map-building house-object" type="button" style={style} onClick={() => onToast('Здесь можно отдохнуть после экспедиции.') }><GameAsset asset="house" /></button>
            return <button key={object.id} className="map-building station-object" type="button" style={style} onClick={onOpenAnalysis}><GameAsset asset="satellite-station" /></button>
          })}
          {mapFields.map((field) => (
            <Field
              key={field.id}
              fieldId={field.id}
              label={field.label}
              locked={field.locked}
              completed={field.id === 'field-a' && state.missionCompleted}
              states={state.fieldStates[field.id]}
              highlighted={field.id === 'field-a' && isMissionActive}
              style={{ left: field.x * TILE_SIZE, top: field.y * TILE_SIZE }}
              onClick={() => selectField(field.id)}
            />
          ))}
          <div className="map-grass grass-one"><GameAsset asset="grass" showLabel={false} /></div>
          <div className="map-grass grass-two"><GameAsset asset="grass" showLabel={false} /></div>
          <div className="player-marker"><GameAsset asset="player-idle" /><span className="player-name">ТЫ</span></div>
        </div>
        <div className="map-bottom-hint"><span className="drag-icon">↔</span> Перетаскивай карту, чтобы осмотреться</div>
        <div className="map-legend"><span><i className="legend-dot legend-critical" /> аномалия</span><span><i className="legend-dot legend-healthy" /> в норме</span></div>
      </div>
    </div>
  )
}
