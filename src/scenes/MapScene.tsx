import { useState } from 'react'
import { useGame } from '../game/gameStore'
import { mapZones, mapObjects, roadTiles, TILE_SIZE } from '../game/mapConfig'
import type { ZoneId } from '../game/types'
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
  const selectZone = (zoneId: ZoneId) => {
    if (state.missionCompleted && zoneId === 'zone-north') {
      onToast('Миссия уже выполнена. Северная линия очищена.')
      return
    }
    if (zoneId !== 'zone-north') {
      onToast('Эта зона берега станет доступна позже.')
      return
    }
    dispatch({ type: 'SELECT_ZONE', zoneId })
  }

  const openStation = () => {
    if (!state.introCompleted) {
      onToast('Сначала установи связь с помощником и открой сигнал на карте.')
      return
    }
    if (!state.missionCompleted && !state.selectedZone) {
      onToast('Сначала открой подсвеченную зону: данные ДЗЗ нужны до полевого выезда.')
      return
    }
    onOpenAnalysis()
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
          <div className="map-caption"><span>СЕКТОР 07 / ДЗЗ</span><strong>БЕРЕГОВАЯ ЛИНИЯ</strong></div>
        <div className="map-world" style={{ transform: `translate(calc(-50% + ${mapOffset.x}px), calc(-50% + ${mapOffset.y}px)) scale(.8)` }}>
          <div className="map-grid-lines" aria-hidden="true" />
          {roadTiles.map(([x, y]) => <GameAsset key={`${x}-${y}`} asset="road" showLabel={false} className="road-tile" style={{ left: x * TILE_SIZE, top: y * TILE_SIZE }} />)}
          {mapObjects.map((object) => {
            const style = { left: object.x * TILE_SIZE, top: object.y * TILE_SIZE }
            if (object.id === 'shoreline') return <GameAsset key={object.id} asset={object.asset} showLabel={false} className="map-decor water-object" style={style} />
            if (object.id.startsWith('tree')) return <GameAsset key={object.id} asset={object.asset} showLabel={false} className={`map-decor tree-object tree-${object.size ?? 'medium'}`} style={style} />
            if (object.id === 'driftwood') return <GameAsset key={object.id} asset={object.asset} showLabel={false} className="map-decor debris-object" style={style} />
            if (object.id === 'ranger-post') return <button key={object.id} className="map-building ranger-post-object" type="button" style={style} onClick={() => onToast('Полевой штаб волонтёров готовит выезд.') }><GameAsset asset="ranger-post" /></button>
            return <button key={object.id} className="map-building station-object" type="button" style={style} onClick={openStation}><GameAsset asset="satellite-station" /></button>
          })}
          {mapZones.map((zone) => (
            <Field
              key={zone.id}
              zoneId={zone.id}
              label={zone.label}
              locked={zone.locked}
              completed={zone.id === 'zone-north' && state.missionCompleted}
              states={state.zoneStates[zone.id]}
              highlighted={zone.id === 'zone-north' && isMissionActive}
              style={{ left: zone.x * TILE_SIZE, top: zone.y * TILE_SIZE }}
              onClick={() => selectZone(zone.id)}
            />
          ))}
          <div className="map-grass grass-one"><GameAsset asset="grass" showLabel={false} /></div>
          <div className="map-grass grass-two"><GameAsset asset="grass" showLabel={false} /></div>
          <div className="player-marker"><GameAsset asset="player-idle" /><span className="player-name">ТЫ</span></div>
        </div>
        <div className="map-bottom-hint"><span className="drag-icon">{state.missionCompleted ? '✓' : '!'}</span> {state.missionCompleted ? 'Северная линия очищена · осматривай берег' : 'Открой сигнал мусора · осматривай берег'}</div>
        <div className="map-legend" aria-label="Легенда состояния берега"><span><i className="legend-dot legend-critical" /> сигнал</span><span><i className="legend-dot legend-watch" /> наблюдение</span><span><i className="legend-dot legend-healthy" /> чисто</span><span><i className="legend-dot legend-restored" /> после уборки</span></div>
      </div>
    </div>
  )
}
