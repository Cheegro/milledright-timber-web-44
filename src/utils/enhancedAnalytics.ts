
import { trackEvent as dbTrackEvent, trackPageView as dbTrackPageView } from '@/api/analyticsApi';
import { enhanceAnalyticsData } from '@/services/enhancedAnalyticsService';

// Enhanced analytics exclusion with IP filtering
const shouldSkipAnalytics = async () => {
  // Check localStorage flags first
  if (localStorage.getItem('disable_analytics') === 'true') {
    return true;
  }

  // Always exclude admin pages
  if (window.location.pathname.startsWith('/admin')) {
    return true;
  }

  // Check admin exclusion setting
  const excludeAdmin = localStorage.getItem('exclude_admin_analytics') === 'true';
  const isAdmin = localStorage.getItem('user_is_admin') === 'true';
  
  if (excludeAdmin && isAdmin) {
    return true;
  }

  // Enhanced IP-based exclusion for admin
  try {
    const currentIP = await getCurrentUserIP();
    const adminIPs = getAdminIPs();
    
    if (currentIP && adminIPs.includes(currentIP)) {
      console.log('Analytics skipped: Admin IP detected');
      return true;
    }
  } catch (error) {
    console.warn('Could not check IP for admin exclusion:', error);
  }

  return false;
};

// Get current user IP for comparison
const getCurrentUserIP = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return null;
  }
};

// Store and retrieve admin IPs (you can expand this)
const getAdminIPs = (): string[] => {
  const stored = localStorage.getItem('admin_ips');
  return stored ? JSON.parse(stored) : [];
};

export const addAdminIP = (ip: string) => {
  const currentIPs = getAdminIPs();
  if (!currentIPs.includes(ip)) {
    currentIPs.push(ip);
    localStorage.setItem('admin_ips', JSON.stringify(currentIPs));
  }
};

