
import { trackEvent as dbTrackEvent, trackPageView as dbTrackPageView } from '@/api/analyticsApi';
import { enhanceAnalyticsData } from '../enhancedAnalyticsService';

export interface AnalyticsConfig {
  enabled: boolean;
  excludeAdmin: boolean;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  metaPixelId?: string;
}

export interface AnalyticsEvent {
  name: string;
  category?: string;
  parameters?: Record<string, any>;
}

class AnalyticsCore {
  private config: AnalyticsConfig = {
    enabled: true,
    excludeAdmin: true
  };

  private sessionId: string | null = null;

  constructor() {
    this.initializeSession();
  }

  private initializeSession() {
    this.sessionId = sessionStorage.getItem('analytics_session_id');
    if (!this.sessionId) {
      this.sessionId = `sess_${Math.random().toString(36).substring(2)}_${Date.now().toString(36)}`;
      sessionStorage.setItem('analytics_session_id', this.sessionId);
      sessionStorage.setItem('session_start_time', Date.now().toString());
    }
  }

  private shouldSkipTracking(): boolean {
    // Check if analytics is disabled
    if (!this.config.enabled || localStorage.getItem('disable_analytics') === 'true') {
      return true;
    }

    // Check admin exclusion
    if (this.config.excludeAdmin) {
      const isAdminPage = window.location.pathname.startsWith('/admin');
      const isAdmin = localStorage.getItem('user_is_admin') === 'true';
      const excludeAdmin = localStorage.getItem('exclude_admin_analytics') === 'true';
      
      if (isAdminPage || (isAdmin && excludeAdmin)) {
        return true;
      }
    }

    return false;
  }

  private getClientInfo() {
    const sessionStartTime = parseInt(sessionStorage.getItem('session_start_time') || Date.now().toString());
    const sessionDuration = Math.floor((Date.now() - sessionStartTime) / 1000);

    return {
      user_agent: navigator.userAgent,
      session_id: this.sessionId,
      page_path: window.location.pathname,
      page_url: window.location.href,
      referrer: document.referrer,
      session_duration: sessionDuration,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      connection_type: (navigator as any).connection?.effectiveType || 'unknown'
    };
  }

  updateConfig(newConfig: Partial<AnalyticsConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  async trackEvent(event: AnalyticsEvent) {
    if (typeof window === 'undefined' || this.shouldSkipTracking()) {
      return;
    }

    // Track with third-party services
    if (this.config.googleAnalyticsId && (window as any).gtag) {
      (window as any).gtag('event', event.name, event.parameters);
    }

    if (this.config.metaPixelId && (window as any).fbq) {
      (window as any).fbq('track', event.name, event.parameters);
    }

    // Track in database
    const baseData = {
      event_name: event.name,
      event_category: event.category || 'general',
      parameters: event.parameters,
      ...this.getClientInfo()
    };

    try {
      const enhancedData = await enhanceAnalyticsData(baseData);
      await dbTrackEvent(enhancedData);
    } catch (error) {
      console.error('Failed to track event:', error);
      // Fallback to basic tracking
      await dbTrackEvent(baseData).catch(err => console.error('Failed to track basic event:', err));
    }
  }

  async trackPageView(pageTitle?: string) {
    if (typeof window === 'undefined' || this.shouldSkipTracking()) {
      return;
    }

    const title = pageTitle || document.title;
    
    // Track as event for compatibility
    await this.trackEvent({
      name: 'page_view',
      category: 'navigation',
      parameters: { page_title: title }
    });

    // Track page view in database
    const baseData = {
      page_path: window.location.pathname,
      page_title: title,
      referrer: document.referrer,
      ...this.getClientInfo()
    };

    try {
      const enhancedData = await enhanceAnalyticsData(baseData);
      await dbTrackPageView(enhancedData);
    } catch (error) {
      console.error('Failed to track page view:', error);
      await dbTrackPageView(baseData).catch(err => console.error('Failed to track basic page view:', err));
    }
  }

  // Convenience methods for common events
  trackConversion(type: string, value?: number, details?: Record<string, any>) {
    return this.trackEvent({
      name: 'conversion',
      category: 'business',
      parameters: { conversion_type: type, value, ...details }
    });
  }

  trackInteraction(element: string, action: string, details?: Record<string, any>) {
    return this.trackEvent({
      name: 'interaction',
      category: 'engagement',
      parameters: { element, action, ...details }
    });
  }

  trackError(error: string, details?: Record<string, any>) {
    return this.trackEvent({
      name: 'error',
      category: 'system',
      parameters: { error_message: error, ...details }
    });
  }
}

// Create singleton instance
export const analytics = new AnalyticsCore();

// Export convenience functions
export const trackEvent = (event: AnalyticsEvent) => analytics.trackEvent(event);
export const trackPageView = (title?: string) => analytics.trackPageView(title);
export const trackConversion = (type: string, value?: number, details?: Record<string, any>) => 
  analytics.trackConversion(type, value, details);
export const trackInteraction = (element: string, action: string, details?: Record<string, any>) => 
  analytics.trackInteraction(element, action, details);
export const trackError = (error: string, details?: Record<string, any>) => 
  analytics.trackError(error, details);

// Admin controls
export const enableAnalytics = () => {
  localStorage.removeItem('disable_analytics');
  analytics.updateConfig({ enabled: true });
};

export const disableAnalytics = () => {
  localStorage.setItem('disable_analytics', 'true');
  analytics.updateConfig({ enabled: false });
};

export const setAdminExclusion = (exclude: boolean) => {
  if (exclude) {
    localStorage.setItem('exclude_admin_analytics', 'true');
    localStorage.setItem('user_is_admin', 'true');
  } else {
    localStorage.removeItem('exclude_admin_analytics');
    localStorage.removeItem('user_is_admin');
  }
  analytics.updateConfig({ excludeAdmin: exclude });
};

export const getAnalyticsStatus = () => ({
  enabled: !localStorage.getItem('disable_analytics'),
  adminExcluded: localStorage.getItem('exclude_admin_analytics') === 'true' && 
                 localStorage.getItem('user_is_admin') === 'true',
  onAdminPage: window.location.pathname.startsWith('/admin')
});

// Initialize tracking when module loads
if (typeof window !== 'undefined') {
  // Track initial page view
  document.addEventListener('DOMContentLoaded', () => {
    analytics.trackPageView();
  });

  // Track navigation for SPAs
  let currentPath = window.location.pathname;
  const observer = new MutationObserver(() => {
    if (window.location.pathname !== currentPath) {
      currentPath = window.location.pathname;
      analytics.trackPageView();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
