import { useGame } from '../../game/gameStore'

export function DebugPanel() {
  const { dispatch, resetGame } = useGame()

  return (
    <details className="debug-panel">
      <summary>DEV / DEBUG</summary>
      <div className="debug-actions">
        <button type="button" onClick={resetGame}>Reset game</button>
        <button type="button" onClick={() => dispatch({ type: 'SKIP_INTRO' })}>Skip intro</button>
        <button type="button" onClick={() => dispatch({ type: 'COMPLETE_INTRO' })}>Start mission</button>
        <button type="button" onClick={() => dispatch({ type: 'APPLY_SUCCESS' })}>Complete mission</button>
        <button type="button" onClick={() => dispatch({ type: 'SET_ZONE_STATE', zoneId: 'zone-north', state: 'polluted' })}>Set zone polluted</button>
        <button type="button" onClick={() => dispatch({ type: 'SET_ZONE_STATE', zoneId: 'zone-north', state: 'clear' })}>Set zone clear</button>
        <button type="button" onClick={() => dispatch({ type: 'ADD_XP', amount: 120 })}>Add XP</button>
      </div>
    </details>
  )
}
