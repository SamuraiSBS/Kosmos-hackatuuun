import { useGame } from '../../game/gameStore'

export function DebugPanel() {
  const { dispatch, resetGame } = useGame()

  const completeMission = () => {
    dispatch({ type: 'RESET' })
    dispatch({ type: 'COMPLETE_INTRO' })
    dispatch({ type: 'SELECT_ZONE', zoneId: 'zone-north' })
    dispatch({ type: 'OPEN_ANALYSIS' })
    dispatch({ type: 'ANALYSIS_COMPLETE' })
    dispatch({ type: 'OPEN_DECISION' })
    dispatch({ type: 'MAKE_DECISION', decision: 'cleanup' })
  }

  return (
    <details className="debug-panel">
      <summary>DEV / DEBUG</summary>
      <div className="debug-actions">
        <button type="button" onClick={resetGame}>Reset game</button>
        <button type="button" onClick={() => dispatch({ type: 'SKIP_INTRO' })}>Skip intro</button>
        <button type="button" onClick={() => dispatch({ type: 'COMPLETE_INTRO' })}>Start mission</button>
        <button type="button" onClick={completeMission}>Complete mission</button>
        <button type="button" onClick={() => dispatch({ type: 'SET_ZONE_STATE', zoneId: 'zone-north', state: 'polluted' })}>Set zone polluted</button>
        <button type="button" onClick={() => dispatch({ type: 'SET_ZONE_STATE', zoneId: 'zone-north', state: 'clear' })}>Set zone clear</button>
        <button type="button" onClick={() => dispatch({ type: 'ADD_XP', amount: 120 })}>Add XP</button>
      </div>
    </details>
  )
}
