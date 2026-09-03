import { describe, expect, it } from 'vitest'
import { applyResolvedField, gameReducer, initialGameState } from './gameReducer'

describe('game reducer', () => {
  it('resolves critical and warning tiles without mutating the source', () => {
    const nextFields = applyResolvedField(initialGameState.fieldStates)
    const original = initialGameState.fieldStates['field-a']
    const resolved = nextFields['field-a']

    expect(original[0][0]).toBe('critical')
    expect(original[0][2]).toBe('warning')
    expect(resolved[0][0]).toBe('resolved')
    expect(resolved[0][2]).toBe('healthy')
    expect(resolved[4][4]).toBe('healthy')
    expect(resolved).not.toBe(original)
  })

  it('awards XP only once', () => {
    const completed = gameReducer(initialGameState, { type: 'APPLY_SUCCESS' })
    const repeated = gameReducer(completed, { type: 'APPLY_SUCCESS' })

    expect(completed.xp).toBe(240)
    expect(completed.farmHealth).toBe(86)
    expect(completed.missionCompleted).toBe(true)
    expect(repeated).toBe(completed)
    expect(repeated.xp).toBe(240)
  })

  it('fully resets mission progress and field state', () => {
    const completed = gameReducer(initialGameState, { type: 'APPLY_SUCCESS' })
    const reset = gameReducer(completed, { type: 'RESET' })

    expect(reset.scene).toBe('LOADING')
    expect(reset.xp).toBe(120)
    expect(reset.farmHealth).toBe(72)
    expect(reset.introCompleted).toBe(false)
    expect(reset.missionCompleted).toBe(false)
    expect(reset.resultApplied).toBe(false)
    expect(reset.fieldStates['field-a'][0][0]).toBe('critical')
    expect(reset.fieldStates['field-a'][0][2]).toBe('warning')
  })
})
