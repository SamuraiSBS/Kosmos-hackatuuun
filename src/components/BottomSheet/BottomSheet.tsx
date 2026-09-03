import type { ReactNode } from 'react'

interface BottomSheetProps {
  title: string
  eyebrow?: string
  onClose: () => void
  children: ReactNode
  actionLabel?: string
  onAction?: () => void
}

export function BottomSheet({ title, eyebrow, onClose, children, actionLabel, onAction }: BottomSheetProps) {
  return (
    <div className="sheet-layer" role="presentation">
      <button className="sheet-backdrop" type="button" onClick={onClose} aria-label="Закрыть карточку" />
      <section className="bottom-sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <div className="sheet-handle" />
        <div className="sheet-heading">
          <div>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2 id="sheet-title">{title}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Закрыть">×</button>
        </div>
        <div className="sheet-content">{children}</div>
        {actionLabel && onAction && <button className="primary-button sheet-action" type="button" onClick={onAction}>{actionLabel}<span>→</span></button>}
      </section>
    </div>
  )
}

