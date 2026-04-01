/**
 * BMI Dashboard — Calculator Logic
 * Handles BMI + US Navy Body Fat calculations,
 * tab switching, unit toggling, form validation,
 * and localStorage persistence.
 */

'use strict';

/* =====================================================
   CONSTANTS & LOOKUP TABLES
   ===================================================== */

const BMI_CATEGORIES = [
  { max: 18.5,     label: 'Underweight',   cls: 'underweight', color: '#1890FF' },
  { max: 25,       label: 'Normal Weight', cls: 'normal',      color: '#52C41A' },
  { max: 30,       label: 'Overweight',    cls: 'overweight',  color: '#FAAD14' },
  { max: Infinity, label: 'Obese',         cls: 'obese',       color: '#FF4D4F' },
];

const BODY_FAT_CATEGORIES = {
  male: [
    { max: 6,        label: 'Essential Fat', cls: 'essential', color: '#FF4D4F' },
    { max: 14,       label: 'Athlete',       cls: 'athlete',   color: '#52C41A' },
    { max: 18,       label: 'Fitness',       cls: 'fitness',   color: '#52C41A' },
    { max: 25,       label: 'Average',       cls: 'average',   color: '#FAAD14' },
    { max: Infinity, label: 'Obese',         cls: 'obese',     color: '#FF4D4F' },
  ],
  female: [
    { max: 14,       label: 'Essential Fat', cls: 'essential', color: '#FF4D4F' },
    { max: 21,       label: 'Athlete',       cls: 'athlete',   color: '#52C41A' },
    { max: 25,       label: 'Fitness',       cls: 'fitness',   color: '#52C41A' },
    { max: 32,       label: 'Average',       cls: 'average',   color: '#FAAD14' },
    { max: Infinity, label: 'Obese',         cls: 'obese',     color: '#FF4D4F' },
  ],
};

const BMI_INSIGHTS = {
  underweight: [
    'Your BMI suggests you may be underweight. Consider speaking with a healthcare provider about healthy weight gain strategies.',
    'Being underweight can sometimes indicate nutritional deficiencies. A balanced diet rich in nutrient-dense foods may help.',
  ],
  normal: [
    'Excellent! Your BMI is in the healthy range. Maintaining regular physical activity and a balanced diet will help you stay here.',
    'You are in the healthy weight range for your height. Keep up your current healthy habits!',
  ],
  overweight: [
    'Your BMI is slightly above the healthy range. Even modest weight loss (5–10%) can significantly improve health markers.',
    'Small, consistent lifestyle changes — like a 20-minute daily walk and reducing processed foods — can bring your BMI back to the healthy range.',
  ],
  obese: [
    'Your BMI is in the obese range. Consulting a healthcare provider is recommended for a personalized plan.',
    'Gradual, sustainable weight loss through diet and exercise has proven health benefits at this BMI level. Seek professional guidance.',
  ],
};

const BODY_FAT_INSIGHTS = {
  essential: 'You are near the essential fat threshold. This level is typically seen in competitive athletes and may not be sustainable long-term.',
  athlete:   'Excellent! This is the body fat range of competitive athletes. Maintaining this requires consistent training and careful nutrition.',
  fitness:   'Great job! You are in the fitness range, indicating good body composition and physical health.',
  average:   'Your body fat is in the average range. There is room for improvement through regular exercise and a balanced diet.',
  obese:     'Your body fat percentage is in the obese range. Combining aerobic exercise with strength training is effective for fat loss. Consider speaking with a professional.',
};

/* =====================================================
   DOM HELPERS
   ===================================================== */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function show(el) { if (el) el.classList.remove('hidden'); }
function hide(el) { if (el) el.classList.add('hidden'); }

function showErr(elId, msg) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = msg;
  show(el);
}
function clearErr(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = '';
  hide(el);
}

/* =====================================================
   TAB SWITCHING
   ===================================================== */
