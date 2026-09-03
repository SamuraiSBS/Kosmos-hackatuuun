import type { CSSProperties } from 'react'
import type { FieldId, FieldState } from '../../game/types'
import { FieldTile } from '../FieldTile/FieldTile'

interface FieldProps {
  fieldId: FieldId
  states: FieldState[][]
  label: string
  locked?: boolean
  completed?: boolean
  highlighted?: boolean
  style?: CSSProperties
  onClick: () => void
}

export function Field({ fieldId, states, label, locked = false, completed = false, highlighted = false, style, onClick }: FieldProps) {
  return (
    <button
      className={`field-object ${locked ? 'is-locked' : ''} ${completed ? 'is-completed' : ''} ${highlighted ? 'is-highlighted' : ''}`}
      type="button"
      onClick={onClick}
      style={style}
      data-field-id={fieldId}
      aria-label={locked ? `${label}, заблокировано` : completed ? `${label}, стабилизировано` : `${label}, открыть участок`}
    >
      <span className="field-label"><b>{label}</b><small>{locked ? 'ДОСТУП ПОЗЖЕ' : completed ? 'СТАБИЛИЗИРОВАНО' : '5×5 СЕКТОРОВ'}</small></span>
      <span className="field-grid" aria-hidden="true">
        {states.flatMap((row, rowIndex) => row.map((state, columnIndex) => <FieldTile key={`${rowIndex}-${columnIndex}`} state={state} index={rowIndex * row.length + columnIndex} />))}
      </span>
      {locked ? <span className="lock-overlay"><span>▣</span><b>LOCKED</b></span> : highlighted && <span className="mission-marker"><i />АНОМАЛИЯ</span>}
    </button>
  )
}
