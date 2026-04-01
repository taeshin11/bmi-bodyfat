/**
 * BMI Dashboard — Gauge Chart Renderer
 * Draws half-circle arc gauges on HTML5 Canvas.
 * Lightweight, zero external dependencies.
 *
 * Public API (attached to window):
 *   window.updateBmiGauge(value)       — pass null to draw empty state
 *   window.updateBodyFatGauge(value)   — pass null to draw empty state
 *   window.setGaugeGender(gender)      — 'male' | 'female'
 */

'use strict';

/* =====================================================
   GAUGE SEGMENT DEFINITIONS
   ===================================================== */
const BMI_GAUGE_CFG = {
  min: 10,
  max: 45,
  segments: [
    { upTo: 18.5, color: '#1890FF' },
    { upTo: 25,   color: '#52C41A' },
    { upTo: 30,   color: '#FAAD14' },
    { upTo: 45,   color: '#FF4D4F' },
  ],
  needleColor: '#2D3748',
};

const BF_SEGMENTS_MALE = [
  { upTo: 6,  color: '#FF4D4F' },
  { upTo: 14, color: '#52C41A' },
  { upTo: 18, color: '#52C41A' },
  { upTo: 25, color: '#FAAD14' },
  { upTo: 50, color: '#FF4D4F' },
];

const BF_SEGMENTS_FEMALE = [
  { upTo: 14, color: '#FF4D4F' },
  { upTo: 21, color: '#52C41A' },
  { upTo: 25, color: '#52C41A' },
  { upTo: 32, color: '#FAAD14' },
  { upTo: 50, color: '#FF4D4F' },
];

const BF_GAUGE_BASE_CFG = {
  min: 2,
  max: 50,
  needleColor: '#2D3748',
};

/* =====================================================
   CORE DRAW FUNCTION
   ===================================================== */

/**
 * Render a half-circle gauge onto a canvas element.
 * @param {HTMLCanvasElement} canvas
 * @param {object}  cfg    - { min, max, segments, needleColor }
 * @param {number|null} value
 */
function drawGauge(canvas, cfg, value) {
  if (!canvas || !canvas.getContext) return;

  const dpr = window.devicePixelRatio || 1;

  // Use CSS dimensions for layout; multiply by dpr for sharpness
  const W = canvas.parentElement
    ? Math.min(canvas.parentElement.clientWidth, 200)
    : 200;
  const H = Math.round(W * 0.6);

  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H - Math.round(H * 0.13);  // pivot slightly up from bottom

  const outerR   = Math.min(cx - 4, cy) * 0.96;
  const innerR   = outerR * 0.60;

  const START = Math.PI;       // 180° — left
  const END   = 2 * Math.PI;   // 360° — right
  const SPAN  = Math.PI;       // half circle

  const { min, max, segments } = cfg;

  // ── Background track ──
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, START, END);
  ctx.arc(cx, cy, innerR, END, START, true);
  ctx.closePath();
  ctx.fillStyle = '#E2E8F0';
  ctx.fill();

  // ── Colored segments ──
  let prevAngle = START;
  segments.forEach(seg => {
    const clampedEnd = Math.min(seg.upTo, max);
    const frac  = clamp01((clampedEnd - min) / (max - min));
    const angle = START + frac * SPAN;

    ctx.beginPath();
    ctx.arc(cx, cy, outerR, prevAngle, angle);
    ctx.arc(cx, cy, innerR, angle, prevAngle, true);
    ctx.closePath();
    ctx.fillStyle    = seg.color;
    ctx.globalAlpha  = value === null ? 0.3 : 0.9;
    ctx.fill();
    ctx.globalAlpha  = 1;

    // White divider line
    ctx.beginPath();
    ctx.moveTo(cx + innerR * Math.cos(angle), cy + innerR * Math.sin(angle));
    ctx.lineTo(cx + outerR * Math.cos(angle), cy + outerR * Math.sin(angle));
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth   = 2;
    ctx.stroke();

    prevAngle = angle;
  });

  // ── Subtle inner shadow ring ──
  const grad = ctx.createRadialGradient(cx, cy, innerR - 1, cx, cy, innerR + 6);
  grad.addColorStop(0, 'rgba(0,0,0,0.08)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.beginPath();
  ctx.arc(cx, cy, innerR + 6, START, END);
  ctx.arc(cx, cy, innerR - 1, END, START, true);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // ── Needle ──
  if (value !== null) {
    const clamped     = Math.max(min, Math.min(max, value));
    const frac        = (clamped - min) / (max - min);
    const needleAngle = START + frac * SPAN;

    const nLen  = outerR + 2;
    const nBase = 5;
    const pivot = innerR - 6;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(needleAngle);

    // Shadow
    ctx.shadowColor = 'rgba(0,0,0,0.20)';
    ctx.shadowBlur  = 6;
    ctx.shadowOffsetY = 2;

    // Tapered triangle needle
    ctx.beginPath();
    ctx.moveTo(nLen, 0);
    ctx.lineTo(-pivot, -nBase / 2);
    ctx.lineTo(-pivot,  nBase / 2);
    ctx.closePath();
    ctx.fillStyle = cfg.needleColor;
    ctx.fill();

    ctx.restore();

    // Pivot dot
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fillStyle = cfg.needleColor;
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur  = 4;
    ctx.fill();
    ctx.shadowBlur  = 0;
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }

  // ── Min / Max labels ──
  ctx.font      = `600 ${Math.round(W * 0.057)}px Inter, sans-serif`;
  ctx.fillStyle = '#A0AEC0';

  ctx.textAlign    = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(String(min), cx - outerR + 2, cy + 6);

  ctx.textAlign = 'right';
  ctx.fillText(String(max) + '+', cx + outerR - 2, cy + 6);
}

