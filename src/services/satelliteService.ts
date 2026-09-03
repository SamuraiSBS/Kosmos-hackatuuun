import { mockSatelliteData, type SatelliteData } from '../game/mockSatelliteData'

export type { SatelliteData } from '../game/mockSatelliteData'

/**
 * Service boundary for future satellite API integration.
 * The UI intentionally knows nothing about the mock data source.
 */
export const getFieldAnalysis = async (fieldId: string): Promise<SatelliteData> => {
  await new Promise((resolve) => window.setTimeout(resolve, 450))
  return mockSatelliteData[fieldId] ?? mockSatelliteData['field-a']
}
