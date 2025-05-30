
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, parameters);
  }

  // Console log for debugging
  console.log('Analytics Event:', eventName, parameters);
};

export const trackPageView = (page: string) => {
  trackEvent('page_view', { page_title: page });
};

export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submit', { form_name: formName });
};

export const trackPhoneClick = () => {
  trackEvent('phone_click', { event_category: 'contact' });
};

export const trackEmailClick = () => {
  trackEvent('email_click', { event_category: 'contact' });
};
