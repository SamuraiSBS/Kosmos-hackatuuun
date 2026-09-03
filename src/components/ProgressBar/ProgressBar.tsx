interface ProgressBarProps {
  value: number
  label?: string
  tone?: 'green' | 'blue'
}

export function ProgressBar({ value, label, tone = 'green' }: ProgressBarProps) {
  return (
    <div className="progress-wrap">
      {label && <span className="progress-label">{label}</span>}
      <div className={`progress-track progress-${tone}`} aria-label={`${value}%`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <span className="progress-fill" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
      <strong className="progress-value">{value}%</strong>
    </div>
  )
}

