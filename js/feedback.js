/**
 * BMI Dashboard — Feedback Widget
 * Floating button → Modal dialog → Submit handler.
 *
 * On submit:
 *  - Validates form (type selection + message min length)
 *  - Fires 'feedback:submitted' custom event for data-collector
 *  - Opens a mailto: link (can be replaced with fetch() to a backend)
 *  - Shows a success toast notification
 *  - Closes and resets the modal
 */

'use strict';

(function FeedbackWidget() {

  /* =====================================================
     CONFIG
     Replace EMAIL with your actual support address.
     ===================================================== */
  const CONFIG = {
    EMAIL:      'taeshinkim11@gmail.com',
    TOAST_MS:   3500,
    MIN_CHARS:  10,
    MAX_CHARS:  1000,
  };

  /* =====================================================
     DOM REFS (resolved after DOMContentLoaded)
     ===================================================== */
  let fab, modal, form, closeBtn, cancelBtn,
      typeSelect, messageTA, charCount, errorEl, toastEl, toastMsg;

  /* =====================================================
     MODAL OPEN / CLOSE
     ===================================================== */
  function openModal() {
    modal.hidden = false;
    modal.removeAttribute('hidden');
    fab.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Focus first interactive element
    setTimeout(() => typeSelect?.focus(), 50);
    document.addEventListener('keydown', handleEscape);
  }

  function closeModal() {
    modal.hidden = true;
    fab.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleEscape);
    clearFeedbackError();
  }

  function handleEscape(e) {
    if (e.key === 'Escape') closeModal();
  }

  /* =====================================================
     FORM VALIDATION
     ===================================================== */
  function validateFeedback() {
    const type    = typeSelect?.value;
    const message = messageTA?.value?.trim();

    if (!type) return 'Please select a feedback type.';
    if (!message || message.length < CONFIG.MIN_CHARS)
      return `Please write at least ${CONFIG.MIN_CHARS} characters.`;
    if (message.length > CONFIG.MAX_CHARS)
      return `Please keep your message under ${CONFIG.MAX_CHARS} characters.`;
    return null;
  }

  function showFeedbackError(msg) {
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
  }

  function clearFeedbackError() {
    if (!errorEl) return;
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
  }

  /* =====================================================
     SUBMIT HANDLER
     ===================================================== */
  function handleSubmit(e) {
    e.preventDefault();
    clearFeedbackError();

    const err = validateFeedback();
    if (err) { showFeedbackError(err); return; }

    const type    = typeSelect.value;
    const message = messageTA.value.trim();
    const subject = encodeURIComponent(`[BMI Dashboard Feedback] ${labelFor(type)}`);
    const body    = encodeURIComponent(`Feedback Type: ${labelFor(type)}\n\n${message}\n\n---\nSent via BMI Dashboard`);

    // Dispatch event for analytics (type only — never the message)
    document.dispatchEvent(new CustomEvent('feedback:submitted', { detail: { type } }));

    // Open mailto (gracefully — if blocked, user still sees toast)
    try {
      window.location.href = `mailto:${CONFIG.EMAIL}?subject=${subject}&body=${body}`;
    } catch (_) {}

    // Reset + close
    form.reset();
    updateCharCount(0);
    closeModal();
    showToast('Thank you! Your feedback has been sent.');
  }

  function labelFor(type) {
    const map = {
      bug:        'Bug Report',
      suggestion: 'Feature Suggestion',
      accuracy:   'Accuracy Concern',
      ui:         'User Interface',
      general:    'General Comment',
    };
    return map[type] || type;
  }

  /* =====================================================
     CHARACTER COUNTER
     ===================================================== */
  function updateCharCount(len) {
    if (!charCount) return;
    charCount.textContent = `${len} / ${CONFIG.MAX_CHARS}`;
    charCount.style.color = len > CONFIG.MAX_CHARS * 0.9 ? '#FAAD14'
      : len >= CONFIG.MAX_CHARS ? '#FF4D4F'
      : '';
  }

  /* =====================================================
     TOAST
     ===================================================== */
  function showToast(message) {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = message;
    toastEl.hidden = false;
    toastEl.removeAttribute('hidden');

    // Auto-hide
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => {
      toastEl.hidden = true;
    }, CONFIG.TOAST_MS);
  }

  /* =====================================================
     OVERLAY CLICK TO CLOSE
     ===================================================== */
  function handleOverlayClick(e) {
    if (e.target === modal) closeModal();
  }

  /* =====================================================
     INIT
     ===================================================== */
  function init() {
    fab       = document.getElementById('feedback-btn');
    modal     = document.getElementById('feedback-modal');
    form      = document.getElementById('feedback-form');
    closeBtn  = document.getElementById('feedback-modal-close');
    cancelBtn = document.getElementById('feedback-cancel-btn');
    typeSelect = document.getElementById('feedback-type');
    messageTA  = document.getElementById('feedback-message');
    charCount  = document.getElementById('feedback-char-count');
    errorEl    = document.getElementById('feedback-error');
    toastEl    = document.getElementById('toast');
    toastMsg   = document.getElementById('toast-message');

    if (!fab || !modal || !form) return;

    // Open
    fab.addEventListener('click', openModal);

    // Close
    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', handleOverlayClick);

    // Submit
    form.addEventListener('submit', handleSubmit);

    // Char counter
    messageTA?.addEventListener('input', () => {
      updateCharCount(messageTA.value.length);
    });

    // Init char count display
    updateCharCount(0);

    // Focus trap inside modal (Tab key)
    modal.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const focusable = [...modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )].filter(el => !el.disabled && !el.hidden);
      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);

})();
