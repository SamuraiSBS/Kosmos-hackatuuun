export type AssetId =
  | 'player-idle'
  | 'player-walk-up'
  | 'player-walk-down'
  | 'player-walk-left'
  | 'player-walk-right'
  | 'npc-helper'
  | 'tree-01'
  | 'tree-02'
  | 'coast-clear'
  | 'coast-watch'
  | 'coast-polluted'
  | 'coast-restored'
  | 'ranger-post'
  | 'satellite-station'
  | 'water'
  | 'road'
  | 'grass'
  | 'debris-pile'

export interface PlaceholderAsset {
  type: 'placeholder'
  label: string
  accent: string
}

export interface ImageAsset {
  type: 'image'
  src: string
  alt: string
}

export type AssetDefinition = PlaceholderAsset | ImageAsset

export const assetRegistry: Record<AssetId, AssetDefinition> = {
  'player-idle': { type: 'placeholder', label: 'VOLUNTEER', accent: 'violet' },
  'player-walk-up': { type: 'placeholder', label: 'VOLUNTEER', accent: 'violet' },
  'player-walk-down': { type: 'placeholder', label: 'VOLUNTEER', accent: 'violet' },
  'player-walk-left': { type: 'placeholder', label: 'VOLUNTEER', accent: 'violet' },
  'player-walk-right': { type: 'placeholder', label: 'VOLUNTEER', accent: 'violet' },
  'npc-helper': { type: 'placeholder', label: 'ORBIT GUIDE', accent: 'cyan' },
  'tree-01': { type: 'placeholder', label: 'DUNE', accent: 'green' },
  'tree-02': { type: 'placeholder', label: 'DUNE', accent: 'green-dark' },
  'coast-clear': { type: 'placeholder', label: 'CLEAR', accent: 'clear' },
  'coast-watch': { type: 'placeholder', label: 'WATCH', accent: 'watch' },
  'coast-polluted': { type: 'placeholder', label: 'DEBRIS', accent: 'polluted' },
  'coast-restored': { type: 'placeholder', label: 'RESTORED', accent: 'restored' },
  'ranger-post': { type: 'placeholder', label: 'FIELD TEAM', accent: 'ranger' },
  'satellite-station': { type: 'placeholder', label: 'SAT', accent: 'satellite' },
  water: { type: 'placeholder', label: 'WATER', accent: 'water' },
  road: { type: 'placeholder', label: 'ROAD', accent: 'road' },
  grass: { type: 'placeholder', label: 'COASTAL PLANTS', accent: 'grass' },
  'debris-pile': { type: 'placeholder', label: 'DEBRIS', accent: 'polluted' },
}