/* =====================================================
   UTILITY
   ===================================================== */
function clamp01(v) { return Math.max(0, Math.min(1, v)); }

/* =====================================================
   STATE
   ===================================================== */
let _bmiCanvas     = null;
let _bfCanvas      = null;
let _currentGender = 'male';
let _currentBmi    = null;
let _currentBf     = null;

/* =====================================================
   PUBLIC API
   ===================================================== */

window.updateBmiGauge = function(value) {
  _currentBmi = value;
  if (!_bmiCanvas) _bmiCanvas = document.getElementById('bmi-gauge');
  drawGauge(_bmiCanvas, BMI_GAUGE_CFG, value);
};

window.updateBodyFatGauge = function(value) {
  _currentBf = value;
  if (!_bfCanvas) _bfCanvas = document.getElementById('bodyfat-gauge');
  const segs = _currentGender === 'female' ? BF_SEGMENTS_FEMALE : BF_SEGMENTS_MALE;
  drawGauge(_bfCanvas, { ...BF_GAUGE_BASE_CFG, segments: segs }, value);
};

window.setGaugeGender = function(gender) {
  _currentGender = gender;
  // Re-render BF gauge with updated segments
  if (!_bfCanvas) _bfCanvas = document.getElementById('bodyfat-gauge');
  const segs = gender === 'female' ? BF_SEGMENTS_FEMALE : BF_SEGMENTS_MALE;
  drawGauge(_bfCanvas, { ...BF_GAUGE_BASE_CFG, segments: segs }, _currentBf);
};

/* =====================================================
   INIT
   ===================================================== */
function initGauges() {
  _bmiCanvas = document.getElementById('bmi-gauge');
  _bfCanvas  = document.getElementById('bodyfat-gauge');

  // Draw empty state
  if (_bmiCanvas) drawGauge(_bmiCanvas, BMI_GAUGE_CFG, null);
  if (_bfCanvas)  drawGauge(_bfCanvas,  { ...BF_GAUGE_BASE_CFG, segments: BF_SEGMENTS_MALE }, null);

  // Re-draw on resize
  let resizeId;
  window.addEventListener('resize', () => {
    clearTimeout(resizeId);
    resizeId = setTimeout(() => {
      if (_bmiCanvas) drawGauge(_bmiCanvas, BMI_GAUGE_CFG, _currentBmi);
      if (_bfCanvas) {
        const segs = _currentGender === 'female' ? BF_SEGMENTS_FEMALE : BF_SEGMENTS_MALE;
        drawGauge(_bfCanvas, { ...BF_GAUGE_BASE_CFG, segments: segs }, _currentBf);
      }
    }, 150);
  });
}

document.addEventListener('DOMContentLoaded', initGauges);
