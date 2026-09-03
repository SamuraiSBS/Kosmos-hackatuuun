export type AssetId =
  | 'player-idle'
  | 'player-walk-up'
  | 'player-walk-down'
  | 'player-walk-left'
  | 'player-walk-right'
  | 'npc-helper'
  | 'tree-01'
  | 'tree-02'
  | 'field-healthy'
  | 'field-warning'
  | 'field-critical'
  | 'field-resolved'
  | 'house'
  | 'satellite-station'
  | 'water'
  | 'road'
  | 'grass'

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
  'player-idle': { type: 'placeholder', label: 'YOU', accent: 'violet' },
  'player-walk-up': { type: 'placeholder', label: 'YOU', accent: 'violet' },
  'player-walk-down': { type: 'placeholder', label: 'YOU', accent: 'violet' },
  'player-walk-left': { type: 'placeholder', label: 'YOU', accent: 'violet' },
  'player-walk-right': { type: 'placeholder', label: 'YOU', accent: 'violet' },
  'npc-helper': { type: 'placeholder', label: 'GUIDE', accent: 'cyan' },
  'tree-01': { type: 'placeholder', label: 'TREE', accent: 'green' },
  'tree-02': { type: 'placeholder', label: 'TREE', accent: 'green-dark' },
  'field-healthy': { type: 'placeholder', label: 'FIELD', accent: 'healthy' },
  'field-warning': { type: 'placeholder', label: 'FIELD', accent: 'warning' },
  'field-critical': { type: 'placeholder', label: 'FIELD', accent: 'critical' },
  'field-resolved': { type: 'placeholder', label: 'FIELD', accent: 'resolved' },
  house: { type: 'placeholder', label: 'HOUSE', accent: 'house' },
  'satellite-station': { type: 'placeholder', label: 'SAT', accent: 'satellite' },
  water: { type: 'placeholder', label: 'WATER', accent: 'water' },
  road: { type: 'placeholder', label: 'ROAD', accent: 'road' },
  grass: { type: 'placeholder', label: 'GRASS', accent: 'grass' },
}
