export interface Mission {
  id: string
  title: string
  description: string
  objective: string
  xp: number
  correctDecision: string
}

export const missions: Mission[] = [
  {
    id: 'mission-01',
    title: 'Сигнал загрязнения у северной линии',
    description: 'Снимок ДЗЗ выделил участок береговой линии с необычным сигналом мусора.',
    objective: 'Исследуйте северную зону берега.',
    xp: 120,
    correctDecision: 'cleanup',
  },
]

export const lockedMissions = [
  { id: 'mission-02', title: 'Пластик у устья' },
  { id: 'mission-03', title: 'След шторма на косе' },
]

export const getMission = (id: string | null) => missions.find((mission) => mission.id === id) ?? missions[0]