function initTabs() {
  const tabs = $$('.tab-btn');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabs.forEach(t => {
        t.classList.remove('tab-btn--active');
        t.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('tab-btn--active');
      btn.setAttribute('aria-selected', 'true');
      $$('.tab-panel').forEach(panel => hide(panel));
      const panel = document.getElementById(`panel-${target}`);
      if (panel) show(panel);
    });
  });
}

/* =====================================================
   UNIT TOGGLE — BMI FORM
   ===================================================== */
function initBmiUnitToggle() {
  $$('input[name="bmi-unit"]').forEach(radio => {
    radio.addEventListener('change', () => {
      toggleBmiUnits(radio.value === 'imperial');
      saveBmiInputs();
    });
  });
}

function toggleBmiUnits(isImperial) {
  const metricH = document.getElementById('bmi-height-metric-group');
  const imperH  = document.getElementById('bmi-height-imperial-group');
  const metricW = document.getElementById('bmi-weight-metric-group');
  const imperW  = document.getElementById('bmi-weight-imperial-group');
  if (isImperial) { hide(metricH); show(imperH); hide(metricW); show(imperW); }
  else            { show(metricH); hide(imperH); show(metricW); hide(imperW); }
}

/* =====================================================
   UNIT TOGGLE — BODY FAT FORM
   ===================================================== */
function initBfUnitToggle() {
  $$('input[name="bf-unit"]').forEach(radio => {
    radio.addEventListener('change', () => {
      toggleBfUnits(radio.value === 'imperial');
      saveBfInputs();
    });
  });
}

function toggleBfUnits(isImperial) {
  const pairs = [
    ['bf-height-metric-group', 'bf-height-imperial-group'],
    ['bf-waist-metric-group',  'bf-waist-imperial-group'],
    ['bf-neck-metric-group',   'bf-neck-imperial-group'],
    ['bf-hip-metric-group',    'bf-hip-imperial-group'],
  ];
  pairs.forEach(([m, i]) => {
    const mEl = document.getElementById(m);
    const iEl = document.getElementById(i);
    if (!mEl || !iEl) return;
    if (isImperial) { hide(mEl); show(iEl); }
    else            { show(mEl); hide(iEl); }
  });
}

/* =====================================================
   GENDER TOGGLE — BODY FAT FORM
   ===================================================== */
function initGenderToggle() {
  $$('input[name="bf-gender"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const isFemale = radio.value === 'female';
      toggleHipFields(isFemale);
      updateBodyFatRanges(radio.value);
      if (window.setGaugeGender) window.setGaugeGender(radio.value);
      saveBfInputs();
    });
  });
}

function toggleHipFields(showHip) {
  const isImperial = document.querySelector('input[name="bf-unit"]:checked')?.value === 'imperial';
  const metricHip  = document.getElementById('bf-hip-metric-group');
  const imperHip   = document.getElementById('bf-hip-imperial-group');
  if (showHip) {
    if (!isImperial) show(metricHip); else show(imperHip);
  } else {
    hide(metricHip); hide(imperHip);
  }
}

function updateBodyFatRanges(gender) {
  const rangesEl = document.getElementById('bodyfat-ranges');
  if (!rangesEl) return;
  const titleEl = rangesEl.querySelector('.result-card__ranges-title');
  const listEl  = rangesEl.querySelector('.range-list');
  if (!titleEl || !listEl) return;

  const maleCats = [
    { cls: 'info',    label: 'Essential Fat: 2–5%' },
    { cls: 'success', label: 'Athlete: 6–13%' },
    { cls: 'success', label: 'Fitness: 14–17%' },
    { cls: 'warning', label: 'Average: 18–24%' },
    { cls: 'danger',  label: 'Obese: ≥ 25%' },
  ];
  const femaleCats = [
    { cls: 'info',    label: 'Essential Fat: < 14%' },
    { cls: 'success', label: 'Athlete: 14–20%' },
    { cls: 'success', label: 'Fitness: 21–24%' },
    { cls: 'warning', label: 'Average: 25–31%' },
    { cls: 'danger',  label: 'Obese: ≥ 32%' },
  ];
  const cats = gender === 'female' ? femaleCats : maleCats;
  titleEl.textContent = `Body Fat Categories (${gender === 'female' ? 'Women' : 'Men'})`;
  listEl.innerHTML = cats.map(c =>
    `<li class="range-item range-item--${c.cls}"><span class="range-dot"></span><span>${c.label}</span></li>`
  ).join('');
}

