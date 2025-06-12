
// Enhanced analytics service with robust IP capture and geolocation
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

interface SessionData {
  session_id: string;
  duration?: number;
  page_count?: number;
  is_bounce?: boolean;
}

// Cache for geolocation to avoid repeated API calls
const locationCache = new Map<string, LocationData>();
const sessionCache = new Map<string, SessionData>();

export const getClientIP = async (): Promise<string | null> => {
  try {
    // Multiple IP detection services for reliability
    const ipServices = [
      'https://api.ipify.org?format=json',
      'https://ipapi.co/json/',
      'https://httpbin.org/ip'
    ];

    for (const service of ipServices) {
      try {
        const response = await fetch(service, { 
          headers: { 'Accept': 'application/json' }
        });
        const data = await response.json();
        const ip = data.ip || data.query || data.origin;
        if (ip && ip !== '127.0.0.1' && ip !== 'localhost') {
          return ip;
        }
      } catch (error) {
        console.warn(`IP service ${service} failed:`, error);
        continue;
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
    // Return empty object instead of throwing
    return {};
  }
};

export const getAdvancedDeviceInfo = (): DeviceData => {
  const userAgent = navigator.userAgent;
  
  // Enhanced device type detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android(?!.*Mobile)|Tablet/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;
  
  let deviceType = 'Desktop';
  if (isMobile && !isTablet) deviceType = 'Mobile';
  else if (isTablet) deviceType = 'Tablet';

  // Enhanced browser detection
  let browser = 'Unknown';
  let browserVersion = '';
  
  if (userAgent.includes('Edg/')) {
    browser = 'Edge';
    browserVersion = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || '';
  } else if (userAgent.includes('Chrome/') && !userAgent.includes('Edg/')) {
    browser = 'Chrome';
    browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || '';
  } else if (userAgent.includes('Firefox/')) {
    browser = 'Firefox';
    browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || '';
  } else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome/')) {
    browser = 'Safari';
    browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || '';
  } else if (userAgent.includes('Opera/') || userAgent.includes('OPR/')) {
    browser = 'Opera';
    browserVersion = userAgent.match(/(Opera|OPR)\/([0-9.]+)/)?.[2] || '';
  }

  // Enhanced OS detection
  let os = 'Unknown';
  let osVersion = '';
  
  if (userAgent.includes('Windows NT')) {
    os = 'Windows';
    const version = userAgent.match(/Windows NT ([0-9.]+)/)?.[1];
    switch (version) {
      case '10.0': osVersion = '10/11'; break;
      case '6.3': osVersion = '8.1'; break;
      case '6.2': osVersion = '8'; break;
      case '6.1': osVersion = '7'; break;
      default: osVersion = version || '';
    }
  } else if (userAgent.includes('Mac OS X')) {
    os = 'macOS';
    osVersion = userAgent.match(/Mac OS X ([0-9_]+)/)?.[1]?.replace(/_/g, '.') || '';
  } else if (userAgent.includes('Linux')) {
    os = 'Linux';
  } else if (userAgent.includes('Android')) {
    os = 'Android';
    osVersion = userAgent.match(/Android ([0-9.]+)/)?.[1] || '';
  } else if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    os = 'iOS';
    osVersion = userAgent.match(/OS ([0-9_]+)/)?.[1]?.replace(/_/g, '.') || '';
  }

  // Screen and display info
  const screenResolution = `${screen.width}x${screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    device_type: deviceType,
    browser: browser + (browserVersion ? ` ${browserVersion.split('.')[0]}` : ''),
    operating_system: os + (osVersion ? ` ${osVersion}` : ''),
    screen_resolution: screenResolution,
    is_mobile: isMobile,
    timezone,
  };
};

export const getSessionAnalytics = (sessionId: string): SessionData => {
  const now = Date.now();
  const stored = sessionCache.get(sessionId);
  
  if (stored) {
    // Update existing session
    stored.duration = Math.floor((now - (stored.duration || now)) / 1000);
    stored.page_count = (stored.page_count || 0) + 1;
    stored.is_bounce = stored.page_count === 1;
    sessionCache.set(sessionId, stored);
    return stored;
  } else {
    // New session
    const newSession: SessionData = {
      session_id: sessionId,
      duration: 0,
      page_count: 1,
      is_bounce: true
    };
    sessionCache.set(sessionId, newSession);
    return newSession;
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

export const enhanceAnalyticsData = async (baseData: any) => {
  const ip = await getClientIP();
  const deviceInfo = getAdvancedDeviceInfo();
  const sessionInfo = getSessionAnalytics(baseData.session_id || 'unknown');
  
  let locationData: LocationData = {};
  if (ip) {
    locationData = await getLocationFromIP(ip);
  }

  // Add business location for distance calculations (MilledRight location)
  const businessLat = 44.1989; // Approximate latitude for Whitchurch-Stouffville
  const businessLon = -79.2661; // Approximate longitude for Whitchurch-Stouffville
  
  let distanceFromBusiness: number | undefined;
  if (locationData.latitude && locationData.longitude) {
    distanceFromBusiness = calculateDistance(
      businessLat, businessLon,
      locationData.latitude, locationData.longitude
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

// Utility functions for analytics calculations
export const calculateBounceRate = (sessions: any[]): number => {
  if (sessions.length === 0) return 0;
  const bounces = sessions.filter(session => session.page_count <= 1).length;
  return Math.round((bounces / sessions.length) * 100);
};

export const calculateAverageSessionDuration = (sessions: any[]): number => {
  if (sessions.length === 0) return 0;
  const totalDuration = sessions.reduce((sum, session) => sum + (session.duration || 0), 0);
  return Math.round(totalDuration / sessions.length / 60); // Convert to minutes
};

export const getTopCountries = (data: any[]): Array<{country: string, count: number, percentage: number}> => {
  const countryCounts: Record<string, number> = {};
  
  // Build the counts with proper typing
  data.forEach(item => {
    if (item.country) {
      countryCounts[item.country] = (countryCounts[item.country] || 0) + 1;
    }
  });

  // Calculate total with proper typing
  const total = Object.values(countryCounts).reduce((sum: number, count: number) => sum + count, 0);
  
  return Object.entries(countryCounts)
    .map(([country, count]): {country: string, count: number, percentage: number} => ({
      country,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count);
};

export const getPeakHours = (data: any[]): Array<{hour: number, count: number}> => {
  const hourCounts = Array(24).fill(0);
  
  data.forEach(item => {
    if (item.created_at) {
      const hour = new Date(item.created_at).getHours();
      hourCounts[hour]++;
    }
  });

  return hourCounts
    .map((count, hour) => ({ hour, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};
