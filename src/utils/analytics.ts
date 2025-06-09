
import { trackEvent as dbTrackEvent, trackPageView as dbTrackPageView } from '@/api/analyticsApi';

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

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  // Only track if we're in the browser
  if (typeof window === 'undefined') return;

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

  // Store in our database
  dbTrackEvent({
    event_name: eventName,
    event_category: parameters?.event_category || 'general',
    parameters,
    ...getClientInfo()
  }).catch(err => console.error('Failed to track event:', err));

  // Console log for debugging
  console.log('Analytics Event:', eventName, parameters);
};

export const trackPageView = (page?: string) => {
  if (typeof window === 'undefined') return;

  const pageTitle = page || document.title;
  
  trackEvent('page_view', { page_title: pageTitle });
  
  // Store page view in our database
  dbTrackPageView({
    page_path: window.location.pathname,
    page_title: pageTitle,
    referrer: document.referrer,
    ...getClientInfo()
  }).catch(err => console.error('Failed to track page view:', err));

  console.log('Page view tracked:', window.location.pathname);
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