/* =====================================================
   BMI CALCULATION
   ===================================================== */
function getBmiInputs() {
  const unit = document.querySelector('input[name="bmi-unit"]:checked')?.value || 'metric';
  let heightCm, weightKg;
  if (unit === 'metric') {
    heightCm = parseFloat(document.getElementById('bmi-height-cm')?.value) || 0;
    weightKg = parseFloat(document.getElementById('bmi-weight-kg')?.value) || 0;
  } else {
    const ft   = parseFloat(document.getElementById('bmi-height-ft')?.value) || 0;
    const inch = parseFloat(document.getElementById('bmi-height-in')?.value) || 0;
    heightCm   = (ft * 12 + inch) * 2.54;
    weightKg   = (parseFloat(document.getElementById('bmi-weight-lbs')?.value) || 0) * 0.453592;
  }
  const age = parseInt(document.getElementById('bmi-age')?.value) || null;
  return { heightCm, weightKg, age, unit };
}

function calculateBmi(heightCm, weightKg) {
  if (!heightCm || !weightKg) return null;
  const m = heightCm / 100;
  return weightKg / (m * m);
}

function getBmiCategory(bmi) {
  return BMI_CATEGORIES.find(c => bmi < c.max);
}

function getBmiInsight(cls, bmi) {
  const lines = BMI_INSIGHTS[cls] || [''];
  return lines[Math.floor(bmi * 100) % lines.length];
}

function validateBmiInputs({ heightCm, weightKg, unit }) {
  const errors = [];
  if (!heightCm || heightCm < 50 || heightCm > 300)
    errors.push('Please enter a valid height (50–300 cm).');
  if (!weightKg || weightKg < 1 || weightKg > 700)
    errors.push(unit === 'imperial' ? 'Please enter a valid weight (1–1,500 lbs).' : 'Please enter a valid weight (1–700 kg).');
  return errors;
}

function displayBmiResult(bmi, category) {
  const numEl     = document.getElementById('bmi-number');
  const badgeEl   = document.getElementById('bmi-category-text');
  const insightEl = document.getElementById('bmi-insight');

  if (numEl)    { numEl.textContent = bmi.toFixed(1); numEl.style.color = category.color; }
  if (badgeEl)  { badgeEl.textContent = category.label; badgeEl.className = `category-badge category-badge--${category.cls}`; }
  if (insightEl) insightEl.innerHTML = `<p>${getBmiInsight(category.cls, bmi)}</p>`;

  if (window.updateBmiGauge) window.updateBmiGauge(bmi);

  const resultsEl = document.getElementById('results');
  if (resultsEl) setTimeout(() => resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
}

function initBmiForm() {
  const form = document.getElementById('bmi-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErr('bmi-error');
    const inputs = getBmiInputs();
    const errors = validateBmiInputs(inputs);
    if (errors.length) { showErr('bmi-error', errors[0]); return; }

    const bmi = calculateBmi(inputs.heightCm, inputs.weightKg);
    if (bmi === null) { showErr('bmi-error', 'Unable to calculate. Please check your inputs.'); return; }

    const category = getBmiCategory(bmi);
    displayBmiResult(bmi, category);
    saveBmiInputs();
    document.dispatchEvent(new CustomEvent('bmi:calculated', { detail: { bmi, category: category.label } }));
  });

  document.getElementById('bmi-reset-btn')?.addEventListener('click', resetBmiForm);
}

