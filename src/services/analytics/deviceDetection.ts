
// Advanced device and browser detection service
interface DeviceData {
  device_type?: string;
  browser?: string;
  operating_system?: string;
  screen_resolution?: string;
  is_mobile?: boolean;
  timezone?: string;
}

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
