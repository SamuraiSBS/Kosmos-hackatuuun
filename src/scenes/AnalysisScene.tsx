import { useEffect, useMemo, useState } from 'react'
import { getZoneAnalysis, type SatelliteData } from '../services/satelliteService'
import { useGame } from '../game/gameStore'
import { FieldTile } from '../components/FieldTile/FieldTile'
import { GameAsset } from '../components/GameAsset/GameAsset'
import type { ZoneState } from '../game/types'
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
  const zoneId = state.selectedZone ?? 'zone-north'
  const [phase, setPhase] = useState<ScanPhase>('receiving')
  const [data, setData] = useState<SatelliteData | null>(null)
  const [showSignal, setShowSignal] = useState(false)
  const [scanAttempt, setScanAttempt] = useState(0)
  const zone = state.zoneStates[zoneId]
  const grid = useMemo(() => zone ?? state.zoneStates['zone-north'], [zone, state.zoneStates])

  useEffect(() => {
    let cancelled = false
    let dataReceived = false
    let analysisCompleted = false
    let failed = false
    const startedAt = Date.now()

    setPhase('receiving')
    setData(null)
    setShowSignal(false)

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

    getZoneAnalysis(zoneId)
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
  }, [dispatch, zoneId, scanAttempt])

  const displayData = data
  const highlighted = zoneId === 'zone-north'

  return (
    <main className="analysis-scene scene-page">
      <div className="analysis-header">
        <button className="back-button" type="button" onClick={onBack}>← <span>Карта</span></button>
        <div className="scanner-signal"><i /> ORBIT PASS 07</div>
      </div>
      <div className="scanner-title"><span className="eyebrow">ДЗЗ / СЛОЙ НАБЛЮДЕНИЯ</span><h1>Снимок<br /><em>берега</em></h1><span className="sector-id">ЗОНА {displayData?.sector ?? 'A-04'} <i>•</i> СЕВЕР</span></div>
      <section className={`scanner-viewport scan-${phase}`}>
        <div className="scanner-corner corner-tl" /><div className="scanner-corner corner-tr" /><div className="scanner-corner corner-bl" /><div className="scanner-corner corner-br" />
          <GameAsset asset="coast-satellite" className="scanner-raster-base" />
          <div className="sat-image-grid" aria-label="Учебный спутниковый снимок береговой зоны">
          {grid.flatMap((row, rowIndex) => row.map((tile, columnIndex) => {
            const isProblem = highlighted && rowIndex < 2 && columnIndex < 3
            const state: ZoneState = isProblem && !showSignal ? 'clear' : isProblem ? (columnIndex < 2 ? 'polluted' : 'watch') : tile
            return <FieldTile key={`${rowIndex}-${columnIndex}`} state={state} index={rowIndex * row.length + columnIndex} />
          }))}
        </div>
        <div className="scan-overlay scan-crosshair"><span /><i /></div>
        <div className="scan-line" />
        <div className="scan-badge"><span className="status-dot" />{phaseCopy[phase]}</div>
        <div className="scanner-meta"><span>LAYER <b>DZZ</b></span><span>RES <b>10m</b></span><span>☼ <b>clear</b></span></div>
      </section>
      {phase === 'error' ? (
        <div className="scan-waiting scan-error"><p>Не удалось получить спутниковые данные.</p><button className="secondary-button" type="button" onClick={() => setScanAttempt((attempt) => attempt + 1)}>Повторить</button></div>
      ) : phase !== 'ready' || !displayData ? (
        <div className="scan-waiting"><span className="loading-bars"><i /><i /><i /></span><p>Система собирает данные<br />о береговой линии</p></div>
      ) : (
        <div className="analysis-results">
          <div className="metrics-grid">
            <Metric label="Покрытие снимка" value={`${displayData.imageCoverage}%`} tone="green" />
            <Metric label="Сигнал мусора" value={`${displayData.debrisSignal}%`} tone="blue" />
            <Metric label="Рост сигнала" value={`+${displayData.signalChange}%`} tone="orange" />
            <Metric label="Риск" value={displayData.risk} tone="red" />
          </div>
          <div className="layer-explanation"><div><span className="eyebrow">ИНТЕРАКТИВНЫЙ СЛОЙ</span><p>{showSignal ? 'Оранжевые ячейки — участок, который нужно проверить на месте.' : 'Нажми, чтобы увидеть, как ДЗЗ выделяет скопление мусора на снимке.'}</p><small>Наблюдение: {displayData.observation} · учебный снимок</small></div><button className="secondary-button" type="button" aria-pressed={showSignal} onClick={() => setShowSignal((visible) => !visible)}>{showSignal ? 'Скрыть слой' : 'Показать слой'}</button></div>
          {showSignal ? <div className="analysis-finding"><span className="finding-icon">!</span><div><span className="eyebrow">ПРЕДПОЛАГАЕМАЯ ПРОБЛЕМА</span><h2>{displayData.issueTitle}</h2><p>{displayData.issueDescription}</p></div></div> : <div className="analysis-prompt"><span>+</span><p>Сначала сопоставь данные с изображением: так оператор находит точку для полевой проверки.</p></div>}
          {showSignal && <div className="observation-path" aria-label="Как снимок ДЗЗ превращается в полевой выезд"><div className="observation-path-step is-done"><span>01</span><div><strong>СИГНАЛ</strong><small>ДЗЗ заметил</small></div></div><i aria-hidden="true">→</i><div className="observation-path-step is-done"><span>02</span><div><strong>ТОЧКА A-04</strong><small>координаты</small></div></div><i aria-hidden="true">→</i><div className="observation-path-step is-next"><span>03</span><div><strong>ВЫЕЗД</strong><small>уборка</small></div></div></div>}
          <button className="primary-button full-button" type="button" onClick={onChooseDecision} disabled={!showSignal}>Спланировать уборку <span>→</span></button>
        </div>
      )}
    </main>
  )
}

function Metric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return <div className={`metric metric-${tone}`}><span>{label}</span><strong>{value}</strong><i /></div>
}