function resetBmiForm() {
  document.getElementById('bmi-form')?.reset();
  clearErr('bmi-error');
  toggleBmiUnits(false);
  const numEl     = document.getElementById('bmi-number');
  const badgeEl   = document.getElementById('bmi-category-text');
  const insightEl = document.getElementById('bmi-insight');
  if (numEl)    { numEl.textContent = '--'; numEl.style.color = ''; }
  if (badgeEl)  { badgeEl.textContent = 'Enter your measurements'; badgeEl.className = 'category-badge'; }
  if (insightEl) insightEl.innerHTML = '<p>Calculate your BMI to see personalized health insights here.</p>';
  if (window.updateBmiGauge) window.updateBmiGauge(null);
  localStorage.removeItem('bmiInputs');
}

/* =====================================================
   BODY FAT CALCULATION (US Navy Method)
   ===================================================== */
function getBfInputs() {
  const unit   = document.querySelector('input[name="bf-unit"]:checked')?.value || 'metric';
  const gender = document.querySelector('input[name="bf-gender"]:checked')?.value || 'male';
  const toCm   = v => unit === 'imperial' ? v * 2.54 : v;
  const s      = unit === 'imperial' ? 'in' : 'cm';

  const heightCm = toCm(parseFloat(document.getElementById(`bf-height-${s}`)?.value) || 0);
  const waistCm  = toCm(parseFloat(document.getElementById(`bf-waist-${s}`)?.value)  || 0);
  const neckCm   = toCm(parseFloat(document.getElementById(`bf-neck-${s}`)?.value)   || 0);
  const hipCm    = gender === 'female'
    ? toCm(parseFloat(document.getElementById(`bf-hip-${s}`)?.value) || 0)
    : 0;
  return { heightCm, waistCm, neckCm, hipCm, gender, unit };
}

function calculateBodyFat({ heightCm, waistCm, neckCm, hipCm, gender }) {
  if (!heightCm || !waistCm || !neckCm) return null;
  if (gender === 'female' && !hipCm) return null;
  let bf;
  if (gender === 'male') {
    const diff = waistCm - neckCm;
    if (diff <= 0) return null;
    bf = 495 / (1.0324 - 0.19077 * Math.log10(diff) + 0.15456 * Math.log10(heightCm)) - 450;
  } else {
    const sum = waistCm + hipCm - neckCm;
    if (sum <= 0) return null;
    bf = 495 / (1.29579 - 0.35004 * Math.log10(sum) + 0.22100 * Math.log10(heightCm)) - 450;
  }
  return isFinite(bf) ? Math.max(2, Math.min(70, bf)) : null;
}

function getBfCategory(bf, gender) {
  return BODY_FAT_CATEGORIES[gender].find(c => bf < c.max);
}

function validateBfInputs({ heightCm, waistCm, neckCm, hipCm, gender, unit }) {
  const errors = [];
  const imp = unit === 'imperial';
  if (!heightCm || heightCm < 50 || heightCm > 300)
    errors.push(imp ? 'Enter a valid height (1\'8\" – 9\'10\").' : 'Enter a valid height (50–300 cm).');
  if (!waistCm || waistCm < 40 || waistCm > 250)
    errors.push(imp ? 'Enter a valid waist (16–100 in).' : 'Enter a valid waist (40–250 cm).');
  if (!neckCm || neckCm < 20 || neckCm > 80)
    errors.push(imp ? 'Enter a valid neck (8–32 in).' : 'Enter a valid neck (20–80 cm).');
  if (gender === 'female' && (!hipCm || hipCm < 50 || hipCm > 250))
    errors.push(imp ? 'Enter a valid hip measurement (20–100 in).' : 'Enter a valid hip (50–250 cm).');
  return errors;
}

