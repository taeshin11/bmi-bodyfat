/**
 * Auto i18n — BMI Dashboard
 * Detects browser language on load and translates key UI text.
 * Supports: en, ko, ja, zh, es, fr, de, pt
 */
(function () {
  'use strict';

  const translations = {
    en: {
      navHome: 'Home',
      navAbout: 'About',
      navHowTo: 'How to Use',
      navPrivacy: 'Privacy',
      navTerms: 'Terms',
      navContact: 'Contact',
      heroBadge: 'Free Health Tool',
      heroTitle: 'Free BMI & Body Fat Calculator',
      heroSubtitle: 'Get instant, accurate results using the clinically-validated US Navy method. Understand your health metrics with beautiful visual gauges and personalized insights.',
      calcHeading: 'Health Calculator',
      calcSubtitle: 'Enter your measurements to get instant results',
      tabBmi: 'BMI Calculator',
      tabBodyfat: 'Body Fat Calculator',
      feedbackBtn: '💬 Feedback',
      feedbackTitle: 'Send Feedback',
      feedbackSubject: 'Feedback - BMI Dashboard',
    },
    ko: {
      navHome: '홈',
      navAbout: '소개',
      navHowTo: '사용 방법',
      navPrivacy: '개인정보',
      navTerms: '이용약관',
      navContact: '문의',
      heroBadge: '무료 건강 도구',
      heroTitle: '무료 BMI & 체지방 계산기',
      heroSubtitle: '임상적으로 검증된 미 해군 방식을 사용하여 즉각적이고 정확한 결과를 얻으세요.',
      calcHeading: '건강 계산기',
      calcSubtitle: '측정값을 입력하면 즉시 결과를 확인할 수 있습니다',
      tabBmi: 'BMI 계산기',
      tabBodyfat: '체지방 계산기',
      feedbackBtn: '💬 피드백',
      feedbackTitle: '피드백 보내기',
      feedbackSubject: '피드백 - BMI 대시보드',
    },
    ja: {
      navHome: 'ホーム',
      navAbout: '概要',
      navHowTo: '使い方',
      navPrivacy: 'プライバシー',
      navTerms: '利用規約',
      navContact: 'お問い合わせ',
      heroBadge: '無料健康ツール',
      heroTitle: '無料 BMI・体脂肪計算機',
      heroSubtitle: '臨床的に検証された米海軍方式で、即座に正確な結果を取得してください。',
      calcHeading: '健康計算機',
      calcSubtitle: '測定値を入力して即座に結果を確認',
      tabBmi: 'BMI計算機',
      tabBodyfat: '体脂肪計算機',
      feedbackBtn: '💬 フィードバック',
      feedbackTitle: 'フィードバックを送る',
      feedbackSubject: 'フィードバック - BMIダッシュボード',
    },
    zh: {
      navHome: '首页',
      navAbout: '关于',
      navHowTo: '使用方法',
      navPrivacy: '隐私',
      navTerms: '条款',
      navContact: '联系我们',
      heroBadge: '免费健康工具',
      heroTitle: '免费 BMI 和体脂计算器',
      heroSubtitle: '使用经临床验证的美国海军方法，立即获得准确结果。',
      calcHeading: '健康计算器',
      calcSubtitle: '输入您的测量值，立即获得结果',
      tabBmi: 'BMI计算器',
      tabBodyfat: '体脂计算器',
      feedbackBtn: '💬 反馈',
      feedbackTitle: '发送反馈',
      feedbackSubject: '反馈 - BMI仪表板',
    },
    es: {
      navHome: 'Inicio',
      navAbout: 'Acerca de',
      navHowTo: 'Cómo usar',
      navPrivacy: 'Privacidad',
      navTerms: 'Términos',
      navContact: 'Contacto',
      heroBadge: 'Herramienta gratuita de salud',
      heroTitle: 'Calculadora gratuita de IMC y grasa corporal',
      heroSubtitle: 'Obtén resultados precisos al instante usando el método naval de EE. UU., validado clínicamente.',
      calcHeading: 'Calculadora de Salud',
      calcSubtitle: 'Ingresa tus medidas para obtener resultados al instante',
      tabBmi: 'Calculadora de IMC',
      tabBodyfat: 'Calculadora de Grasa Corporal',
      feedbackBtn: '💬 Comentarios',
      feedbackTitle: 'Enviar comentarios',
      feedbackSubject: 'Comentarios - BMI Dashboard',
    },
    fr: {
      navHome: 'Accueil',
      navAbout: 'À propos',
      navHowTo: 'Comment utiliser',
      navPrivacy: 'Confidentialité',
      navTerms: 'Conditions',
      navContact: 'Contact',
      heroBadge: 'Outil de santé gratuit',
      heroTitle: 'Calculateur gratuit d\'IMC et de graisse corporelle',
      heroSubtitle: 'Obtenez des résultats instantanés et précis grâce à la méthode cliniquement validée de la Marine américaine.',
      calcHeading: 'Calculateur de Santé',
      calcSubtitle: 'Entrez vos mesures pour obtenir des résultats immédiats',
      tabBmi: 'Calculateur d\'IMC',
      tabBodyfat: 'Calculateur de Graisse',
      feedbackBtn: '💬 Retour d\'info',
      feedbackTitle: 'Envoyer un retour',
      feedbackSubject: 'Retour - BMI Dashboard',
    },
    de: {
      navHome: 'Startseite',
      navAbout: 'Über uns',
      navHowTo: 'Verwendung',
      navPrivacy: 'Datenschutz',
      navTerms: 'Nutzungsbedingungen',
      navContact: 'Kontakt',
      heroBadge: 'Kostenloses Gesundheitstool',
      heroTitle: 'Kostenloser BMI- und Körperfettrechner',
      heroSubtitle: 'Erhalten Sie sofortige, genaue Ergebnisse mit der klinisch validierten US-Marine-Methode.',
      calcHeading: 'Gesundheitsrechner',
      calcSubtitle: 'Geben Sie Ihre Maße ein, um sofortige Ergebnisse zu erhalten',
      tabBmi: 'BMI-Rechner',
      tabBodyfat: 'Körperfettrechner',
      feedbackBtn: '💬 Feedback',
      feedbackTitle: 'Feedback senden',
      feedbackSubject: 'Feedback - BMI Dashboard',
    },
    pt: {
      navHome: 'Início',
      navAbout: 'Sobre',
      navHowTo: 'Como usar',
      navPrivacy: 'Privacidade',
      navTerms: 'Termos',
      navContact: 'Contato',
      heroBadge: 'Ferramenta de saúde gratuita',
      heroTitle: 'Calculadora gratuita de IMC e gordura corporal',
      heroSubtitle: 'Obtenha resultados precisos instantâneos usando o método da Marinha dos EUA, validado clinicamente.',
      calcHeading: 'Calculadora de Saúde',
      calcSubtitle: 'Insira suas medidas para obter resultados imediatos',
      tabBmi: 'Calculadora de IMC',
      tabBodyfat: 'Calculadora de Gordura Corporal',
      feedbackBtn: '💬 Feedback',
      feedbackTitle: 'Enviar feedback',
      feedbackSubject: 'Feedback - BMI Dashboard',
    },
  };

  function getLang() {
    const raw = navigator.language || navigator.userLanguage || 'en';
    const code = raw.toLowerCase().split('-')[0];
    return translations[code] ? code : 'en';
  }

  function applyTranslations(lang) {
    if (lang === 'en') return; // Default already in HTML
    const t = translations[lang];
    if (!t) return;

    // Helper: set text if element exists
    function setText(selector, text) {
      const el = document.querySelector(selector);
      if (el) el.textContent = text;
    }
    function setAll(selector, text) {
      document.querySelectorAll(selector).forEach(function(el) { el.textContent = text; });
    }

    // Nav links (works for both navbar styles)
    const navLinks = document.querySelectorAll('.navbar__link, .nav-links a');
    navLinks.forEach(function(a) {
      const href = (a.getAttribute('href') || '').replace(/^\//, '').replace(/\.html$/, '');
      if (href === '' || href === 'index') setText.call(null, null, null), a.textContent = t.navHome;
      else if (href === 'about') a.textContent = t.navAbout;
      else if (href === 'howto') a.textContent = t.navHowTo;
      else if (href === 'privacy') a.textContent = t.navPrivacy;
      else if (href === 'terms') a.textContent = t.navTerms;
      else if (href === 'contact') a.textContent = t.navContact;
    });

    // Hero section
    setText('.hero__badge', t.heroBadge);
    setText('.hero__title', t.heroTitle);
    setText('.hero__subtitle', t.heroSubtitle);

    // Calculator section
    setText('#calculator-heading', t.calcHeading);
    setText('.section-subtitle', t.calcSubtitle);

    // Tabs
    const tabBmi = document.getElementById('tab-bmi');
    if (tabBmi) tabBmi.childNodes[tabBmi.childNodes.length - 1].textContent = ' ' + t.tabBmi;
    const tabBf = document.getElementById('tab-bodyfat');
    if (tabBf) tabBf.childNodes[tabBf.childNodes.length - 1].textContent = ' ' + t.tabBodyfat;

    // Feedback widget
    const fbBtn = document.getElementById('bmi-feedback-btn');
    if (fbBtn) fbBtn.textContent = t.feedbackBtn;
    const fbMailto = document.getElementById('bmi-feedback-mailto');
    if (fbMailto) {
      const subj = encodeURIComponent(t.feedbackSubject);
      fbMailto.href = 'mailto:taeshinkim11@gmail.com?subject=' + subj;
    }

    // Update html lang attribute
    document.documentElement.lang = lang;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const lang = getLang();
    applyTranslations(lang);
  });
})();
