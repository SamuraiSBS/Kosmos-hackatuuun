import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react'
import { gameReducer, initialGameState } from './gameReducer'
import type { GameAction, GameState } from './types'

export { applyResolvedField, gameReducer, initialGameState } from './gameReducer'

const STORAGE_KEY = 'kosmos-farm-mvp-state'
const loadGameState = (): GameState => {
  if (typeof window === 'undefined') return initialGameState
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return initialGameState
    const parsed = JSON.parse(saved) as Partial<GameState>
    return {
      ...initialGameState,
      ...parsed,
      scene: parsed.introCompleted ? 'MAP' : 'LOADING',
      fieldStates: parsed.fieldStates ?? initialGameState.fieldStates,
    }
  } catch {
    return initialGameState
  }
}

const saveGameState = (state: GameState) => {
  if (typeof window === 'undefined') return
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