function displayBfResult(bf, category) {
  const numEl     = document.getElementById('bodyfat-number');
  const badgeEl   = document.getElementById('bodyfat-category-text');
  const insightEl = document.getElementById('bodyfat-insight');
  if (numEl)    { numEl.textContent = bf.toFixed(1); numEl.style.color = category.color; }
  if (badgeEl)  { badgeEl.textContent = category.label; badgeEl.className = `category-badge category-badge--${category.cls}`; }
  if (insightEl) insightEl.innerHTML = `<p>${BODY_FAT_INSIGHTS[category.cls] || ''}</p>`;
  if (window.updateBodyFatGauge) window.updateBodyFatGauge(bf);
}

function initBfForm() {
  const form = document.getElementById('bodyfat-form');
  if (!form) return;
  toggleHipFields(false); // default: male, no hip

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErr('bodyfat-error');
    const inputs = getBfInputs();
    const errors = validateBfInputs(inputs);
    if (errors.length) { showErr('bodyfat-error', errors[0]); return; }
    const bf = calculateBodyFat(inputs);
    if (bf === null) { showErr('bodyfat-error', 'Could not calculate. Check that waist is larger than neck.'); return; }
    const category = getBfCategory(bf, inputs.gender);
    displayBfResult(bf, category);
    saveBfInputs();
    const resultsEl = document.getElementById('results');
    if (resultsEl) setTimeout(() => resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    document.dispatchEvent(new CustomEvent('bodyfat:calculated', { detail: { bf, category: category.label, gender: inputs.gender } }));
  });

  document.getElementById('bodyfat-reset-btn')?.addEventListener('click', resetBfForm);
}

function resetBfForm() {
  document.getElementById('bodyfat-form')?.reset();
  clearErr('bodyfat-error');
  toggleBfUnits(false);
  toggleHipFields(false);
  updateBodyFatRanges('male');
  const numEl     = document.getElementById('bodyfat-number');
  const badgeEl   = document.getElementById('bodyfat-category-text');
  const insightEl = document.getElementById('bodyfat-insight');
  if (numEl)    { numEl.textContent = '--'; numEl.style.color = ''; }
  if (badgeEl)  { badgeEl.textContent = 'Enter your measurements'; badgeEl.className = 'category-badge'; }
  if (insightEl) insightEl.innerHTML = '<p>Calculate your body fat to see personalized health insights here.</p>';
  if (window.updateBodyFatGauge) window.updateBodyFatGauge(null);
  localStorage.removeItem('bfInputs');
}

/* =====================================================
   LOCALSTORAGE PERSISTENCE
   ===================================================== */
function saveBmiInputs() {
  try {
    const unit = document.querySelector('input[name="bmi-unit"]:checked')?.value || 'metric';
    localStorage.setItem('bmiInputs', JSON.stringify({
      unit,
      heightCm:  document.getElementById('bmi-height-cm')?.value  || '',
      weightKg:  document.getElementById('bmi-weight-kg')?.value  || '',
      heightFt:  document.getElementById('bmi-height-ft')?.value  || '',
      heightIn:  document.getElementById('bmi-height-in')?.value  || '',
      weightLbs: document.getElementById('bmi-weight-lbs')?.value || '',
      age:       document.getElementById('bmi-age')?.value        || '',
    }));
  } catch (_) {}
}

function saveBfInputs() {
  try {
    const unit   = document.querySelector('input[name="bf-unit"]:checked')?.value   || 'metric';
    const gender = document.querySelector('input[name="bf-gender"]:checked')?.value || 'male';
    localStorage.setItem('bfInputs', JSON.stringify({
      unit, gender,
      heightCm: document.getElementById('bf-height-cm')?.value || '',
      waistCm:  document.getElementById('bf-waist-cm')?.value  || '',
      neckCm:   document.getElementById('bf-neck-cm')?.value   || '',
      hipCm:    document.getElementById('bf-hip-cm')?.value    || '',
      heightIn: document.getElementById('bf-height-in')?.value || '',
      waistIn:  document.getElementById('bf-waist-in')?.value  || '',
      neckIn:   document.getElementById('bf-neck-in')?.value   || '',
      hipIn:    document.getElementById('bf-hip-in')?.value    || '',
    }));
  } catch (_) {}
}

