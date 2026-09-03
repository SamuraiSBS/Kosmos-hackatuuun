export interface SatelliteData {
  zoneId: string
  sector: string
  imageCoverage: number
  debrisSignal: number
  signalChange: number
  risk: 'Низкий' | 'Средний' | 'Высокий'
  issueTitle: string
  issueDescription: string
  observation: string
}

export const mockSatelliteData: Record<string, SatelliteData> = {
  'zone-north': {
    zoneId: 'zone-north',
    sector: 'A-04',
    imageCoverage: 68,
    debrisSignal: 41,
    signalChange: 18,
    risk: 'Высокий',
    issueTitle: 'Скопление мусора',
    issueDescription:
      'Учебный слой ДЗЗ выделяет плотный сигнал твёрдых отходов у северной линии берега. Данные помогают выбрать точку для полевого выезда.',
    observation: 'сегодня, 09:42',
  },
}
