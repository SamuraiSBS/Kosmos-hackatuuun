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
    const started = gameReducer(initialGameState, { type: 'COMPLETE_INTRO' })
    const selected = gameReducer(started, { type: 'SELECT_ZONE', zoneId: 'zone-north' })
    const analysing = gameReducer(selected, { type: 'OPEN_ANALYSIS' })
    const analysed = gameReducer(analysing, { type: 'ANALYSIS_COMPLETE' })
    const revealed = gameReducer(analysed, { type: 'REVEAL_SIGNAL' })
    const decision = gameReducer(revealed, { type: 'OPEN_DECISION' })
    const completed = gameReducer(decision, { type: 'MAKE_DECISION', decision: 'cleanup' })
    const applied = gameReducer(completed, { type: 'APPLY_SUCCESS' })
    const repeated = gameReducer(applied, { type: 'APPLY_SUCCESS' })

    expect(applied.xp).toBe(240)
    expect(applied.coastHealth).toBe(86)
    expect(applied.missionCompleted).toBe(true)
    expect(repeated).toBe(applied)
    expect(repeated.xp).toBe(240)
  })

  it('keeps the coastal mission sequence explicit', () => {
    const started = gameReducer(initialGameState, { type: 'COMPLETE_INTRO' })
    const selected = gameReducer(started, { type: 'SELECT_ZONE', zoneId: 'zone-north' })
    const analysing = gameReducer(selected, { type: 'OPEN_ANALYSIS' })
    const found = gameReducer(analysing, { type: 'ANALYSIS_COMPLETE' })
    const blockedDecision = gameReducer(found, { type: 'OPEN_DECISION' })
    const revealed = gameReducer(found, { type: 'REVEAL_SIGNAL' })
    const decision = gameReducer(revealed, { type: 'OPEN_DECISION' })
    const wrong = gameReducer(decision, { type: 'MAKE_DECISION', decision: 'ignore' })

    expect(started.scene).toBe('MAP')
    expect(selected.scene).toBe('MISSION')
    expect(analysing.selectedZone).toBe('zone-north')
    expect(found.missionProgress).toBe('analyzing')
    expect(blockedDecision).toBe(found)
    expect(revealed.missionProgress).toBe('decision')
    expect(decision.scene).toBe('DECISION')
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
    const revealed = gameReducer(ready, { type: 'REVEAL_SIGNAL' })
    const decision = gameReducer(revealed, { type: 'OPEN_DECISION' })
    const wrong = gameReducer(decision, { type: 'MAKE_DECISION', decision: 'ignore' })
    const right = gameReducer(decision, { type: 'MAKE_DECISION', decision: 'cleanup' })

    expect(wrong.scene).toBe('DECISION')
    expect(right.scene).toBe('RESULT')
  })

  it('rejects direct scene and success bypasses', () => {
    const started = gameReducer(initialGameState, { type: 'COMPLETE_INTRO' })
    const selected = gameReducer(started, { type: 'SELECT_ZONE', zoneId: 'zone-north' })
    const analysing = gameReducer(selected, { type: 'OPEN_ANALYSIS' })
    const analysed = gameReducer(analysing, { type: 'ANALYSIS_COMPLETE' })
    const revealed = gameReducer(analysed, { type: 'REVEAL_SIGNAL' })
    const decision = gameReducer(revealed, { type: 'OPEN_DECISION' })

    expect(gameReducer(initialGameState, { type: 'ANALYSIS_COMPLETE' })).toBe(initialGameState)
    expect(gameReducer(analysed, { type: 'MAKE_DECISION', decision: 'cleanup' })).toBe(analysed)
    expect(gameReducer(analysed, { type: 'OPEN_DECISION' })).toBe(analysed)
    expect(gameReducer(decision, { type: 'APPLY_SUCCESS' })).toBe(decision)
    expect(gameReducer(initialGameState, { type: 'SET_SCENE', scene: 'RESULT' })).toBe(initialGameState)
    expect(gameReducer(initialGameState, { type: 'SET_SCENE', scene: 'ANALYSIS' })).toBe(initialGameState)
  })

  it('allows the decision back button to return to the completed analysis', () => {
    const started = gameReducer(initialGameState, { type: 'COMPLETE_INTRO' })
    const selected = gameReducer(started, { type: 'SELECT_ZONE', zoneId: 'zone-north' })
    const analysing = gameReducer(selected, { type: 'OPEN_ANALYSIS' })
    const analysed = gameReducer(analysing, { type: 'ANALYSIS_COMPLETE' })
    const revealed = gameReducer(analysed, { type: 'REVEAL_SIGNAL' })
    const decision = gameReducer(revealed, { type: 'OPEN_DECISION' })
    const backToAnalysis = gameReducer(decision, { type: 'SET_SCENE', scene: 'ANALYSIS' })

    expect(backToAnalysis.scene).toBe('ANALYSIS')
    expect(backToAnalysis.selectedZone).toBe('zone-north')
    expect(backToAnalysis.analysisCompleted).toBe(true)
    expect(backToAnalysis.observationRevealed).toBe(true)
  })

  it('does not select locked zones through a direct dispatch', () => {
    const started = gameReducer(initialGameState, { type: 'COMPLETE_INTRO' })

    expect(gameReducer(started, { type: 'SELECT_ZONE', zoneId: 'zone-west' })).toBe(started)
    expect(gameReducer(started, { type: 'SELECT_ZONE', zoneId: 'zone-east' })).toBe(started)
  })

  it('fully resets mission progress and zone state', () => {
    const started = gameReducer(initialGameState, { type: 'COMPLETE_INTRO' })
    const selected = gameReducer(started, { type: 'SELECT_ZONE', zoneId: 'zone-north' })
    const analysing = gameReducer(selected, { type: 'OPEN_ANALYSIS' })
    const analysed = gameReducer(analysing, { type: 'ANALYSIS_COMPLETE' })
    const revealed = gameReducer(analysed, { type: 'REVEAL_SIGNAL' })
    const decision = gameReducer(revealed, { type: 'OPEN_DECISION' })
    const completed = gameReducer(decision, { type: 'MAKE_DECISION', decision: 'cleanup' })
    const applied = gameReducer(completed, { type: 'APPLY_SUCCESS' })
    const reset = gameReducer(applied, { type: 'RESET' })

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