function restoreBmiInputs() {
  try {
    const d = JSON.parse(localStorage.getItem('bmiInputs') || 'null');
    if (!d) return;
    if (d.unit === 'imperial') {
      const r = document.getElementById('bmi-imperial');
      if (r) { r.checked = true; toggleBmiUnits(true); }
    }
    const set = (id, v) => { const el = document.getElementById(id); if (el && v) el.value = v; };
    set('bmi-height-cm', d.heightCm); set('bmi-weight-kg', d.weightKg);
    set('bmi-height-ft', d.heightFt); set('bmi-height-in', d.heightIn);
    set('bmi-weight-lbs', d.weightLbs); set('bmi-age', d.age);
  } catch (_) {}
}

function restoreBfInputs() {
  try {
    const d = JSON.parse(localStorage.getItem('bfInputs') || 'null');
    if (!d) return;
    if (d.unit === 'imperial') {
      const r = document.getElementById('bf-imperial');
      if (r) { r.checked = true; toggleBfUnits(true); }
    }
    if (d.gender === 'female') {
      const r = document.getElementById('bf-female');
      if (r) { r.checked = true; toggleHipFields(true); updateBodyFatRanges('female'); }
    }
    const set = (id, v) => { const el = document.getElementById(id); if (el && v) el.value = v; };
    set('bf-height-cm', d.heightCm); set('bf-waist-cm', d.waistCm);
    set('bf-neck-cm', d.neckCm);    set('bf-hip-cm', d.hipCm);
    set('bf-height-in', d.heightIn); set('bf-waist-in', d.waistIn);
    set('bf-neck-in', d.neckIn);    set('bf-hip-in', d.hipIn);
  } catch (_) {}
}

/* =====================================================
   INPUT AUTO-SAVE
   ===================================================== */
function initAutoSave() {
  $$('#bmi-form input').forEach(el => el.addEventListener('input', saveBmiInputs));
  $$('#bodyfat-form input').forEach(el => el.addEventListener('input', saveBfInputs));
}

/* =====================================================
   NAVBAR MOBILE TOGGLE
   ===================================================== */
function initNavbar() {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* =====================================================
   PRINT BUTTON
   ===================================================== */
function initPrint() {
  document.getElementById('print-results-btn')?.addEventListener('click', () => window.print());
}

/* =====================================================
   FOOTER YEAR
   ===================================================== */
function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* =====================================================
   HELP BUTTON TOOLTIPS
   ===================================================== */
function initTooltips() {
  $$('.help-btn[data-tooltip]').forEach(btn => {
    let tip = null;
    const showTip = () => {
      if (tip) return;
      tip = document.createElement('div');
      tip.textContent = btn.dataset.tooltip;
      Object.assign(tip.style, {
        position: 'fixed', zIndex: '9999',
        background: '#2D3748', color: '#fff',
        padding: '6px 10px', borderRadius: '6px',
        fontSize: '12px', maxWidth: '220px',
        lineHeight: '1.5', pointerEvents: 'none',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      });
      document.body.appendChild(tip);
      const r = btn.getBoundingClientRect();
      tip.style.top  = `${r.bottom + 6}px`;
      tip.style.left = `${Math.max(4, r.left - 80)}px`;
    };
    const hideTip = () => { if (tip) { tip.remove(); tip = null; } };
    btn.addEventListener('mouseenter', showTip);
    btn.addEventListener('mouseleave', hideTip);
    btn.addEventListener('focus',      showTip);
    btn.addEventListener('blur',       hideTip);
  });
}

/* =====================================================
   INIT
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  initNavbar();
  initTabs();
  initBmiUnitToggle();
  initBfUnitToggle();
  initGenderToggle();
  initBmiForm();
  initBfForm();
  initAutoSave();
  initPrint();
  initTooltips();
  restoreBmiInputs();
  restoreBfInputs();
});
