
// Geolocation service with caching
interface LocationData {
  country?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}

// Cache for geolocation to avoid repeated API calls
const locationCache = new Map<string, LocationData>();

export const getLocationFromIP = async (ip: string): Promise<LocationData> => {
  // Check cache first
  if (locationCache.has(ip)) {
    return locationCache.get(ip)!;
  }

  try {
    // Use ipapi.co service (1000 free requests/month)
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        'User-Agent': 'MilledRight Analytics/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();

    if (data.error) {
      console.warn('Geolocation API error:', data.reason);
      return {};
    }

    const locationData: LocationData = {
      country: data.country_name || undefined,
      region: data.region || data.region_code || undefined,
      city: data.city || undefined,
      latitude: data.latitude || undefined,
      longitude: data.longitude || undefined,
    };

    // Cache successful results
    locationCache.set(ip, locationData);
    return locationData;
  } catch (error) {
    console.error('Error getting location from IP:', error);
    return {};
  }
};

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
