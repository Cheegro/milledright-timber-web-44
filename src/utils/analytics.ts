import { trackEvent as dbTrackEvent, trackPageView as dbTrackPageView } from '@/api/analyticsApi';
import { enhanceAnalyticsData } from '@/services/analyticsService';

// Check if analytics should be disabled
const shouldSkipAnalytics = () => {
  // Skip if explicitly disabled via localStorage
  if (localStorage.getItem('disable_analytics') === 'true') {
    return true;
  }

  // Skip if on admin pages
  if (window.location.pathname.startsWith('/admin')) {
    return true;
  }

  // Skip if admin exclusion is enabled and user has admin flag
  const excludeAdmin = localStorage.getItem('exclude_admin_analytics') === 'true';
  const isAdmin = localStorage.getItem('user_is_admin') === 'true';
  
  if (excludeAdmin && isAdmin) {
    return true;
  }

  return false;
};

// Generate or get session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Get basic client info
const getClientInfo = () => {
  return {
    user_agent: navigator.userAgent,
    session_id: getSessionId(),
    page_path: window.location.pathname,
  };
};

export const trackEvent = async (eventName: string, parameters?: Record<string, any>) => {
  // Only track if we're in the browser
  if (typeof window === 'undefined') return;

  // Skip analytics if conditions are met
  if (shouldSkipAnalytics()) {
    console.log('Analytics tracking skipped (admin exclusion)');
    return;
  }

  // Google Analytics 4
  if ((window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
    console.log('GA4 Event tracked:', eventName, parameters);
  }

  // Meta Pixel
  if ((window as any).fbq) {
    (window as any).fbq('track', eventName, parameters);
    console.log('Meta Pixel Event tracked:', eventName, parameters);
  }

  // Enhanced data with location and device info
  const baseData = {
    event_name: eventName,
    event_category: parameters?.event_category || 'general',
    parameters,
    ...getClientInfo()
  };

  try {
    const enhancedData = await enhanceAnalyticsData(baseData);
    await dbTrackEvent(enhancedData);
  } catch (err) {
    console.error('Failed to track enhanced event:', err);
    // Fallback to basic tracking
    dbTrackEvent(baseData).catch(err => console.error('Failed to track event:', err));
  }

  // Console log for debugging
  console.log('Analytics Event:', eventName, parameters);
};

export const trackPageView = async (page?: string) => {
  if (typeof window === 'undefined') return;

  // Skip analytics if conditions are met
  if (shouldSkipAnalytics()) {
    console.log('Analytics page view tracking skipped (admin exclusion)');
    return;
  }

  const pageTitle = page || document.title;
  
  trackEvent('page_view', { page_title: pageTitle });
  
  // Enhanced page view data
  const baseData = {
    page_path: window.location.pathname,
    page_title: pageTitle,
    referrer: document.referrer,
    ...getClientInfo()
  };

  try {
    const enhancedData = await enhanceAnalyticsData(baseData);
    await dbTrackPageView(enhancedData);
  } catch (err) {
    console.error('Failed to track enhanced page view:', err);
    // Fallback to basic tracking
    dbTrackPageView(baseData).catch(err => console.error('Failed to track page view:', err));
  }

  console.log('Page view tracked:', window.location.pathname);
};

// Admin control functions
export const disableAnalytics = () => {
  localStorage.setItem('disable_analytics', 'true');
  console.log('Analytics disabled');
};

export const enableAnalytics = () => {
  localStorage.removeItem('disable_analytics');
  console.log('Analytics enabled');
};

export const setAdminAnalyticsExclusion = (exclude: boolean) => {
  if (exclude) {
    localStorage.setItem('exclude_admin_analytics', 'true');
    localStorage.setItem('user_is_admin', 'true');
  } else {
    localStorage.removeItem('exclude_admin_analytics');
    localStorage.removeItem('user_is_admin');
  }
  console.log(`Admin analytics exclusion ${exclude ? 'enabled' : 'disabled'}`);
};

export const getAnalyticsStatus = () => {
  return {
    disabled: localStorage.getItem('disable_analytics') === 'true',
    adminExcluded: localStorage.getItem('exclude_admin_analytics') === 'true' && 
                   localStorage.getItem('user_is_admin') === 'true',
    onAdminPage: window.location.pathname.startsWith('/admin')
  };
};

export const trackFormSubmission = (formName: string, formData?: Record<string, any>) => {
  trackEvent('form_submit', { 
    form_name: formName,
    ...formData 
  });
};

export const trackPhoneClick = (phoneNumber?: string) => {
  trackEvent('phone_click', { 
    event_category: 'contact',
    phone_number: phoneNumber 
  });
};

export const trackEmailClick = (email?: string) => {
  trackEvent('email_click', { 
    event_category: 'contact',
    email_address: email 
  });
};

export const trackButtonClick = (buttonText: string, buttonLocation: string) => {
  trackEvent('button_click', {
    button_text: buttonText,
    button_location: buttonLocation
  });
};

export const trackProductView = (productId: string, productName: string) => {
  trackEvent('product_view', {
    product_id: productId,
    product_name: productName
  });
};

export const trackQuoteRequest = (projectType?: string, estimatedValue?: string) => {
  trackEvent('quote_request', {
    project_type: projectType,
    estimated_value: estimatedValue
  });
};

export const trackNavigation = (fromPage: string, toPage: string) => {
  trackEvent('navigation', {
    from_page: fromPage,
    to_page: toPage,
    event_category: 'navigation'
  });
};

export const trackSearch = (searchTerm: string, searchCategory?: string) => {
  trackEvent('search', {
    search_term: searchTerm,
    search_category: searchCategory,
    event_category: 'search'
  });
};

// Initialize analytics when the module loads
if (typeof window !== 'undefined') {
  // Track initial page view
  document.addEventListener('DOMContentLoaded', () => {
    trackPageView();
  });

  // Track navigation for SPAs
  let currentPath = window.location.pathname;
  const observer = new MutationObserver(() => {
    if (window.location.pathname !== currentPath) {
      const oldPath = currentPath;
      currentPath = window.location.pathname;
      trackNavigation(oldPath, currentPath);
      trackPageView();
    }
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