// Enhanced session ID generation with admin marking
const getEnhancedSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    const isAdminSession = window.location.pathname.startsWith('/admin') || 
                          localStorage.getItem('user_is_admin') === 'true';
    
    const prefix = isAdminSession ? 'admin_sess' : 'sess';
    sessionId = `${prefix}_${Math.random().toString(36).substring(2)}_${Date.now().toString(36)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
    sessionStorage.setItem('session_start_time', Date.now().toString());
  }
  return sessionId;
};

// Enhanced client info with admin detection
const getEnhancedClientInfo = () => {
  const sessionStartTime = parseInt(sessionStorage.getItem('session_start_time') || Date.now().toString());
  const sessionDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
  const isAdminContext = window.location.pathname.startsWith('/admin') || 
                        localStorage.getItem('user_is_admin') === 'true';
  
  return {
    user_agent: navigator.userAgent + (isAdminContext ? ' [admin-context]' : ''),
    session_id: getEnhancedSessionId(),
    page_path: window.location.pathname,
    page_url: window.location.href,
    referrer: document.referrer,
    session_duration: sessionDuration,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    connection_type: (navigator as any).connection?.effectiveType || 'unknown',
    page_load_time: performance.timing ? 
      performance.timing.loadEventEnd - performance.timing.navigationStart : null,
    admin_context: isAdminContext
  };
};

export const trackEnhancedEvent = async (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  if (await shouldSkipAnalytics()) {
    console.log(`Analytics tracking skipped for event "${eventName}" (admin exclusion)`);
    return;
  }

  // Google Analytics 4 (existing logic)
  if ((window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }

  // Meta Pixel (existing logic)
  if ((window as any).fbq) {
    (window as any).fbq('track', eventName, parameters);
  }

  // Enhanced database tracking with admin filtering
  const baseData = {
    event_name: eventName,
    event_category: parameters?.event_category || 'general',
    parameters,
    ...getEnhancedClientInfo()
  };

  try {
    const enhancedData = await enhanceAnalyticsData(baseData);
    await dbTrackEvent(enhancedData);
    console.log('Enhanced Analytics Event tracked:', eventName, { 
      ip: enhancedData.ip_address, 
      country: enhancedData.country,
      admin_excluded: false 
    });
  } catch (err) {
    console.error('Failed to track enhanced event:', err);
    // Fallback to basic tracking
    dbTrackEvent(baseData).catch(err => console.error('Failed to track basic event:', err));
  }
};

export const trackEnhancedPageView = async (page?: string) => {
  if (typeof window === 'undefined') return;

  if (await shouldSkipAnalytics()) {
    console.log(`Analytics page view tracking skipped for "${window.location.pathname}" (admin exclusion)`);
    return;
  }

  const pageTitle = page || document.title;
  
  // Track as event for compatibility
  trackEnhancedEvent('page_view', { page_title: pageTitle });
  
  // Enhanced page view data
  const baseData = {
    page_path: window.location.pathname,
    page_title: pageTitle,
    page_url: window.location.href,
    ...getEnhancedClientInfo()
  };

  try {
    const enhancedData = await enhanceAnalyticsData(baseData);
    await dbTrackPageView(enhancedData);
    console.log('Enhanced Page view tracked:', window.location.pathname, {
      ip: enhancedData.ip_address,
      country: enhancedData.country,
      admin_excluded: false
    });
  } catch (err) {
    console.error('Failed to track enhanced page view:', err);
    // Fallback to basic tracking
    dbTrackPageView(baseData).catch(err => console.error('Failed to track basic page view:', err));
  }
};

// Enhanced tracking functions with better context
export const trackBusinessInteraction = (interactionType: string, details?: Record<string, any>) => {
  trackEnhancedEvent('business_interaction', {
    interaction_type: interactionType,
    event_category: 'business',
    ...details
  });
};

export const trackProductInteraction = (productId: string, productName: string, interaction: string) => {
  trackEnhancedEvent('product_interaction', {
    product_id: productId,
    product_name: productName,
    interaction_type: interaction,
    event_category: 'product'
  });
};

export const trackQuoteRequest = (projectType?: string, estimatedValue?: string, formData?: Record<string, any>) => {
  trackEnhancedEvent('quote_request', {
    project_type: projectType,
    estimated_value: estimatedValue,
    event_category: 'conversion',
    form_data: formData
  });
};

export const trackPhoneClick = (phoneNumber?: string, location?: string) => {
  trackBusinessInteraction('phone_click', {
    phone_number: phoneNumber,
    click_location: location
  });
};

export const trackEmailClick = (email?: string, location?: string) => {
  trackBusinessInteraction('email_click', {
    email_address: email,
    click_location: location
  });
};

export const trackNavigation = (fromPage: string, toPage: string, navigationMethod?: string) => {
  trackEnhancedEvent('navigation', {
    from_page: fromPage,
    to_page: toPage,
    navigation_method: navigationMethod || 'click',
    event_category: 'navigation'
  });
};

export const trackSearch = (searchTerm: string, searchCategory?: string, resultCount?: number) => {
  trackEnhancedEvent('search', {
    search_term: searchTerm,
    search_category: searchCategory,
    result_count: resultCount,
    event_category: 'search'
  });
};

export const trackDownload = (fileName: string, fileType: string, fileSize?: number) => {
  trackEnhancedEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
    file_size: fileSize,
    event_category: 'engagement'
  });
};

export const trackFormStart = (formName: string, formLocation: string) => {
  trackEnhancedEvent('form_start', {
    form_name: formName,
    form_location: formLocation,
    event_category: 'form'
  });
};

export const trackFormComplete = (formName: string, formData?: Record<string, any>) => {
  trackEnhancedEvent('form_complete', {
    form_name: formName,
    event_category: 'conversion',
    form_completion_data: formData
  });
};

export const trackScrollDepth = (scrollPercent: number, pagePath: string) => {
  trackEnhancedEvent('scroll_depth', {
    scroll_percent: scrollPercent,
    page_path: pagePath,
    event_category: 'engagement'
  });
};

// Keep existing functions for compatibility
export { 
  disableAnalytics, 
  enableAnalytics, 
  setAdminAnalyticsExclusion, 
  getAnalyticsStatus 
} from '@/utils/analytics';

// Initialize enhanced analytics with admin detection
if (typeof window !== 'undefined') {
  // Auto-register admin IP when on admin pages
  if (window.location.pathname.startsWith('/admin')) {
    getCurrentUserIP().then(ip => {
      if (ip) {
        addAdminIP(ip);
        console.log('Admin IP registered for exclusion:', ip);
      }
    }).catch(() => {
      console.warn('Could not register admin IP');
    });
  }

  // Track initial page view
  document.addEventListener('DOMContentLoaded', () => {
    trackEnhancedPageView();
  });

  // Enhanced navigation tracking for SPAs
  let currentPath = window.location.pathname;
  const observer = new MutationObserver(() => {
    if (window.location.pathname !== currentPath) {
      const oldPath = currentPath;
      currentPath = window.location.pathname;
      trackNavigation(oldPath, currentPath, 'spa_navigation');
      trackEnhancedPageView();
    }
  });

  // Start observing with enhanced options
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Track scroll depth
  let maxScrollPercent = 0;
  const trackScrollDepthThrottled = (() => {
    let timeout: NodeJS.Timeout | null = null;
    return () => {
      if (timeout) return;
      timeout = setTimeout(() => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        if (scrollPercent > maxScrollPercent && scrollPercent >= 25) {
          maxScrollPercent = scrollPercent;
          if ([25, 50, 75, 90].includes(scrollPercent)) {
            trackScrollDepth(scrollPercent, window.location.pathname);
          }
        }
        timeout = null;
      }, 500);
    };
  })();

  window.addEventListener('scroll', trackScrollDepthThrottled);

  // Track page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      trackEnhancedEvent('page_visibility', {
        visibility_state: 'hidden',
        time_on_page: performance.now(),
        event_category: 'engagement'
      });
    }
  });
}
