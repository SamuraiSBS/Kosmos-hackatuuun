import { describe, expect, it } from 'vitest'
import { getScanPhase, SCAN_TIMINGS } from './scanTimeline'

describe('scan timeline', () => {
  it('keeps the documented phase order', () => {
    expect(getScanPhase(0, false)).toBe('receiving')
    expect(getScanPhase(SCAN_TIMINGS.analysing - 1, false)).toBe('receiving')
    expect(getScanPhase(SCAN_TIMINGS.analysing, false)).toBe('analysing')
    expect(getScanPhase(SCAN_TIMINGS.found - 1, false)).toBe('analysing')
    expect(getScanPhase(SCAN_TIMINGS.found, false)).toBe('found')
    expect(getScanPhase(SCAN_TIMINGS.ready - 1, true)).toBe('found')
    expect(getScanPhase(SCAN_TIMINGS.ready, true)).toBe('ready')
  })

  it('does not become ready before data is received', () => {
    expect(getScanPhase(SCAN_TIMINGS.ready, false)).toBe('found')
    expect(getScanPhase(SCAN_TIMINGS.ready + 1000, false)).toBe('found')
  })
})
