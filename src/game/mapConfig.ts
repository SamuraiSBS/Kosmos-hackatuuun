import type { AssetId } from './assetRegistry'
import type { ZoneId } from './types'

export const TILE_SIZE = 32
export const MAP_TILES = 26

export interface MapObject {
  id: string
  asset: AssetId
  x: number
  y: number
  size?: 'small' | 'medium' | 'large'
}

export interface MapZoneConfig {
  id: ZoneId
  label: string
  x: number
  y: number
  locked: boolean
}

export const mapZones: MapZoneConfig[] = [
  { id: 'zone-west', label: 'ЗОНА B', x: 3, y: 3, locked: true },
  { id: 'zone-north', label: 'ЗОНА A', x: 10, y: 6, locked: false },
  { id: 'zone-east', label: 'ЗОНА C', x: 15, y: 15, locked: true },
]

export const mapObjects: MapObject[] = [
  { id: 'ranger-post', asset: 'ranger-post', x: 4, y: 4, size: 'large' },
  { id: 'station', asset: 'satellite-station', x: 15, y: 4, size: 'large' },
  { id: 'shoreline', asset: 'water', x: 2, y: 15, size: 'large' },
  { id: 'tree-1', asset: 'tree-01', x: 2, y: 3, size: 'medium' },
  { id: 'tree-2', asset: 'tree-02', x: 20, y: 3, size: 'medium' },
  { id: 'tree-3', asset: 'tree-01', x: 21, y: 14, size: 'medium' },
  { id: 'driftwood', asset: 'debris-pile', x: 3, y: 21, size: 'medium' },
  { id: 'tree-5', asset: 'tree-01', x: 20, y: 20, size: 'medium' },
  { id: 'tree-6', asset: 'tree-02', x: 23, y: 9, size: 'small' },
]

export const roadTiles = [
  [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [13, 3], [14, 3],
  [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10], [8, 11], [8, 12], [8, 13], [8, 14], [8, 15], [8, 16], [8, 17],
  [9, 17], [10, 17], [11, 17], [12, 17], [13, 17], [14, 17], [15, 17], [16, 17],
]
