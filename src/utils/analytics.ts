
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

  // Console log for debugging
  console.log('Analytics Event:', eventName, parameters);
};

export const trackPageView = (page: string) => {
  trackEvent('page_view', { page_title: page });
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
