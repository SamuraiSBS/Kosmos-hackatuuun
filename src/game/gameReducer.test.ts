import { describe, expect, it } from 'vitest'
import { applyResolvedZone, gameReducer, initialGameState } from './gameReducer'

describe('game reducer', () => {
  it('resolves polluted and watch tiles without mutating the source', () => {
    const nextZones = applyResolvedZone(initialGameState.zoneStates)
    const original = initialGameState.zoneStates['zone-north']
    const resolved = nextZones['zone-north']

    expect(original[0][0]).toBe('polluted')
    expect(original[0][2]).toBe('watch')
    expect(resolved[0][0]).toBe('restored')
    expect(resolved[0][2]).toBe('clear')
    expect(resolved[4][4]).toBe('clear')
    expect(resolved).not.toBe(original)
  })

  it('awards XP only once', () => {
    const completed = gameReducer(initialGameState, { type: 'APPLY_SUCCESS' })
    const repeated = gameReducer(completed, { type: 'APPLY_SUCCESS' })

    expect(completed.xp).toBe(240)
    expect(completed.coastHealth).toBe(86)
    expect(completed.missionCompleted).toBe(true)
    expect(repeated).toBe(completed)
    expect(repeated.xp).toBe(240)
  })

  it('keeps the coastal mission sequence explicit', () => {
    const started = gameReducer(initialGameState, { type: 'COMPLETE_INTRO' })
    const selected = gameReducer(started, { type: 'SELECT_ZONE', zoneId: 'zone-north' })
    const analysing = gameReducer(selected, { type: 'OPEN_ANALYSIS' })
    const found = gameReducer(analysing, { type: 'ANALYSIS_COMPLETE' })
    const wrong = gameReducer(found, { type: 'MAKE_DECISION', decision: 'ignore' })

    expect(started.scene).toBe('MAP')
    expect(selected.scene).toBe('MISSION')
    expect(analysing.selectedZone).toBe('zone-north')
    expect(found.missionProgress).toBe('decision')
    expect(wrong.scene).toBe('DECISION')
  })

  it('does not allow analysis or decisions to bypass the observation step', () => {
    const beforeIntro = gameReducer(initialGameState, { type: 'OPEN_ANALYSIS' })
    const afterIntro = gameReducer(gameReducer(initialGameState, { type: 'COMPLETE_INTRO' }), { type: 'OPEN_ANALYSIS' })
    const beforeAnalysis = gameReducer(
      gameReducer(gameReducer(initialGameState, { type: 'COMPLETE_INTRO' }), { type: 'SELECT_ZONE', zoneId: 'zone-north' }),
      { type: 'OPEN_DECISION' },
    )

    expect(beforeIntro).toBe(initialGameState)
    expect(afterIntro.scene).toBe('MAP')
    expect(beforeAnalysis.scene).toBe('MISSION')
  })

  it('derives the decision result from mission rules, not caller input', () => {
    const ready = gameReducer(
      gameReducer(
        gameReducer(gameReducer(initialGameState, { type: 'COMPLETE_INTRO' }), { type: 'SELECT_ZONE', zoneId: 'zone-north' }),
        { type: 'OPEN_ANALYSIS' },
      ),
      { type: 'ANALYSIS_COMPLETE' },
    )
    const wrong = gameReducer(ready, { type: 'MAKE_DECISION', decision: 'ignore' })
    const right = gameReducer(ready, { type: 'MAKE_DECISION', decision: 'cleanup' })

    expect(wrong.scene).toBe('DECISION')
    expect(right.scene).toBe('RESULT')
  })

  it('fully resets mission progress and zone state', () => {
    const completed = gameReducer(initialGameState, { type: 'APPLY_SUCCESS' })
    const reset = gameReducer(completed, { type: 'RESET' })

    expect(reset.scene).toBe('LOADING')
    expect(reset.xp).toBe(120)
    expect(reset.coastHealth).toBe(72)
    expect(reset.introCompleted).toBe(false)
    expect(reset.missionCompleted).toBe(false)
    expect(reset.resultApplied).toBe(false)
    expect(reset.zoneStates['zone-north'][0][0]).toBe('polluted')
    expect(reset.zoneStates['zone-north'][0][2]).toBe('watch')
  })

})
