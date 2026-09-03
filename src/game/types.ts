export type Scene = 'LOADING' | 'INTRO' | 'MAP' | 'MISSION' | 'ANALYSIS' | 'DECISION' | 'RESULT'

export type FieldState = 'healthy' | 'warning' | 'critical' | 'resolved'
export type FieldId = 'field-a' | 'field-b' | 'field-c'
export type MissionProgress = 'not-started' | 'active' | 'analyzing' | 'decision' | 'completed'

export interface GameState {
  scene: Scene
  xp: number
  farmHealth: number
  currentMission: string | null
  missionProgress: MissionProgress
  fieldStates: Record<FieldId, FieldState[][]>
  introCompleted: boolean
  selectedField: FieldId | null
  analysisCompleted: boolean
  selectedDecision: string | null
  missionCompleted: boolean
  resultApplied: boolean
}

export type GameAction =
  | { type: 'COMPLETE_INTRO' }
  | { type: 'SKIP_INTRO' }
  | { type: 'SELECT_FIELD'; fieldId: FieldId }
  | { type: 'CLOSE_SHEET' }
  | { type: 'OPEN_ANALYSIS'; fieldId?: FieldId }
  | { type: 'ANALYSIS_COMPLETE' }
  | { type: 'OPEN_DECISION' }
  | { type: 'MAKE_DECISION'; decision: string; correct: boolean }
  | { type: 'APPLY_SUCCESS' }
  | { type: 'RETURN_MAP' }
  | { type: 'SET_SCENE'; scene: Scene }
  | { type: 'SET_FIELD_STATE'; fieldId: FieldId; state: FieldState }
  | { type: 'ADD_XP'; amount: number }
  | { type: 'RESET' }

