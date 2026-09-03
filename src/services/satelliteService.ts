import { mockSatelliteData, type SatelliteData } from '../game/mockSatelliteData'

export type { SatelliteData } from '../game/mockSatelliteData'

/**
 * Service boundary for future satellite API integration.
 * The UI intentionally knows nothing about the mock data source.
 */
export const getZoneAnalysis = async (zoneId: string): Promise<SatelliteData> => {
  await new Promise((resolve) => window.setTimeout(resolve, 450))
  return mockSatelliteData[zoneId] ?? mockSatelliteData['zone-north']
}
