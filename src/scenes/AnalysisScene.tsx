import { useEffect, useMemo, useState } from 'react'
import { getFieldAnalysis, type SatelliteData } from '../services/satelliteService'
import { useGame } from '../game/gameStore'
import { FieldTile } from '../components/FieldTile/FieldTile'
import type { FieldState } from '../game/types'
import { getScanPhase, SCAN_TIMINGS } from './scanTimeline'

interface AnalysisSceneProps {
  onBack: () => void
  onChooseDecision: () => void
}

type ScanPhase = 'receiving' | 'analysing' | 'found' | 'ready' | 'error'

const phaseCopy: Record<ScanPhase, string> = {
  receiving: 'Получение спутниковых данных...',
  analysing: 'Анализ участка...',
  found: 'Аномалия обнаружена',
  ready: 'Снимок готов к изучению',
  error: 'Не удалось получить данные',
}

export function AnalysisScene({ onBack, onChooseDecision }: AnalysisSceneProps) {
  const { state, dispatch } = useGame()
  const fieldId = state.selectedField ?? 'field-a'
  const [phase, setPhase] = useState<ScanPhase>('receiving')
  const [data, setData] = useState<SatelliteData | null>(null)
  const [scanAttempt, setScanAttempt] = useState(0)
  const field = state.fieldStates[fieldId]
  const grid = useMemo(() => field ?? state.fieldStates['field-a'], [field, state.fieldStates])

  useEffect(() => {
    let cancelled = false
    let dataReceived = false
    let analysisCompleted = false
    let failed = false
    const startedAt = Date.now()

    setPhase('receiving')
    setData(null)

    const completeAnalysis = () => {
      if (cancelled || !dataReceived || getScanPhase(Date.now() - startedAt, dataReceived) !== 'ready' || analysisCompleted) return
      analysisCompleted = true
      setPhase('ready')
      dispatch({ type: 'ANALYSIS_COMPLETE' })
    }

    const phaseTwo = window.setTimeout(() => {
      if (!cancelled && !failed) setPhase(getScanPhase(SCAN_TIMINGS.analysing, dataReceived))
    }, SCAN_TIMINGS.analysing)
    const phaseThree = window.setTimeout(() => {
      if (!cancelled && !failed) setPhase(getScanPhase(SCAN_TIMINGS.found, dataReceived))
    }, SCAN_TIMINGS.found)
    const phaseReady = window.setTimeout(() => {
      if (cancelled || failed) return
      completeAnalysis()
    }, SCAN_TIMINGS.ready)

    getFieldAnalysis(fieldId)
      .then((result) => {
        if (cancelled) return
        dataReceived = true
        setData(result)
        completeAnalysis()
      })
      .catch(() => {
        if (!cancelled) {
          failed = true
          setPhase('error')
        }
      })

    return () => {
      cancelled = true
      window.clearTimeout(phaseTwo)
      window.clearTimeout(phaseThree)
      window.clearTimeout(phaseReady)
    }
  }, [dispatch, fieldId, scanAttempt])

  const displayData = data
  const highlighted = fieldId === 'field-a'

  return (
    <main className="analysis-scene scene-page">
      <div className="analysis-header">
        <button className="back-button" type="button" onClick={onBack}>← <span>Карта</span></button>
        <div className="scanner-signal"><i /> ORBIT PASS 07</div>
      </div>
      <div className="scanner-title"><span className="eyebrow">SATELLITE / SPECTRAL VIEW</span><h1>Спутниковый<br /><em>сканер</em></h1><span className="sector-id">УЧАСТОК {displayData?.sector ?? 'A-04'} <i>•</i> СЕВЕР</span></div>
      <section className={`scanner-viewport scan-${phase}`}>
        <div className="scanner-corner corner-tl" /><div className="scanner-corner corner-tr" /><div className="scanner-corner corner-bl" /><div className="scanner-corner corner-br" />
        <div className="sat-image-grid" aria-label="Спутниковый снимок участка">
          {grid.flatMap((row, rowIndex) => row.map((tile, columnIndex) => {
            const isProblem = highlighted && rowIndex < 2 && columnIndex < 3
            const state: FieldState = isProblem ? (columnIndex < 2 ? 'critical' : 'warning') : tile
            return <FieldTile key={`${rowIndex}-${columnIndex}`} state={state} index={rowIndex * row.length + columnIndex} />
          }))}
        </div>
        <div className="scan-overlay scan-crosshair"><span /><i /></div>
        <div className="scan-line" />
        <div className="scan-badge"><span className="status-dot" />{phaseCopy[phase]}</div>
        <div className="scanner-meta"><span>NDVI <b>0.68</b></span><span>RES <b>10m</b></span><span>☼ <b>clear</b></span></div>
      </section>
      {phase === 'error' ? (
        <div className="scan-waiting scan-error"><p>Не удалось получить спутниковые данные.</p><button className="secondary-button" type="button" onClick={() => setScanAttempt((attempt) => attempt + 1)}>Повторить</button></div>
      ) : phase !== 'ready' || !displayData ? (
        <div className="scan-waiting"><span className="loading-bars"><i /><i /><i /></span><p>Система собирает данные<br />о состоянии растений</p></div>
      ) : (
        <div className="analysis-results">
          <div className="metrics-grid">
            <Metric label="Растения" value={`${displayData.vegetation}%`} tone="green" />
            <Metric label="Влажность" value={`${displayData.moisture}%`} tone="blue" />
            <Metric label="Индекс NDVI" value={`${displayData.vegetationChange}%`} tone="orange" />
            <Metric label="Риск" value={displayData.risk} tone="red" />
          </div>
          <div className="analysis-finding"><span className="finding-icon">!</span><div><span className="eyebrow">ПРЕДПОЛАГАЕМАЯ ПРОБЛЕМА</span><h2>{displayData.issueTitle}</h2><p>{displayData.issueDescription}</p></div></div>
          <button className="primary-button full-button" type="button" onClick={onChooseDecision}>Выбрать решение <span>→</span></button>
        </div>
      )}
    </main>
  )
}

function Metric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return <div className={`metric metric-${tone}`}><span>{label}</span><strong>{value}</strong><i /></div>
}
