export type Scene = 'LOADING' | 'INTRO' | 'MAP' | 'MISSION' | 'ANALYSIS' | 'DECISION' | 'RESULT'

export type ZoneState = 'clear' | 'watch' | 'polluted' | 'restored'
export type ZoneId = 'zone-north' | 'zone-west' | 'zone-east'
export type MissionProgress = 'not-started' | 'active' | 'analyzing' | 'decision' | 'completed'

export interface GameState {
  scene: Scene
  xp: number
  coastHealth: number
  currentMission: string | null
  missionProgress: MissionProgress
  zoneStates: Record<ZoneId, ZoneState[][]>
  introCompleted: boolean
  selectedZone: ZoneId | null
  analysisCompleted: boolean
  selectedDecision: string | null
  missionCompleted: boolean
  resultApplied: boolean
}

export type GameAction =
  | { type: 'COMPLETE_INTRO' }
  | { type: 'SKIP_INTRO' }
  | { type: 'SELECT_ZONE'; zoneId: ZoneId }
  | { type: 'CLOSE_SHEET' }
  | { type: 'OPEN_ANALYSIS'; zoneId?: ZoneId }
  | { type: 'ANALYSIS_COMPLETE' }
  | { type: 'OPEN_DECISION' }
  | { type: 'MAKE_DECISION'; decision: string }
  | { type: 'APPLY_SUCCESS' }
  | { type: 'RETURN_MAP' }
  | { type: 'SET_SCENE'; scene: Scene }
  | { type: 'SET_ZONE_STATE'; zoneId: ZoneId; state: ZoneState }
  | { type: 'ADD_XP'; amount: number }
  | { type: 'RESET' }
