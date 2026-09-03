export interface Mission {
  id: string
  title: string
  description: string
  objective: string
  xp: number
}

export const missions: Mission[] = [
  {
    id: 'mission-01',
    title: 'Аномалия на северном поле',
    description: 'Спутник заметил снижение индекса растительности.',
    objective: 'Исследуйте северный участок поля.',
    xp: 120,
  },
]

export const lockedMissions = [
  { id: 'mission-02', title: 'Тепловой след у реки' },
  { id: 'mission-03', title: 'Новый сезон посевов' },
]

export const getMission = (id: string | null) => missions.find((mission) => mission.id === id) ?? missions[0]

