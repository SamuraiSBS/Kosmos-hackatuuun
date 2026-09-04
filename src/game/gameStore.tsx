import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react'
import { gameReducer, initialGameState } from './gameReducer'
import type { GameAction, GameState, ZoneId, ZoneState } from './types'

export { applyResolvedZone, gameReducer, initialGameState } from './gameReducer'

const STORAGE_KEY = 'clean-coast-edu-state'
const ZONE_IDS: ZoneId[] = ['zone-north', 'zone-west', 'zone-east']
const ZONE_STATES: ZoneState[] = ['clear', 'watch', 'polluted', 'restored']
export const isCompletedRun = (state: Partial<GameState>) => Boolean(state.missionCompleted || state.resultApplied)

const isZoneGrid = (value: unknown): value is ZoneState[][] =>
  Array.isArray(value) &&
  value.length === 5 &&
  value.every((row) => Array.isArray(row) && row.length === 5 && row.every((tile) => ZONE_STATES.includes(tile as ZoneState)))

const hydrateZoneStates = (saved: unknown): GameState['zoneStates'] => {
  const source = saved && typeof saved === 'object' ? saved as Partial<Record<ZoneId, unknown>> : {}

  return Object.fromEntries(
    ZONE_IDS.map((zoneId) => {
      const grid = isZoneGrid(source[zoneId]) ? source[zoneId].map((row) => [...row]) : initialGameState.zoneStates[zoneId]
      return [zoneId, grid]
    }),
  ) as GameState['zoneStates']
}

export const loadGameState = (): GameState => {
  if (typeof window === 'undefined') return initialGameState
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return initialGameState
    const parsed = JSON.parse(saved) as Partial<GameState>
    if (isCompletedRun(parsed)) {
      window.localStorage.removeItem(STORAGE_KEY)
      return initialGameState
    }
    return {
      ...initialGameState,
      ...parsed,
      scene: parsed.introCompleted ? 'MAP' : 'LOADING',
      zoneStates: hydrateZoneStates(parsed.zoneStates),
    }
  } catch {
    return initialGameState
  }
}

export const saveGameState = (state: GameState) => {
  if (typeof window === 'undefined') return
  if (isCompletedRun(state)) {
    window.localStorage.removeItem(STORAGE_KEY)
    return
  }
  const { scene: _scene, ...persistentState } = state
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentState))
}

interface GameContextValue {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  resetGame: () => void
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, loadGameState)

  useEffect(() => {
    saveGameState(state)
  }, [state])

  const resetGame = () => dispatch({ type: 'RESET' })

  return <GameContext.Provider value={{ state, dispatch, resetGame }}>{children}</GameContext.Provider>
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) throw new Error('useGame must be used inside GameProvider')
  return context
}
