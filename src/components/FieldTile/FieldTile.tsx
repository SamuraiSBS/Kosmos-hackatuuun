import { assetRegistry } from '../../game/assetRegistry'
import type { FieldState } from '../../game/types'
import { GameAsset } from '../GameAsset/GameAsset'

const stateAsset = (state: FieldState) => {
  const map: Record<FieldState, keyof typeof assetRegistry> = {
    healthy: 'field-healthy',
    warning: 'field-warning',
    critical: 'field-critical',
    resolved: 'field-resolved',
  }
  return map[state]
}

export function FieldTile({ state, index }: { state: FieldState; index: number }) {
  return <GameAsset asset={stateAsset(state)} showLabel={false} className={`field-tile state-${state} tile-index-${index}`} ariaLabel={`Тайл ${index + 1}: ${state}`} />
}

