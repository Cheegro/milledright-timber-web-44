
// Advanced analytics service with geolocation and device detection
interface LocationData {
  country?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}

interface DeviceData {
  device_type?: string;
  browser?: string;
  operating_system?: string;
  screen_resolution?: string;
  is_mobile?: boolean;
  timezone?: string;
}

// Cache for IP geolocation to avoid repeated API calls
const locationCache = new Map<string, LocationData>();

export const getClientIP = async (): Promise<string | null> => {
  try {
    // Try multiple IP detection services
    const ipServices = [
      'https://api.ipify.org?format=json',
      'https://ipapi.co/json/',
      'https://ipinfo.io/json'
    ];

    for (const service of ipServices) {
      try {
        const response = await fetch(service);
        const data = await response.json();
        return data.ip || data.query || null;
      } catch (error) {
        continue; // Try next service
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting client IP:', error);
    return null;
  }
};

export const getLocationFromIP = async (ip: string): Promise<LocationData> => {
  // Check cache first
  if (locationCache.has(ip)) {
    return locationCache.get(ip)!;
  }

  try {
    // Use free ipapi.co service (1000 requests/month)
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    const locationData: LocationData = {
      country: data.country_name || undefined,
      region: data.region || undefined,
      city: data.city || undefined,
      latitude: data.latitude || undefined,
      longitude: data.longitude || undefined,
    };

    // Cache the result
    locationCache.set(ip, locationData);
    return locationData;
  } catch (error) {
    console.error('Error getting location from IP:', error);
    return {};
  }
};

export const getDeviceInfo = (): DeviceData => {
  const userAgent = navigator.userAgent;
  
  // Device type detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);
  
  let deviceType = 'Desktop';
  if (isMobile && !isTablet) deviceType = 'Mobile';
  else if (isTablet) deviceType = 'Tablet';

  // Browser detection
  let browser = 'Unknown';
  if (userAgent.includes('Chrome') && !userAgent.includes('Edge')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  else if (userAgent.includes('Opera')) browser = 'Opera';

  // Operating system detection
  let os = 'Unknown';
  if (userAgent.includes('Windows NT')) os = 'Windows';
  else if (userAgent.includes('Mac OS X')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';

  // Screen resolution
  const screenResolution = `${screen.width}x${screen.height}`;

  // Timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    device_type: deviceType,
    browser,
    operating_system: os,
    screen_resolution: screenResolution,
    is_mobile: isMobile,
    timezone,
  };
};

export const enhanceAnalyticsData = async (baseData: any) => {
  const ip = await getClientIP();
  const deviceInfo = getDeviceInfo();
  
  let locationData: LocationData = {};
  if (ip) {
    locationData = await getLocationFromIP(ip);
  }

  return {
    ...baseData,
    ip_address: ip,
    ...locationData,
    ...deviceInfo,
  };
};
