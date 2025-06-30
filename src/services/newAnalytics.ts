import { supabase } from "@/integrations/supabase/client";

export interface SimplePageView {
  id?: string;
  page: string;
  timestamp: string;
  session_id: string;
  referrer?: string;
}

export interface SimpleEvent {
  id?: string;
  event_name: string;
  page: string;
  timestamp: string;
  session_id: string;
  data?: any;
}

class NewAnalyticsService {
  private sessionId: string;
  private pageViews: SimplePageView[] = [];
  private events: SimpleEvent[] = [];
  
  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.loadFromStorage();
  }

  private getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  private loadFromStorage(): void {
    try {
      const storedViews = localStorage.getItem('analytics_page_views');
      const storedEvents = localStorage.getItem('analytics_events');
      
      if (storedViews) {
        this.pageViews = JSON.parse(storedViews);
      }
      
      if (storedEvents) {
        this.events = JSON.parse(storedEvents);
      }
    } catch (error) {
      console.error('Failed to load analytics from storage:', error);
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('analytics_page_views', JSON.stringify(this.pageViews));
      localStorage.setItem('analytics_events', JSON.stringify(this.events));
    } catch (error) {
      console.error('Failed to save analytics to storage:', error);
    }
  }

  async trackPageView(page: string): Promise<void> {
    try {
      const pageView: SimplePageView = {
        id: `pv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        page,
        timestamp: new Date().toISOString(),
        referrer: document.referrer || undefined,
        session_id: this.sessionId
      };

      this.pageViews.push(pageView);
      this.saveToStorage();
      
      // Keep only last 1000 page views to prevent storage bloat
      if (this.pageViews.length > 1000) {
        this.pageViews = this.pageViews.slice(-1000);
        this.saveToStorage();
      }
      
      console.log('Page view tracked:', pageView);
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  async trackEvent(eventName: string, data?: Record<string, any>): Promise<void> {
    try {
      const event: SimpleEvent = {
        id: `ev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        event_name: eventName,
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        data: data || undefined,
        session_id: this.sessionId
      };

      this.events.push(event);
      this.saveToStorage();
      
      // Keep only last 1000 events
      if (this.events.length > 1000) {
        this.events = this.events.slice(-1000);
        this.saveToStorage();
      }
      
      console.log('Event tracked:', event);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  async getPageViews(days: number = 7): Promise<SimplePageView[]> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      return this.pageViews.filter(view => 
        new Date(view.timestamp) >= startDate
      );
    } catch (error) {
      console.error('Error fetching page views:', error);
      return [];
    }
  }

  async getEvents(days: number = 7): Promise<SimpleEvent[]> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      return this.events.filter(event => 
        new Date(event.timestamp) >= startDate
      );
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }

  async getTopPages(days: number = 7): Promise<Array<{ page: string; views: number }>> {
    try {
      const recentViews = await this.getPageViews(days);
      
      const pageCounts = recentViews.reduce((acc, view) => {
        acc[view.page] = (acc[view.page] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(pageCounts)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);
    } catch (error) {
      console.error('Error fetching top pages:', error);
      return [];
    }
  }

  async clearData(): Promise<void> {
    this.pageViews = [];
    this.events = [];
    this.saveToStorage();
  }
}

export const newAnalytics = new NewAnalyticsService();