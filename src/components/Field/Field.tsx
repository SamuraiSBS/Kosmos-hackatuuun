import type { CSSProperties } from 'react'
import type { ZoneId, ZoneState } from '../../game/types'
import { FieldTile } from '../FieldTile/FieldTile'

interface FieldProps {
  zoneId: ZoneId
  states: ZoneState[][]
  label: string
  locked?: boolean
  completed?: boolean
  highlighted?: boolean
  style?: CSSProperties
  onClick: () => void
}

export function Field({ zoneId, states, label, locked = false, completed = false, highlighted = false, style, onClick }: FieldProps) {
  return (
    <button
      className={`zone-object ${locked ? 'is-locked' : ''} ${completed ? 'is-completed' : ''} ${highlighted ? 'is-highlighted' : ''}`}
      type="button"
      onClick={onClick}
      style={style}
      data-zone-id={zoneId}
      aria-label={locked ? `${label}, заблокировано` : completed ? `${label}, восстановлено` : `${label}, открыть зону`}
    >
      <span className="zone-label"><b>{label}</b><small>{locked ? 'ДОСТУП ПОЗЖЕ' : completed ? 'БЕРЕГ ВОССТАНОВЛЕН' : '5×5 ЯЧЕЕК ДЗЗ'}</small></span>
      <span className="zone-grid" aria-hidden="true">
        {states.flatMap((row, rowIndex) => row.map((state, columnIndex) => <FieldTile key={`${rowIndex}-${columnIndex}`} state={state} index={rowIndex * row.length + columnIndex} />))}
      </span>
      {locked ? <span className="lock-overlay"><span>▣</span><b>LOCKED</b></span> : highlighted && <span className="mission-marker"><i />СИГНАЛ МУСОРА</span>}
    </button>
  )
}
