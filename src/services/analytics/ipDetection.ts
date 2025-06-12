
// IP detection service with fallback mechanisms
const IP_SERVICES = [
  'https://api.ipify.org?format=json',
  'https://ipapi.co/json/',
  'https://httpbin.org/ip'
];

export const getClientIP = async (): Promise<string | null> => {
  try {
    for (const service of IP_SERVICES) {
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
