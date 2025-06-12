
// Enhanced analytics core service
import { getClientIP } from './ipDetection';
import { getLocationFromIP, calculateDistance } from './geolocation';
import { getAdvancedDeviceInfo } from './deviceDetection';
import { getSessionAnalytics } from './sessionManagement';

export const enhanceAnalyticsData = async (baseData: any) => {
  const ip = await getClientIP();
  const deviceInfo = getAdvancedDeviceInfo();
  const sessionInfo = getSessionAnalytics(baseData.session_id || 'unknown');
  
  let locationData = {};
  if (ip) {
    locationData = await getLocationFromIP(ip);
  }

  // MilledRight business location (Whitchurch-Stouffville)
  const businessLat = 44.1989;
  const businessLon = -79.2661;
  
  let distanceFromBusiness: number | undefined;
  if ((locationData as any).latitude && (locationData as any).longitude) {
    distanceFromBusiness = calculateDistance(
      businessLat, businessLon,
      (locationData as any).latitude, (locationData as any).longitude
    );
  }

  return {
    ...baseData,
    ip_address: ip,
    ...locationData,
    ...deviceInfo,
    ...sessionInfo,
    distance_from_business: distanceFromBusiness,
    enhanced_at: new Date().toISOString()
  };
};

// Export calculation utilities
export * from './calculations';
