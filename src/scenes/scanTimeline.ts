export const SCAN_TIMINGS = {
  analysing: 700,
  found: 1450,
  ready: 1950,
} as const

export type ScanTimelinePhase = 'receiving' | 'analysing' | 'found' | 'ready'

export function getScanPhase(elapsedMs: number, dataReady: boolean): ScanTimelinePhase {
  if (elapsedMs < SCAN_TIMINGS.analysing) return 'receiving'
  if (elapsedMs < SCAN_TIMINGS.found) return 'analysing'
  if (elapsedMs < SCAN_TIMINGS.ready || !dataReady) return 'found'
  return 'ready'
}
