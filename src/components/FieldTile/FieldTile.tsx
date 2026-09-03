import { assetRegistry } from '../../game/assetRegistry'
import type { ZoneState } from '../../game/types'
import { GameAsset } from '../GameAsset/GameAsset'

const stateAsset = (state: ZoneState) => {
  const map: Record<ZoneState, keyof typeof assetRegistry> = {
    clear: 'coast-clear',
    watch: 'coast-watch',
    polluted: 'coast-polluted',
    restored: 'coast-restored',
  }
  return map[state]
}

export function FieldTile({ state, index }: { state: ZoneState; index: number }) {
  return <GameAsset asset={stateAsset(state)} showLabel={false} className={`coast-tile state-${state} tile-index-${index}`} ariaLabel={`Ячейка ${index + 1}: ${state}`} />
}
