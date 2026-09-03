import { missions } from './missions'
import type { FieldId, FieldState, GameAction, GameState } from './types'

const FIELD_SIZE = 5

const createField = (defaultState: FieldState = 'healthy'): FieldState[][] =>
  Array.from({ length: FIELD_SIZE }, (_, row) =>
    Array.from({ length: FIELD_SIZE }, (_, column) => {
      if (defaultState !== 'healthy' || row > 1) return defaultState
      if (column === 0 || column === 1) return 'critical'
      if (column === 2) return 'warning'
      return 'healthy'
    }),
  )

export const initialGameState: GameState = {
  scene: 'LOADING',
  xp: 120,
  farmHealth: 72,
  currentMission: missions[0].id,
  missionProgress: 'not-started',
  fieldStates: {
    'field-a': createField(),
    'field-b': createField('healthy'),
    'field-c': createField('healthy'),
  },
  introCompleted: false,
  selectedField: null,
  analysisCompleted: false,
  selectedDecision: null,
  missionCompleted: false,
  resultApplied: false,
}

const cloneFieldStates = (fields: Record<FieldId, FieldState[][]>) =>
  Object.fromEntries(
    (Object.entries(fields) as [FieldId, FieldState[][]][]).map(([id, rows]) => [id, rows.map((row) => [...row])]),
  ) as Record<FieldId, FieldState[][]>

export const applyResolvedField = (fieldStates: GameState['fieldStates']) => {
  const next = cloneFieldStates(fieldStates)
  next['field-a'] = next['field-a'].map((row) =>
    row.map((tile) => {
      if (tile === 'critical') return 'resolved'
      if (tile === 'warning') return 'healthy'
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
    case 'SELECT_FIELD':
      return {
        ...state,
        scene: 'MISSION',
        selectedField: action.fieldId,
        missionProgress: state.missionCompleted ? 'completed' : 'active',
      }
    case 'CLOSE_SHEET':
      return { ...state, scene: 'MAP', selectedField: null }
    case 'OPEN_ANALYSIS':
      return {
        ...state,
        scene: 'ANALYSIS',
        selectedField: action.fieldId ?? state.selectedField ?? 'field-a',
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
        farmHealth: 86,
        fieldStates: applyResolvedField(state.fieldStates),
        missionProgress: 'completed',
        missionCompleted: true,
        resultApplied: true,
        scene: 'RESULT',
      }
    case 'RETURN_MAP':
      return { ...state, scene: 'MAP', selectedField: null }
    case 'SET_SCENE':
      return { ...state, scene: action.scene }
    case 'SET_FIELD_STATE':
      return {
        ...state,
        fieldStates: {
          ...state.fieldStates,
          [action.fieldId]: state.fieldStates[action.fieldId].map((row) => row.map(() => action.state)),
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
