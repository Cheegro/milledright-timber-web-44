
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
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
    console.log('GA4 Event tracked:', eventName, parameters);
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, parameters);
    console.log('Meta Pixel Event tracked:', eventName, parameters);
  }

  // Store in our database
  if (typeof window !== 'undefined') {
    dbTrackEvent({
      event_name: eventName,
      event_category: parameters?.event_category || 'general',
      parameters,
      ...getClientInfo()
    });
  }

  // Console log for debugging
  console.log('Analytics Event:', eventName, parameters);
};

export const trackPageView = (page: string) => {
  trackEvent('page_view', { page_title: page });
  
  // Store page view in our database
  if (typeof window !== 'undefined') {
    dbTrackPageView({
      page_path: window.location.pathname,
      page_title: page,
      referrer: document.referrer,
      ...getClientInfo()
    });
  }
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
