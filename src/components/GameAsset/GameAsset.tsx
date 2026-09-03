import type { CSSProperties } from 'react'
import { assetRegistry, type AssetId } from '../../game/assetRegistry'

interface GameAssetProps {
  asset: AssetId
  className?: string
  style?: CSSProperties
  showLabel?: boolean
  ariaLabel?: string
}

export function GameAsset({ asset, className = '', style, showLabel = true, ariaLabel }: GameAssetProps) {
  const definition = assetRegistry[asset]

  if (definition.type === 'image') {
    return <img className={`game-asset ${className}`} src={definition.src} alt={definition.alt} style={style} />
  }

  return (
    <span
      className={`game-asset asset-${asset} accent-${definition.accent} ${className}`}
      style={style}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      {showLabel && <span className="asset-label">{definition.label}</span>}
      {asset.startsWith('tree') && (
        <span className="tree-shape" aria-hidden="true">
          <span className="tree-crown" />
          <span className="tree-trunk" />
        </span>
      )}
      {asset === 'ranger-post' && <span className="ranger-post-shape" aria-hidden="true" />}
      {asset === 'satellite-station' && <span className="station-shape" aria-hidden="true" />}
      {asset === 'debris-pile' && <span className="debris-shape" aria-hidden="true" />}
    </span>
  )
}
