import { missions } from './missions'
import type { GameAction, GameState, ZoneId, ZoneState } from './types'

const ZONE_SIZE = 5

const createZone = (defaultState: ZoneState = 'clear'): ZoneState[][] =>
  Array.from({ length: ZONE_SIZE }, (_, row) =>
    Array.from({ length: ZONE_SIZE }, (_, column) => {
      if (defaultState !== 'clear' || row > 1) return defaultState
      if (column === 0 || column === 1) return 'polluted'
      if (column === 2) return 'watch'
      return 'clear'
    }),
  )

export const initialGameState: GameState = {
  scene: 'LOADING',
  xp: 120,
  coastHealth: 72,
  currentMission: missions[0].id,
  missionProgress: 'not-started',
  zoneStates: {
    'zone-north': createZone(),
    'zone-west': createZone('clear'),
    'zone-east': createZone('clear'),
  },
  introCompleted: false,
  selectedZone: null,
  analysisCompleted: false,
  selectedDecision: null,
  missionCompleted: false,
  resultApplied: false,
}

const cloneZoneStates = (zones: Record<ZoneId, ZoneState[][]>) =>
  Object.fromEntries(
    (Object.entries(zones) as [ZoneId, ZoneState[][]][]).map(([id, rows]) => [id, rows.map((row) => [...row])]),
  ) as Record<ZoneId, ZoneState[][]>

export const applyResolvedZone = (zoneStates: GameState['zoneStates']) => {
  const next = cloneZoneStates(zoneStates)
  next['zone-north'] = next['zone-north'].map((row) =>
    row.map((tile) => {
      if (tile === 'polluted') return 'restored'
      if (tile === 'watch') return 'clear'
      return tile
    }),
  )
  return next
}

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'COMPLETE_INTRO':
    case 'SKIP_INTRO':
      return {
        ...state,
        scene: 'MAP',
        introCompleted: true,
        currentMission: missions[0].id,
        missionProgress: state.missionCompleted ? 'completed' : 'active',
      }
    case 'SELECT_ZONE':
      return {
        ...state,
        scene: 'MISSION',
        selectedZone: action.zoneId,
        missionProgress: state.missionCompleted ? 'completed' : 'active',
      }
    case 'CLOSE_SHEET':
      return { ...state, scene: 'MAP', selectedZone: null }
    case 'OPEN_ANALYSIS':
      return {
        ...state,
        scene: 'ANALYSIS',
        selectedZone: action.zoneId ?? state.selectedZone ?? 'zone-north',
        missionProgress: state.missionCompleted ? 'completed' : 'analyzing',
        analysisCompleted: false,
      }
    case 'ANALYSIS_COMPLETE':
      return { ...state, analysisCompleted: true, missionProgress: 'decision' }
    case 'OPEN_DECISION':
      return { ...state, scene: 'DECISION', missionProgress: 'decision' }
    case 'MAKE_DECISION':
      return {
        ...state,
        selectedDecision: action.decision,
        scene: action.correct ? 'RESULT' : 'DECISION',
      }
    case 'APPLY_SUCCESS':
      if (state.resultApplied) return state
      return {
        ...state,
        xp: state.xp + missions[0].xp,
        coastHealth: 86,
        zoneStates: applyResolvedZone(state.zoneStates),
        missionProgress: 'completed',
        missionCompleted: true,
        resultApplied: true,
        scene: 'RESULT',
      }
    case 'RETURN_MAP':
      return { ...state, scene: 'MAP', selectedZone: null }
    case 'SET_SCENE':
      return { ...state, scene: action.scene }
    case 'SET_ZONE_STATE':
      return {
        ...state,
        zoneStates: {
          ...state.zoneStates,
          [action.zoneId]: state.zoneStates[action.zoneId].map((row) => row.map(() => action.state)),
        },
      }
    case 'ADD_XP':
      return { ...state, xp: Math.max(0, state.xp + action.amount) }
    case 'RESET':
      return { ...initialGameState }
    default:
      return state
  }
}
