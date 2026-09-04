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
})
