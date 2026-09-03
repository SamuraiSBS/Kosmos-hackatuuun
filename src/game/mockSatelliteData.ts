export interface SatelliteData {
  fieldId: string
  sector: string
  vegetation: number
  moisture: number
  vegetationChange: number
  risk: 'Низкий' | 'Средний' | 'Высокий'
  issueTitle: string
  issueDescription: string
  observation: string
}

export const mockSatelliteData: Record<string, SatelliteData> = {
  'field-a': {
    fieldId: 'field-a',
    sector: 'A-04',
    vegetation: 72,
    moisture: 41,
    vegetationChange: -18,
    risk: 'Высокий',
    issueTitle: 'Недостаток влаги',
    issueDescription:
      'Спутниковые данные показывают снижение состояния растительности и уровня влажности на северной части участка.',
    observation: 'сегодня, 09:42',
  },
}

