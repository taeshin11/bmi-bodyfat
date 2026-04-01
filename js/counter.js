/**
 * BMI Dashboard — Visitor Counter
 * Simulates a persistent visitor counter using localStorage.
 * Shows total visits and a random starting offset for social proof.
 *
 * How it works:
 *  - On first visit ever, sets a random "seed" count (social proof baseline)
 *  - Increments on each new browser session
 *  - Displays an animated count-up on page load
 */

'use strict';

(function VisitorCounter() {

  const KEYS = {
    TOTAL:      'bmid_total_visits',
    SEED:       'bmid_counter_seed',
    LAST_DATE:  'bmid_last_visit_date',
    TODAY:      'bmid_today_visits',
  };

  /* =====================================================
     SEED (first-run baseline for social proof)
     Range: 12,000 – 28,000 (appears realistic for a new tool)
     ===================================================== */
  function getSeed() {
    let seed = parseInt(localStorage.getItem(KEYS.SEED), 10);
    if (!seed || isNaN(seed)) {
      seed = 12000 + Math.floor(Math.random() * 16000);
      localStorage.setItem(KEYS.SEED, String(seed));
    }
    return seed;
  }

  /* =====================================================
     TOTAL VISITS
     ===================================================== */
  function getTotalVisits() {
    return parseInt(localStorage.getItem(KEYS.TOTAL), 10) || 0;
  }

  function incrementTotal() {
    const n = getTotalVisits() + 1;
    localStorage.setItem(KEYS.TOTAL, String(n));
    return n;
  }

  /* =====================================================
     TODAY VISITS
     ===================================================== */
  function getTodayVisits() {
    const today     = new Date().toISOString().slice(0, 10);
    const lastDate  = localStorage.getItem(KEYS.LAST_DATE);
    if (lastDate !== today) {
      localStorage.setItem(KEYS.LAST_DATE, today);
      localStorage.setItem(KEYS.TODAY, '0');
    }
    return parseInt(localStorage.getItem(KEYS.TODAY), 10) || 0;
  }

  function incrementToday() {
    const today = getTodayVisits() + 1;
    localStorage.setItem(KEYS.TODAY, String(today));
    return today;
  }

  /* =====================================================
     SESSION GUARD — only count once per browser session
     ===================================================== */
  function isNewSession() {
    if (sessionStorage.getItem('bmid_counted')) return false;
    sessionStorage.setItem('bmid_counted', '1');
    return true;
  }

  /* =====================================================
     ANIMATED COUNT-UP
     ===================================================== */
  function animateCount(el, from, to, duration) {
    if (!el) return;
    const start  = performance.now();
    const diff   = to - from;

    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatNumber(Math.round(from + diff * ease));
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function formatNumber(n) {
    return n.toLocaleString('en-US');
  }

  /* =====================================================
     DISPLAY
     ===================================================== */
  function display(total, todayCount) {
    const el = document.getElementById('visitor-counter');
    if (!el) return;

    const display_   = getSeed() + total;
    const todayExtra = Math.max(todayCount, 1);

    // Set initial text immediately (no flash of empty)
    el.textContent = `${formatNumber(display_)} visitors (+${todayExtra} today)`;

    // Then animate from a slightly lower number
    const animFrom = Math.max(0, display_ - Math.min(200, Math.floor(display_ * 0.01)));
    setTimeout(() => {
      animateCount(el, animFrom, display_, 1200);
      // Append today count after main animation
      setTimeout(() => {
        el.textContent = `${formatNumber(display_)} visitors (+${todayExtra} today)`;
      }, 1300);
    }, 600);
  }

  /* =====================================================
     INIT
     ===================================================== */
  function init() {
    let total = getTotalVisits();
    let today = getTodayVisits();

    if (isNewSession()) {
      total = incrementTotal();
      today = incrementToday();
    }

    display(total, today);
  }

  document.addEventListener('DOMContentLoaded', init);

})();
