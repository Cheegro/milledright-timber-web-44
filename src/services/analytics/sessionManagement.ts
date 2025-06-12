
// Session management and analytics
interface SessionData {
  session_id: string;
  duration?: number;
  page_count?: number;
  is_bounce?: boolean;
}

const sessionCache = new Map<string, SessionData>();

export const getSessionAnalytics = (sessionId: string): SessionData => {
  const now = Date.now();
  const stored = sessionCache.get(sessionId);
  
  if (stored) {
    // Update existing session
    stored.duration = Math.floor((now - (stored.duration || now)) / 1000);
    stored.page_count = (stored.page_count || 0) + 1;
    stored.is_bounce = stored.page_count === 1;
    sessionCache.set(sessionId, stored);
    return stored;
  } else {
    // New session
    const newSession: SessionData = {
      session_id: sessionId,
      duration: 0,
      page_count: 1,
      is_bounce: true
    };
    sessionCache.set(sessionId, newSession);
    return newSession;
  }
};
