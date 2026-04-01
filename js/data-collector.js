/**
 * BMI Dashboard — Data Collector
 * Collects anonymized, privacy-respecting usage analytics.
 *
 * NO personally identifiable information (PII) is ever collected.
 * Events are logged to localStorage; remote sending is opt-in via CONFIG.
 *
 * Tracked events:
 *  - page_view
 *  - bmi_calculated     (rounded value + category only)
 *  - bodyfat_calculated (rounded value + category + gender)
 *  - feedback_submitted (feedback type only — message never sent)
 */

'use strict';

const DataCollector = (() => {

  /* =====================================================
     CONFIGURATION
     ===================================================== */
  const CONFIG = {
    ENABLED:     false,   // set true + provide ENDPOINT to send events remotely
    ENDPOINT:    '',      // e.g. 'https://api.bmi-bodyfat.vercel.app/analytics'
    SESSION_KEY: 'bmid_session',
    LOG_KEY:     'bmid_event_log',
    MAX_LOG:     100,
  };

  /* =====================================================
     SESSION
     ===================================================== */
  function getSession() {
    try {
      const raw = sessionStorage.getItem(CONFIG.SESSION_KEY);
      if (raw) return JSON.parse(raw);
      const s = { id: uid(), start: Date.now(), views: 0, calcs: 0 };
      sessionStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify(s));
      return s;
    } catch (_) {
      return { id: 'err', start: Date.now(), views: 0, calcs: 0 };
    }
  }

  function patchSession(patch) {
    try {
      sessionStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify({ ...getSession(), ...patch }));
    } catch (_) {}
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  /* =====================================================
     LOCAL EVENT LOG
     ===================================================== */
  function getLog() {
    try {
      return JSON.parse(localStorage.getItem(CONFIG.LOG_KEY) || '[]');
    } catch (_) { return []; }
  }

  function logEvent(name, data) {
    try {
      const log   = getLog();
      const entry = { name, ts: Date.now(), sid: getSession().id, ...data };
      log.push(entry);
      while (log.length > CONFIG.MAX_LOG) log.shift();
      localStorage.setItem(CONFIG.LOG_KEY, JSON.stringify(log));
      if (CONFIG.ENABLED && CONFIG.ENDPOINT) remoteLog(entry);
    } catch (_) {}
  }

  /* =====================================================
     REMOTE LOGGING (OPTIONAL)
     ===================================================== */
  function remoteLog(entry) {
    if (!CONFIG.ENDPOINT) return;
    const body = JSON.stringify(entry);
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(CONFIG.ENDPOINT, new Blob([body], { type: 'application/json' }));
      } else {
        fetch(CONFIG.ENDPOINT, { method: 'POST', body, headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => {});
      }
    } catch (_) {}
  }

  /* =====================================================
     CONTEXT (NON-PII DEVICE METADATA)
     ===================================================== */
  function ctx() {
    return {
      vp:  `${window.innerWidth}x${window.innerHeight}`,
      mob: /Mobi|Android|iPhone/i.test(navigator.userAgent),
      tz:  Intl?.DateTimeFormat().resolvedOptions().timeZone || '?',
      ref: document.referrer ? (new URL(document.referrer).hostname) : 'direct',
    };
  }

  /* =====================================================
     PUBLIC TRACK METHODS
     ===================================================== */
  function trackPageView() {
    const s = getSession();
    patchSession({ views: s.views + 1 });
    logEvent('page_view', { path: location.pathname, ctx: ctx() });
  }

  function trackBmi(bmi, category) {
    const s = getSession();
    patchSession({ calcs: s.calcs + 1 });
    logEvent('bmi_calculated', { bmi: Math.round(bmi * 10) / 10, category });
  }

  function trackBodyFat(bf, category, gender) {
    logEvent('bodyfat_calculated', { bf: Math.round(bf * 10) / 10, category, gender });
  }

  function trackFeedback(type) {
    logEvent('feedback_submitted', { type });
  }

  function getStats() {
    const log = getLog();
    return {
      events:    log.length,
      bmiCalcs:  log.filter(e => e.name === 'bmi_calculated').length,
      bfCalcs:   log.filter(e => e.name === 'bodyfat_calculated').length,
      pageViews: log.filter(e => e.name === 'page_view').length,
      session:   getSession(),
    };
  }

  /* =====================================================
     WIRE UP
     ===================================================== */
  function init() {
    trackPageView();

    document.addEventListener('bmi:calculated', ({ detail: { bmi, category } }) => {
      trackBmi(bmi, category);
    });

    document.addEventListener('bodyfat:calculated', ({ detail: { bf, category, gender } }) => {
      trackBodyFat(bf, category, gender);
    });

    document.addEventListener('feedback:submitted', ({ detail: { type } }) => {
      trackFeedback(type);
    });

    // Expose stats for debugging in console: __bmiStats()
    window.__bmiStats = getStats;
  }

  return { init, trackPageView, trackBmi, trackBodyFat, trackFeedback, getStats };
})();

document.addEventListener('DOMContentLoaded', DataCollector.init.bind(DataCollector));
