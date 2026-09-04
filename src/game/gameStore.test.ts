import { afterEach, describe, expect, it, vi } from 'vitest'
import { initialGameState } from './gameReducer'
import { loadGameState, saveGameState } from './gameStore'

describe('game store persistence', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('drops a completed run left by an earlier browser session', () => {
    const removeItem = vi.fn()
    vi.stubGlobal('window', {
      localStorage: {
        getItem: vi.fn(() => JSON.stringify({ missionCompleted: true, resultApplied: true })),
        removeItem,
      },
    })

    expect(loadGameState()).toBe(initialGameState)
    expect(removeItem).toHaveBeenCalledWith('clean-coast-edu-state')
  })

  it('clears storage when the current run is completed', () => {
    const removeItem = vi.fn()
    const setItem = vi.fn()
    vi.stubGlobal('window', {
      localStorage: { removeItem, setItem },
    })

    saveGameState({ ...initialGameState, missionCompleted: true })

    expect(removeItem).toHaveBeenCalledWith('clean-coast-edu-state')
    expect(setItem).not.toHaveBeenCalled()
  })

  it('persists an unfinished run without the transient scene', () => {
    const setItem = vi.fn()
    vi.stubGlobal('window', {
      localStorage: { removeItem: vi.fn(), setItem },
    })

    saveGameState({ ...initialGameState, scene: 'ANALYSIS', introCompleted: true, selectedZone: 'zone-north' })

    const [, payload] = setItem.mock.calls[0]
    const saved = JSON.parse(payload as string) as Record<string, unknown>
    expect(saved.scene).toBeUndefined()
    expect(saved.introCompleted).toBe(true)
    expect(saved.selectedZone).toBe('zone-north')
  })

  it('falls back to safe 5x5 zones when persisted data is malformed', () => {
    vi.stubGlobal('window', {
      localStorage: {
        getItem: vi.fn(() => JSON.stringify({ introCompleted: true, zoneStates: { 'zone-north': [['broken']] } })),
        removeItem: vi.fn(),
      },
    })

    const restored = loadGameState()

    expect(restored.scene).toBe('MAP')
    expect(restored.zoneStates['zone-north']).toHaveLength(5)
    expect(restored.zoneStates['zone-north'][0]).toHaveLength(5)
    expect(restored.zoneStates['zone-north'][0][0]).toBe('polluted')
    expect(restored.zoneStates['zone-west']).toHaveLength(5)
    expect(restored.zoneStates['zone-east']).toHaveLength(5)
  })
})
