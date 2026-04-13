/**
 * Auto i18n — BMI Dashboard
 * Detects browser language on load and translates all UI text via data-i18n attributes.
 * Supports: en, ko, ja, zh, es, fr, de, pt
 */
(function () {
  'use strict';

  const supportedLangs = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

  const translations = {
    en: {
      // Nav
      navHome: 'Home',
      navAbout: 'About',
      navHowTo: 'How to Use',
      navPrivacy: 'Privacy',
      navTerms: 'Terms',
      navContact: 'Contact',
      // Hero
      heroBadge: 'Free Health Tool',
      heroTitle: 'Free BMI & Body Fat Calculator',
      heroSubtitle: 'Get instant, accurate results using the clinically-validated US Navy method. Understand your health metrics with beautiful visual gauges and personalized insights.',
      heroStat1: '2 Calculators',
      heroStat2: '100% Free',
      heroStat3: 'US Navy Method',
      // Calculator section
      calcHeading: 'Health Calculator',
      calcSubtitle: 'Enter your measurements to get instant results',
      tabBmi: 'BMI Calculator',
      tabBodyfat: 'Body Fat Calculator',
      // BMI form
      unitSystemLabel: 'Unit System',
      unitMetric: 'Metric',
      unitImperial: 'Imperial',
      heightLabel: 'Height',
      weightLabel: 'Weight',
      ageLabel: 'Age',
      ageOptional: '(optional)',
      calcBmiBtn: 'Calculate BMI',
      resetBtn: 'Reset',
      // Body Fat form
      genderLabel: 'Gender',
      genderMale: 'Male',
      genderFemale: 'Female',
      waistLabel: 'Waist Circumference',
      neckLabel: 'Neck Circumference',
      hipLabel: 'Hip Circumference',
      calcBfBtn: 'Calculate Body Fat',
      // Results section
      resultsHeading: 'Your Results',
      resultsSubtitle: 'Visual breakdown of your health metrics',
      bmiCardTitle: 'Body Mass Index',
      bfCardTitle: 'Body Fat Percentage',
      bmiCategoryRangesTitle: 'BMI Categories',
      bmiUnderweight: 'Underweight: < 18.5',
      bmiNormal: 'Normal: 18.5 – 24.9',
      bmiOverweight: 'Overweight: 25 – 29.9',
      bmiObese: 'Obese: ≥ 30',
      bfCategoriesMen: 'Body Fat Categories (Men)',
      bfEssential: 'Essential Fat: 2–5%',
      bfAthlete: 'Athlete: 6–13%',
      bfFitness: 'Fitness: 14–17%',
      bfAverage: 'Average: 18–24%',
      bfObese: 'Obese: ≥ 25%',
      bmiDefaultCategory: 'Enter your measurements',
      bmiDefaultInsight: 'Calculate your BMI to see personalized health insights here.',
      bfDefaultCategory: 'Enter your measurements',
      bfDefaultInsight: 'Calculate your body fat to see personalized health insights here.',
      disclaimerLabel: 'Medical Disclaimer:',
      disclaimerText: 'These results are for informational purposes only and are not a substitute for professional medical advice. Always consult a qualified healthcare provider before making health decisions.',
      // Educational
      eduBmiTitle: 'What is BMI?',
      eduBfTitle: 'What is Body Fat Percentage?',
      eduCompareTitle: 'BMI vs Body Fat Percentage',
      eduNavyTitle: 'The US Navy Method Explained',
      eduLimitsTitle: 'Limitations of BMI',
      // FAQ section
      faqHeading: 'Frequently Asked Questions',
      faqSubtitle: 'Everything you need to know about BMI and body fat',
      faq1q: 'What is a healthy BMI for adults?',
      faq2q: 'How accurate is the US Navy body fat method?',
      faq3q: 'What is a healthy body fat percentage?',
      faq4q: 'Can I be healthy with a high BMI?',
      faq5q: 'How do I measure my waist, neck, and hip correctly?',
      faq6q: 'Does BMI apply to children?',
      faq7q: 'How often should I check my BMI and body fat?',
      faq8q: 'What is the difference between visceral and subcutaneous fat?',
      faq9q: 'Is this calculator suitable for pregnant women?',
      // Footer
      footerTagline: 'Free, accurate health calculators powered by the US Navy method.',
      footerBuiltBy: 'Built by',
      footerQuickLinks: 'Quick Links',
      footerBmiCalc: 'BMI Calculator',
      footerBfCalc: 'Body Fat Calculator',
      footerFaq: 'FAQ',
      footerHowTo: 'How to Use',
      footerAbout: 'About Us',
      footerLegal: 'Legal',
      footerPrivacy: 'Privacy Policy',
      footerTerms: 'Terms of Service',
      footerContact: 'Contact',
      footerShare: 'Share This Tool',
      footerPrint: 'Print Results',
      footerCopyright: '© {year} BMI Dashboard by SPINAI. All rights reserved.',
      footerDisclaimer: 'For informational use only. Not medical advice.',
      // Feedback
      feedbackFabLabel: 'Feedback',
      feedbackModalTitle: 'Share Your Feedback',
      feedbackTypeLabel: 'Type of Feedback',
      feedbackTypeDefault: '— Select a type —',
      feedbackTypeBug: 'Bug Report',
      feedbackTypeSuggestion: 'Feature Suggestion',
      feedbackTypeAccuracy: 'Accuracy Concern',
      feedbackTypeUi: 'User Interface',
      feedbackTypeGeneral: 'General Comment',
      feedbackMessageLabel: 'Your Message',
      feedbackMessagePlaceholder: 'Tell us what you think...',
      feedbackSendBtn: 'Send Feedback',
      feedbackCancelBtn: 'Cancel',
      feedbackBtn: '💬 Feedback',
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
      heroSubtitle: '임상적으로 검증된 미 해군 방식을 사용하여 즉각적이고 정확한 결과를 얻으세요. 시각적 게이지와 맞춤형 인사이트로 건강 지표를 이해하세요.',
      heroStat1: '2가지 계산기',
      heroStat2: '100% 무료',
      heroStat3: '미 해군 방식',
      calcHeading: '건강 계산기',
      calcSubtitle: '측정값을 입력하면 즉시 결과를 확인할 수 있습니다',
      tabBmi: 'BMI 계산기',
      tabBodyfat: '체지방 계산기',
      unitSystemLabel: '단위 시스템',
      unitMetric: '미터법',
      unitImperial: '야드파운드법',
      heightLabel: '키',
      weightLabel: '체중',
      ageLabel: '나이',
      ageOptional: '(선택)',
      calcBmiBtn: 'BMI 계산하기',
      resetBtn: '초기화',
      genderLabel: '성별',
      genderMale: '남성',
      genderFemale: '여성',
      waistLabel: '허리 둘레',
      neckLabel: '목 둘레',
      hipLabel: '엉덩이 둘레',
      calcBfBtn: '체지방 계산하기',
      resultsHeading: '결과',
      resultsSubtitle: '건강 지표의 시각적 분석',
      bmiCardTitle: '체질량지수',
      bfCardTitle: '체지방률',
      bmiCategoryRangesTitle: 'BMI 분류',
      bmiUnderweight: '저체중: < 18.5',
      bmiNormal: '정상: 18.5 – 24.9',
      bmiOverweight: '과체중: 25 – 29.9',
      bmiObese: '비만: ≥ 30',
      bfCategoriesMen: '체지방 분류 (남성)',
      bfEssential: '필수 지방: 2–5%',
      bfAthlete: '운동선수: 6–13%',
      bfFitness: '피트니스: 14–17%',
      bfAverage: '평균: 18–24%',
      bfObese: '비만: ≥ 25%',
      bmiDefaultCategory: '측정값을 입력해주세요',
      bmiDefaultInsight: 'BMI를 계산하면 맞춤형 건강 인사이트가 여기에 표시됩니다.',
      bfDefaultCategory: '측정값을 입력해주세요',
      bfDefaultInsight: '체지방을 계산하면 맞춤형 건강 인사이트가 여기에 표시됩니다.',
      disclaimerLabel: '의료 면책 고지:',
      disclaimerText: '이 결과는 정보 제공 목적으로만 사용되며 전문적인 의료 조언을 대체하지 않습니다. 건강 결정을 내리기 전에 항상 의료 전문가와 상담하세요.',
      eduBmiTitle: 'BMI란 무엇인가요?',
      eduBfTitle: '체지방률이란 무엇인가요?',
      eduCompareTitle: 'BMI vs 체지방률',
      eduNavyTitle: '미 해군 측정법 설명',
      eduLimitsTitle: 'BMI의 한계',
      faqHeading: '자주 묻는 질문',
      faqSubtitle: 'BMI와 체지방에 대해 알아야 할 모든 것',
      faq1q: '성인의 건강한 BMI 범위는?',
      faq2q: '미 해군 체지방 방법은 얼마나 정확한가요?',
      faq3q: '건강한 체지방률은 얼마인가요?',
      faq4q: '높은 BMI에도 건강할 수 있나요?',
      faq5q: '허리, 목, 엉덩이를 올바르게 측정하는 방법은?',
      faq6q: 'BMI가 어린이에게도 적용되나요?',
      faq7q: 'BMI와 체지방을 얼마나 자주 확인해야 하나요?',
      faq8q: '내장지방과 피하지방의 차이는 무엇인가요?',
      faq9q: '임산부에게 이 계산기가 적합한가요?',
      footerTagline: '미 해군 방식으로 구동되는 무료 정확한 건강 계산기.',
      footerBuiltBy: '제작',
      footerQuickLinks: '빠른 링크',
      footerBmiCalc: 'BMI 계산기',
      footerBfCalc: '체지방 계산기',
      footerFaq: '자주 묻는 질문',
      footerHowTo: '사용 방법',
      footerAbout: '소개',
      footerLegal: '법적 정보',
      footerPrivacy: '개인정보처리방침',
      footerTerms: '이용약관',
      footerContact: '문의',
      footerShare: '이 도구 공유하기',
      footerPrint: '결과 인쇄',
      footerCopyright: '© {year} BMI Dashboard by SPINAI. All rights reserved.',
      footerDisclaimer: '정보 제공 목적으로만 사용됩니다. 의료 조언이 아닙니다.',
      feedbackFabLabel: '피드백',
      feedbackModalTitle: '피드백 공유하기',
      feedbackTypeLabel: '피드백 유형',
      feedbackTypeDefault: '— 유형 선택 —',
      feedbackTypeBug: '버그 신고',
      feedbackTypeSuggestion: '기능 제안',
      feedbackTypeAccuracy: '정확도 문제',
      feedbackTypeUi: '사용자 인터페이스',
      feedbackTypeGeneral: '일반 의견',
      feedbackMessageLabel: '메시지',
      feedbackMessagePlaceholder: '의견을 알려주세요...',
      feedbackSendBtn: '피드백 보내기',
      feedbackCancelBtn: '취소',
      feedbackBtn: '💬 피드백',
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
      heroSubtitle: '臨床的に検証された米海軍方式で、即座に正確な結果を取得してください。美しいビジュアルゲージとパーソナライズされたインサイトで健康指標を理解しましょう。',
      heroStat1: '2つの計算機',
      heroStat2: '100% 無料',
      heroStat3: '米海軍方式',
      calcHeading: '健康計算機',
      calcSubtitle: '測定値を入力して即座に結果を確認',
      tabBmi: 'BMI計算機',
      tabBodyfat: '体脂肪計算機',
      unitSystemLabel: '単位系',
      unitMetric: 'メートル法',
      unitImperial: 'ヤード・ポンド法',
      heightLabel: '身長',
      weightLabel: '体重',
      ageLabel: '年齢',
      ageOptional: '(任意)',
      calcBmiBtn: 'BMIを計算する',
      resetBtn: 'リセット',
      genderLabel: '性別',
      genderMale: '男性',
      genderFemale: '女性',
      waistLabel: 'ウエスト周囲',
      neckLabel: '首周囲',
      hipLabel: '腰周囲',
      calcBfBtn: '体脂肪を計算する',
      resultsHeading: '結果',
      resultsSubtitle: '健康指標のビジュアル分析',
      bmiCardTitle: '体格指数',
      bfCardTitle: '体脂肪率',
      bmiCategoryRangesTitle: 'BMIカテゴリー',
      bmiUnderweight: '低体重: < 18.5',
      bmiNormal: '標準: 18.5 – 24.9',
      bmiOverweight: '過体重: 25 – 29.9',
      bmiObese: '肥満: ≥ 30',
      bfCategoriesMen: '体脂肪カテゴリー (男性)',
      bfEssential: '必須脂肪: 2–5%',
      bfAthlete: 'アスリート: 6–13%',
      bfFitness: 'フィットネス: 14–17%',
      bfAverage: '平均: 18–24%',
      bfObese: '肥満: ≥ 25%',
      bmiDefaultCategory: '測定値を入力してください',
      bmiDefaultInsight: 'BMIを計算すると、パーソナライズされた健康インサイトがここに表示されます。',
      bfDefaultCategory: '測定値を入力してください',
      bfDefaultInsight: '体脂肪を計算すると、パーソナライズされた健康インサイトがここに表示されます。',
      disclaimerLabel: '医療免責事項:',
      disclaimerText: 'この結果は情報提供のみを目的としており、専門的な医療アドバイスの代わりにはなりません。健康上の決定を行う前に、必ず医療専門家にご相談ください。',
      eduBmiTitle: 'BMIとは何ですか？',
      eduBfTitle: '体脂肪率とは何ですか？',
      eduCompareTitle: 'BMI vs 体脂肪率',
      eduNavyTitle: '米海軍方式の説明',
      eduLimitsTitle: 'BMIの限界',
      faqHeading: 'よくある質問',
      faqSubtitle: 'BMIと体脂肪について知っておくべきすべて',
      faq1q: '成人の健康的なBMI範囲は？',
      faq2q: '米海軍体脂肪方式はどれくらい正確ですか？',
      faq3q: '健康的な体脂肪率は？',
      faq4q: '高いBMIでも健康でいられますか？',
      faq5q: 'ウエスト、首、腰を正しく測定する方法は？',
      faq6q: 'BMIは子どもにも適用されますか？',
      faq7q: 'BMIと体脂肪をどのくらいの頻度で確認すべきですか？',
      faq8q: '内臓脂肪と皮下脂肪の違いは何ですか？',
      faq9q: 'この計算機は妊婦に適していますか？',
      footerTagline: '米海軍方式による無料の正確な健康計算機。',
      footerBuiltBy: '制作',
      footerQuickLinks: 'クイックリンク',
      footerBmiCalc: 'BMI計算機',
      footerBfCalc: '体脂肪計算機',
      footerFaq: 'よくある質問',
      footerHowTo: '使い方',
      footerAbout: '概要',
      footerLegal: '法的情報',
      footerPrivacy: 'プライバシーポリシー',
      footerTerms: '利用規約',
      footerContact: 'お問い合わせ',
      footerShare: 'このツールをシェア',
      footerPrint: '結果を印刷',
      footerCopyright: '© {year} BMI Dashboard by SPINAI. All rights reserved.',
      footerDisclaimer: '情報提供のみを目的としています。医療アドバイスではありません。',
      feedbackFabLabel: 'フィードバック',
      feedbackModalTitle: 'フィードバックを共有',
      feedbackTypeLabel: 'フィードバックの種類',
      feedbackTypeDefault: '— 種類を選択 —',
      feedbackTypeBug: 'バグ報告',
      feedbackTypeSuggestion: '機能提案',
      feedbackTypeAccuracy: '精度の問題',
      feedbackTypeUi: 'ユーザーインターフェース',
      feedbackTypeGeneral: '一般的なコメント',
      feedbackMessageLabel: 'メッセージ',
      feedbackMessagePlaceholder: 'ご意見をお聞かせください...',
      feedbackSendBtn: 'フィードバックを送る',
      feedbackCancelBtn: 'キャンセル',
      feedbackBtn: '💬 フィードバック',
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
      heroSubtitle: '使用经临床验证的美国海军方法，立即获得准确结果。通过精美的视觉仪表盘和个性化洞察了解您的健康指标。',
      heroStat1: '2种计算器',
      heroStat2: '100% 免费',
      heroStat3: '美国海军方法',
      calcHeading: '健康计算器',
      calcSubtitle: '输入您的测量值，立即获得结果',
      tabBmi: 'BMI计算器',
      tabBodyfat: '体脂计算器',
      unitSystemLabel: '单位制',
      unitMetric: '公制',
      unitImperial: '英制',
      heightLabel: '身高',
      weightLabel: '体重',
      ageLabel: '年龄',
      ageOptional: '(可选)',
      calcBmiBtn: '计算BMI',
      resetBtn: '重置',
      genderLabel: '性别',
      genderMale: '男',
      genderFemale: '女',
      waistLabel: '腰围',
      neckLabel: '颈围',
      hipLabel: '臀围',
      calcBfBtn: '计算体脂',
      resultsHeading: '您的结果',
      resultsSubtitle: '健康指标的可视化分析',
      bmiCardTitle: '体质量指数',
      bfCardTitle: '体脂率',
      bmiCategoryRangesTitle: 'BMI分类',
      bmiUnderweight: '体重过轻: < 18.5',
      bmiNormal: '正常: 18.5 – 24.9',
      bmiOverweight: '超重: 25 – 29.9',
      bmiObese: '肥胖: ≥ 30',
      bfCategoriesMen: '体脂分类 (男性)',
      bfEssential: '必要脂肪: 2–5%',
      bfAthlete: '运动员: 6–13%',
      bfFitness: '健身: 14–17%',
      bfAverage: '平均: 18–24%',
      bfObese: '肥胖: ≥ 25%',
      bmiDefaultCategory: '请输入您的测量值',
      bmiDefaultInsight: '计算BMI后，个性化健康见解将显示在这里。',
      bfDefaultCategory: '请输入您的测量值',
      bfDefaultInsight: '计算体脂后，个性化健康见解将显示在这里。',
      disclaimerLabel: '医疗免责声明:',
      disclaimerText: '这些结果仅供参考，不能替代专业医疗建议。在做出健康决定之前，请务必咨询合格的医疗保健提供者。',
      eduBmiTitle: '什么是BMI？',
      eduBfTitle: '什么是体脂率？',
      eduCompareTitle: 'BMI vs 体脂率',
      eduNavyTitle: '美国海军方法说明',
      eduLimitsTitle: 'BMI的局限性',
      faqHeading: '常见问题',
      faqSubtitle: '您需要了解的关于BMI和体脂的一切',
      faq1q: '成人健康的BMI范围是多少？',
      faq2q: '美国海军体脂方法有多准确？',
      faq3q: '健康的体脂率是多少？',
      faq4q: 'BMI高也能保持健康吗？',
      faq5q: '如何正确测量腰围、颈围和臀围？',
      faq6q: 'BMI适用于儿童吗？',
      faq7q: '应该多久检查一次BMI和体脂？',
      faq8q: '内脏脂肪和皮下脂肪有什么区别？',
      faq9q: '这个计算器适合孕妇使用吗？',
      footerTagline: '由美国海军方法驱动的免费准确健康计算器。',
      footerBuiltBy: '由...构建',
      footerQuickLinks: '快速链接',
      footerBmiCalc: 'BMI计算器',
      footerBfCalc: '体脂计算器',
      footerFaq: '常见问题',
      footerHowTo: '使用方法',
      footerAbout: '关于我们',
      footerLegal: '法律信息',
      footerPrivacy: '隐私政策',
      footerTerms: '服务条款',
      footerContact: '联系我们',
      footerShare: '分享此工具',
      footerPrint: '打印结果',
      footerCopyright: '© {year} BMI Dashboard by SPINAI. 保留所有权利。',
      footerDisclaimer: '仅供参考。非医疗建议。',
      feedbackFabLabel: '反馈',
      feedbackModalTitle: '分享您的反馈',
      feedbackTypeLabel: '反馈类型',
      feedbackTypeDefault: '— 选择类型 —',
      feedbackTypeBug: '错误报告',
      feedbackTypeSuggestion: '功能建议',
      feedbackTypeAccuracy: '准确性问题',
      feedbackTypeUi: '用户界面',
      feedbackTypeGeneral: '一般评论',
      feedbackMessageLabel: '您的消息',
      feedbackMessagePlaceholder: '告诉我们您的想法...',
      feedbackSendBtn: '发送反馈',
      feedbackCancelBtn: '取消',
      feedbackBtn: '💬 反馈',
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
      heroSubtitle: 'Obtén resultados precisos al instante usando el método naval de EE. UU., validado clínicamente. Comprende tus métricas de salud con hermosos medidores visuales.',
      heroStat1: '2 Calculadoras',
      heroStat2: '100% Gratis',
      heroStat3: 'Método Naval EE.UU.',
      calcHeading: 'Calculadora de Salud',
      calcSubtitle: 'Ingresa tus medidas para obtener resultados al instante',
      tabBmi: 'Calculadora de IMC',
      tabBodyfat: 'Calculadora de Grasa Corporal',
      unitSystemLabel: 'Sistema de unidades',
      unitMetric: 'Métrico',
      unitImperial: 'Imperial',
      heightLabel: 'Altura',
      weightLabel: 'Peso',
      ageLabel: 'Edad',
      ageOptional: '(opcional)',
      calcBmiBtn: 'Calcular IMC',
      resetBtn: 'Reiniciar',
      genderLabel: 'Género',
      genderMale: 'Masculino',
      genderFemale: 'Femenino',
      waistLabel: 'Circunferencia de cintura',
      neckLabel: 'Circunferencia de cuello',
      hipLabel: 'Circunferencia de cadera',
      calcBfBtn: 'Calcular Grasa Corporal',
      resultsHeading: 'Tus Resultados',
      resultsSubtitle: 'Desglose visual de tus métricas de salud',
      bmiCardTitle: 'Índice de Masa Corporal',
      bfCardTitle: 'Porcentaje de Grasa Corporal',
      bmiCategoryRangesTitle: 'Categorías de IMC',
      bmiUnderweight: 'Bajo peso: < 18.5',
      bmiNormal: 'Normal: 18.5 – 24.9',
      bmiOverweight: 'Sobrepeso: 25 – 29.9',
      bmiObese: 'Obeso: ≥ 30',
      bfCategoriesMen: 'Categorías de Grasa Corporal (Hombres)',
      bfEssential: 'Grasa esencial: 2–5%',
      bfAthlete: 'Atleta: 6–13%',
      bfFitness: 'En forma: 14–17%',
      bfAverage: 'Promedio: 18–24%',
      bfObese: 'Obeso: ≥ 25%',
      bmiDefaultCategory: 'Ingresa tus medidas',
      bmiDefaultInsight: 'Calcula tu IMC para ver información de salud personalizada aquí.',
      bfDefaultCategory: 'Ingresa tus medidas',
      bfDefaultInsight: 'Calcula tu grasa corporal para ver información de salud personalizada aquí.',
      disclaimerLabel: 'Aviso médico:',
      disclaimerText: 'Estos resultados son solo para fines informativos y no sustituyen el consejo médico profesional. Consulta siempre a un proveedor de salud calificado antes de tomar decisiones de salud.',
      eduBmiTitle: '¿Qué es el IMC?',
      eduBfTitle: '¿Qué es el porcentaje de grasa corporal?',
      eduCompareTitle: 'IMC vs Porcentaje de Grasa Corporal',
      eduNavyTitle: 'El Método Naval de EE.UU. Explicado',
      eduLimitsTitle: 'Limitaciones del IMC',
      faqHeading: 'Preguntas Frecuentes',
      faqSubtitle: 'Todo lo que necesitas saber sobre el IMC y la grasa corporal',
      faq1q: '¿Cuál es un IMC saludable para adultos?',
      faq2q: '¿Qué tan preciso es el método naval de EE.UU.?',
      faq3q: '¿Cuál es un porcentaje saludable de grasa corporal?',
      faq4q: '¿Puedo estar sano con un IMC alto?',
      faq5q: '¿Cómo mido correctamente cintura, cuello y cadera?',
      faq6q: '¿Se aplica el IMC a los niños?',
      faq7q: '¿Con qué frecuencia debo revisar mi IMC y grasa corporal?',
      faq8q: '¿Cuál es la diferencia entre grasa visceral y subcutánea?',
      faq9q: '¿Es esta calculadora adecuada para mujeres embarazadas?',
      footerTagline: 'Calculadoras de salud gratuitas y precisas basadas en el método naval de EE.UU.',
      footerBuiltBy: 'Creado por',
      footerQuickLinks: 'Enlaces rápidos',
      footerBmiCalc: 'Calculadora de IMC',
      footerBfCalc: 'Calculadora de Grasa Corporal',
      footerFaq: 'Preguntas Frecuentes',
      footerHowTo: 'Cómo usar',
      footerAbout: 'Sobre nosotros',
      footerLegal: 'Legal',
      footerPrivacy: 'Política de privacidad',
      footerTerms: 'Términos de servicio',
      footerContact: 'Contacto',
      footerShare: 'Comparte esta herramienta',
      footerPrint: 'Imprimir resultados',
      footerCopyright: '© {year} BMI Dashboard by SPINAI. Todos los derechos reservados.',
      footerDisclaimer: 'Solo para uso informativo. No es asesoramiento médico.',
      feedbackFabLabel: 'Comentarios',
      feedbackModalTitle: 'Comparte tus comentarios',
      feedbackTypeLabel: 'Tipo de comentario',
      feedbackTypeDefault: '— Selecciona un tipo —',
      feedbackTypeBug: 'Informe de error',
      feedbackTypeSuggestion: 'Sugerencia de función',
      feedbackTypeAccuracy: 'Problema de precisión',
      feedbackTypeUi: 'Interfaz de usuario',
      feedbackTypeGeneral: 'Comentario general',
      feedbackMessageLabel: 'Tu mensaje',
      feedbackMessagePlaceholder: 'Cuéntanos qué piensas...',
      feedbackSendBtn: 'Enviar comentarios',
      feedbackCancelBtn: 'Cancelar',
      feedbackBtn: '💬 Comentarios',
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
      heroSubtitle: 'Obtenez des résultats instantanés et précis grâce à la méthode cliniquement validée de la Marine américaine. Comprenez vos indicateurs de santé avec de beaux jauges visuels.',
      heroStat1: '2 Calculateurs',
      heroStat2: '100% Gratuit',
      heroStat3: 'Méthode Marine US',
      calcHeading: 'Calculateur de Santé',
      calcSubtitle: 'Entrez vos mesures pour obtenir des résultats immédiats',
      tabBmi: 'Calculateur d\'IMC',
      tabBodyfat: 'Calculateur de Graisse',
      unitSystemLabel: 'Système d\'unités',
      unitMetric: 'Métrique',
      unitImperial: 'Impérial',
      heightLabel: 'Taille',
      weightLabel: 'Poids',
      ageLabel: 'Âge',
      ageOptional: '(facultatif)',
      calcBmiBtn: 'Calculer l\'IMC',
      resetBtn: 'Réinitialiser',
      genderLabel: 'Genre',
      genderMale: 'Homme',
      genderFemale: 'Femme',
      waistLabel: 'Tour de taille',
      neckLabel: 'Tour de cou',
      hipLabel: 'Tour de hanches',
      calcBfBtn: 'Calculer la Graisse Corporelle',
      resultsHeading: 'Vos Résultats',
      resultsSubtitle: 'Analyse visuelle de vos indicateurs de santé',
      bmiCardTitle: 'Indice de Masse Corporelle',
      bfCardTitle: 'Pourcentage de Graisse Corporelle',
      bmiCategoryRangesTitle: 'Catégories d\'IMC',
      bmiUnderweight: 'Insuffisance pondérale: < 18.5',
      bmiNormal: 'Normal: 18.5 – 24.9',
      bmiOverweight: 'Surpoids: 25 – 29.9',
      bmiObese: 'Obèse: ≥ 30',
      bfCategoriesMen: 'Catégories de Graisse (Hommes)',
      bfEssential: 'Graisse essentielle: 2–5%',
      bfAthlete: 'Athlète: 6–13%',
      bfFitness: 'Forme: 14–17%',
      bfAverage: 'Moyen: 18–24%',
      bfObese: 'Obèse: ≥ 25%',
      bmiDefaultCategory: 'Entrez vos mesures',
      bmiDefaultInsight: 'Calculez votre IMC pour voir des informations de santé personnalisées ici.',
      bfDefaultCategory: 'Entrez vos mesures',
      bfDefaultInsight: 'Calculez votre graisse corporelle pour voir des informations de santé personnalisées ici.',
      disclaimerLabel: 'Avertissement médical:',
      disclaimerText: 'Ces résultats sont fournis à titre informatif uniquement et ne remplacent pas un avis médical professionnel. Consultez toujours un professionnel de santé qualifié avant de prendre des décisions de santé.',
      eduBmiTitle: 'Qu\'est-ce que l\'IMC ?',
      eduBfTitle: 'Qu\'est-ce que le pourcentage de graisse corporelle ?',
      eduCompareTitle: 'IMC vs Pourcentage de Graisse Corporelle',
      eduNavyTitle: 'La méthode de la Marine américaine expliquée',
      eduLimitsTitle: 'Limites de l\'IMC',
      faqHeading: 'Questions Fréquentes',
      faqSubtitle: 'Tout ce que vous devez savoir sur l\'IMC et la graisse corporelle',
      faq1q: 'Quel est un IMC sain pour les adultes ?',
      faq2q: 'Quelle est la précision de la méthode navale américaine ?',
      faq3q: 'Quel est un pourcentage de graisse sain ?',
      faq4q: 'Peut-on être en bonne santé avec un IMC élevé ?',
      faq5q: 'Comment mesurer correctement la taille, le cou et les hanches ?',
      faq6q: 'L\'IMC s\'applique-t-il aux enfants ?',
      faq7q: 'À quelle fréquence vérifier l\'IMC et la graisse corporelle ?',
      faq8q: 'Quelle est la différence entre la graisse viscérale et sous-cutanée ?',
      faq9q: 'Ce calculateur est-il adapté aux femmes enceintes ?',
      footerTagline: 'Calculateurs de santé gratuits et précis basés sur la méthode de la Marine américaine.',
      footerBuiltBy: 'Créé par',
      footerQuickLinks: 'Liens rapides',
      footerBmiCalc: 'Calculateur d\'IMC',
      footerBfCalc: 'Calculateur de Graisse',
      footerFaq: 'FAQ',
      footerHowTo: 'Comment utiliser',
      footerAbout: 'À propos de nous',
      footerLegal: 'Légal',
      footerPrivacy: 'Politique de confidentialité',
      footerTerms: 'Conditions d\'utilisation',
      footerContact: 'Contact',
      footerShare: 'Partager cet outil',
      footerPrint: 'Imprimer les résultats',
      footerCopyright: '© {year} BMI Dashboard by SPINAI. Tous droits réservés.',
      footerDisclaimer: 'À titre informatif uniquement. Pas un avis médical.',
      feedbackFabLabel: 'Retour',
      feedbackModalTitle: 'Partagez vos commentaires',
      feedbackTypeLabel: 'Type de commentaire',
      feedbackTypeDefault: '— Sélectionner un type —',
      feedbackTypeBug: 'Rapport de bug',
      feedbackTypeSuggestion: 'Suggestion de fonctionnalité',
      feedbackTypeAccuracy: 'Problème de précision',
      feedbackTypeUi: 'Interface utilisateur',
      feedbackTypeGeneral: 'Commentaire général',
      feedbackMessageLabel: 'Votre message',
      feedbackMessagePlaceholder: 'Dites-nous ce que vous pensez...',
      feedbackSendBtn: 'Envoyer les commentaires',
      feedbackCancelBtn: 'Annuler',
      feedbackBtn: '💬 Retour d\'info',
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
      heroSubtitle: 'Erhalten Sie sofortige, genaue Ergebnisse mit der klinisch validierten US-Marine-Methode. Verstehen Sie Ihre Gesundheitsmetriken mit visuellen Messgeräten.',
      heroStat1: '2 Rechner',
      heroStat2: '100% Kostenlos',
      heroStat3: 'US-Marine-Methode',
      calcHeading: 'Gesundheitsrechner',
      calcSubtitle: 'Geben Sie Ihre Maße ein, um sofortige Ergebnisse zu erhalten',
      tabBmi: 'BMI-Rechner',
      tabBodyfat: 'Körperfettrechner',
      unitSystemLabel: 'Einheitensystem',
      unitMetric: 'Metrisch',
      unitImperial: 'Imperial',
      heightLabel: 'Körpergröße',
      weightLabel: 'Gewicht',
      ageLabel: 'Alter',
      ageOptional: '(optional)',
      calcBmiBtn: 'BMI berechnen',
      resetBtn: 'Zurücksetzen',
      genderLabel: 'Geschlecht',
      genderMale: 'Männlich',
      genderFemale: 'Weiblich',
      waistLabel: 'Taillenumfang',
      neckLabel: 'Halsumfang',
      hipLabel: 'Hüftumfang',
      calcBfBtn: 'Körperfett berechnen',
      resultsHeading: 'Ihre Ergebnisse',
      resultsSubtitle: 'Visuelle Aufschlüsselung Ihrer Gesundheitsmetriken',
      bmiCardTitle: 'Body-Mass-Index',
      bfCardTitle: 'Körperfettanteil',
      bmiCategoryRangesTitle: 'BMI-Kategorien',
      bmiUnderweight: 'Untergewicht: < 18.5',
      bmiNormal: 'Normal: 18.5 – 24.9',
      bmiOverweight: 'Übergewicht: 25 – 29.9',
      bmiObese: 'Adipositas: ≥ 30',
      bfCategoriesMen: 'Körperfettkategorien (Männer)',
      bfEssential: 'Essentielles Fett: 2–5%',
      bfAthlete: 'Athlet: 6–13%',
      bfFitness: 'Fitness: 14–17%',
      bfAverage: 'Durchschnitt: 18–24%',
      bfObese: 'Adipositas: ≥ 25%',
      bmiDefaultCategory: 'Bitte Maße eingeben',
      bmiDefaultInsight: 'Berechnen Sie Ihren BMI, um hier personalisierte Gesundheitseinblicke zu sehen.',
      bfDefaultCategory: 'Bitte Maße eingeben',
      bfDefaultInsight: 'Berechnen Sie Ihr Körperfett, um hier personalisierte Gesundheitseinblicke zu sehen.',
      disclaimerLabel: 'Medizinischer Haftungsausschluss:',
      disclaimerText: 'Diese Ergebnisse dienen nur zu Informationszwecken und ersetzen keinen professionellen medizinischen Rat. Konsultieren Sie immer einen qualifizierten Gesundheitsdienstleister, bevor Sie Gesundheitsentscheidungen treffen.',
      eduBmiTitle: 'Was ist der BMI?',
      eduBfTitle: 'Was ist der Körperfettanteil?',
      eduCompareTitle: 'BMI vs Körperfettanteil',
      eduNavyTitle: 'Die US-Marine-Methode erklärt',
      eduLimitsTitle: 'Einschränkungen des BMI',
      faqHeading: 'Häufig gestellte Fragen',
      faqSubtitle: 'Alles, was Sie über BMI und Körperfett wissen müssen',
      faq1q: 'Was ist ein gesunder BMI für Erwachsene?',
      faq2q: 'Wie genau ist die US-Marine-Körperfettmethode?',
      faq3q: 'Was ist ein gesunder Körperfettanteil?',
      faq4q: 'Kann ich bei einem hohen BMI gesund sein?',
      faq5q: 'Wie messe ich Taille, Hals und Hüften korrekt?',
      faq6q: 'Gilt der BMI auch für Kinder?',
      faq7q: 'Wie oft sollte ich meinen BMI und Körperfett überprüfen?',
      faq8q: 'Was ist der Unterschied zwischen viszeralem und subkutanem Fett?',
      faq9q: 'Ist dieser Rechner für Schwangere geeignet?',
      footerTagline: 'Kostenlose, genaue Gesundheitsrechner basierend auf der US-Marine-Methode.',
      footerBuiltBy: 'Erstellt von',
      footerQuickLinks: 'Schnelllinks',
      footerBmiCalc: 'BMI-Rechner',
      footerBfCalc: 'Körperfettrechner',
      footerFaq: 'FAQ',
      footerHowTo: 'Verwendung',
      footerAbout: 'Über uns',
      footerLegal: 'Rechtliches',
      footerPrivacy: 'Datenschutzrichtlinie',
      footerTerms: 'Nutzungsbedingungen',
      footerContact: 'Kontakt',
      footerShare: 'Dieses Tool teilen',
      footerPrint: 'Ergebnisse drucken',
      footerCopyright: '© {year} BMI Dashboard by SPINAI. Alle Rechte vorbehalten.',
      footerDisclaimer: 'Nur zur Information. Kein medizinischer Rat.',
      feedbackFabLabel: 'Feedback',
      feedbackModalTitle: 'Ihr Feedback teilen',
      feedbackTypeLabel: 'Art des Feedbacks',
      feedbackTypeDefault: '— Typ auswählen —',
      feedbackTypeBug: 'Fehlerbericht',
      feedbackTypeSuggestion: 'Funktionsvorschlag',
      feedbackTypeAccuracy: 'Genauigkeitsproblem',
      feedbackTypeUi: 'Benutzeroberfläche',
      feedbackTypeGeneral: 'Allgemeiner Kommentar',
      feedbackMessageLabel: 'Ihre Nachricht',
      feedbackMessagePlaceholder: 'Sagen Sie uns, was Sie denken...',
      feedbackSendBtn: 'Feedback senden',
      feedbackCancelBtn: 'Abbrechen',
      feedbackBtn: '💬 Feedback',
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
      heroSubtitle: 'Obtenha resultados precisos instantâneos usando o método da Marinha dos EUA, validado clinicamente. Entenda suas métricas de saúde com belos medidores visuais.',
      heroStat1: '2 Calculadoras',
      heroStat2: '100% Grátis',
      heroStat3: 'Método Marinha EUA',
      calcHeading: 'Calculadora de Saúde',
      calcSubtitle: 'Insira suas medidas para obter resultados imediatos',
      tabBmi: 'Calculadora de IMC',
      tabBodyfat: 'Calculadora de Gordura Corporal',
      unitSystemLabel: 'Sistema de unidades',
      unitMetric: 'Métrico',
      unitImperial: 'Imperial',
      heightLabel: 'Altura',
      weightLabel: 'Peso',
      ageLabel: 'Idade',
      ageOptional: '(opcional)',
      calcBmiBtn: 'Calcular IMC',
      resetBtn: 'Redefinir',
      genderLabel: 'Gênero',
      genderMale: 'Masculino',
      genderFemale: 'Feminino',
      waistLabel: 'Circunferência da cintura',
      neckLabel: 'Circunferência do pescoço',
      hipLabel: 'Circunferência do quadril',
      calcBfBtn: 'Calcular Gordura Corporal',
      resultsHeading: 'Seus Resultados',
      resultsSubtitle: 'Análise visual das suas métricas de saúde',
      bmiCardTitle: 'Índice de Massa Corporal',
      bfCardTitle: 'Percentual de Gordura Corporal',
      bmiCategoryRangesTitle: 'Categorias de IMC',
      bmiUnderweight: 'Abaixo do peso: < 18.5',
      bmiNormal: 'Normal: 18.5 – 24.9',
      bmiOverweight: 'Sobrepeso: 25 – 29.9',
      bmiObese: 'Obeso: ≥ 30',
      bfCategoriesMen: 'Categorias de Gordura (Homens)',
      bfEssential: 'Gordura essencial: 2–5%',
      bfAthlete: 'Atleta: 6–13%',
      bfFitness: 'Fitness: 14–17%',
      bfAverage: 'Médio: 18–24%',
      bfObese: 'Obeso: ≥ 25%',
      bmiDefaultCategory: 'Insira suas medidas',
      bmiDefaultInsight: 'Calcule seu IMC para ver informações de saúde personalizadas aqui.',
      bfDefaultCategory: 'Insira suas medidas',
      bfDefaultInsight: 'Calcule sua gordura corporal para ver informações de saúde personalizadas aqui.',
      disclaimerLabel: 'Aviso médico:',
      disclaimerText: 'Estes resultados são apenas para fins informativos e não substituem o aconselhamento médico profissional. Consulte sempre um profissional de saúde qualificado antes de tomar decisões de saúde.',
      eduBmiTitle: 'O que é IMC?',
      eduBfTitle: 'O que é percentual de gordura corporal?',
      eduCompareTitle: 'IMC vs Percentual de Gordura Corporal',
      eduNavyTitle: 'O Método da Marinha dos EUA Explicado',
      eduLimitsTitle: 'Limitações do IMC',
      faqHeading: 'Perguntas Frequentes',
      faqSubtitle: 'Tudo o que você precisa saber sobre IMC e gordura corporal',
      faq1q: 'Qual é um IMC saudável para adultos?',
      faq2q: 'Quão preciso é o método naval americano?',
      faq3q: 'Qual é um percentual saudável de gordura corporal?',
      faq4q: 'Posso ser saudável com um IMC alto?',
      faq5q: 'Como medir corretamente cintura, pescoço e quadril?',
      faq6q: 'O IMC se aplica a crianças?',
      faq7q: 'Com que frequência devo verificar meu IMC e gordura corporal?',
      faq8q: 'Qual é a diferença entre gordura visceral e subcutânea?',
      faq9q: 'Esta calculadora é adequada para mulheres grávidas?',
      footerTagline: 'Calculadoras de saúde gratuitas e precisas baseadas no método da Marinha dos EUA.',
      footerBuiltBy: 'Criado por',
      footerQuickLinks: 'Links Rápidos',
      footerBmiCalc: 'Calculadora de IMC',
      footerBfCalc: 'Calculadora de Gordura',
      footerFaq: 'Perguntas Frequentes',
      footerHowTo: 'Como usar',
      footerAbout: 'Sobre nós',
      footerLegal: 'Legal',
      footerPrivacy: 'Política de Privacidade',
      footerTerms: 'Termos de Serviço',
      footerContact: 'Contato',
      footerShare: 'Compartilhar esta ferramenta',
      footerPrint: 'Imprimir resultados',
      footerCopyright: '© {year} BMI Dashboard by SPINAI. Todos os direitos reservados.',
      footerDisclaimer: 'Apenas para uso informativo. Não é aconselhamento médico.',
      feedbackFabLabel: 'Feedback',
      feedbackModalTitle: 'Compartilhe seu feedback',
      feedbackTypeLabel: 'Tipo de feedback',
      feedbackTypeDefault: '— Selecione um tipo —',
      feedbackTypeBug: 'Relatório de bug',
      feedbackTypeSuggestion: 'Sugestão de funcionalidade',
      feedbackTypeAccuracy: 'Problema de precisão',
      feedbackTypeUi: 'Interface do usuário',
      feedbackTypeGeneral: 'Comentário geral',
      feedbackMessageLabel: 'Sua mensagem',
      feedbackMessagePlaceholder: 'Conte-nos o que você pensa...',
      feedbackSendBtn: 'Enviar feedback',
      feedbackCancelBtn: 'Cancelar',
      feedbackBtn: '💬 Feedback',
      feedbackSubject: 'Feedback - BMI Dashboard',
    },
  };

  function getLang() {
    const raw = navigator.language || navigator.userLanguage || 'en';
    const code = raw.toLowerCase().split('-')[0];
    return translations[code] ? code : 'en';
  }

  function t(lang, key) {
    const d = translations[lang];
    if (d && d[key] !== undefined) return d[key];
    return translations['en'][key] || key;
  }

  function applyTranslations(lang) {
    if (lang === 'en') return; // Default already in HTML
    const tr = translations[lang];
    if (!tr) return;

    // Helper functions
    function setText(selector, key) {
      const el = document.querySelector(selector);
      if (el) el.textContent = t(lang, key);
    }
    function setAll(selector, key) {
      document.querySelectorAll(selector).forEach(function(el) { el.textContent = t(lang, key); });
    }
    function setHtml(selector, html) {
      const el = document.querySelector(selector);
      if (el) el.innerHTML = html;
    }

    // data-i18n attribute based
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      const key = el.getAttribute('data-i18n');
      const val = t(lang, key);
      if (val) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = t(lang, key);
      if (val) el.placeholder = val;
    });

    // Nav links
    document.querySelectorAll('.navbar__link, .nav-links a').forEach(function(a) {
      const href = (a.getAttribute('href') || '').replace(/^\//, '').replace(/\.html$/, '');
      if (href === '' || href === 'index') a.textContent = t(lang, 'navHome');
      else if (href === 'about') a.textContent = t(lang, 'navAbout');
      else if (href === 'howto') a.textContent = t(lang, 'navHowTo');
      else if (href === 'privacy') a.textContent = t(lang, 'navPrivacy');
      else if (href === 'terms') a.textContent = t(lang, 'navTerms');
      else if (href === 'contact') a.textContent = t(lang, 'navContact');
    });

    // Hero section
    setText('.hero__badge', 'heroBadge');
    setText('.hero__title', 'heroTitle');
    setText('.hero__subtitle', 'heroSubtitle');

    // Hero stats
    const heroStats = document.querySelectorAll('.hero__stat');
    if (heroStats[0]) heroStats[0].innerHTML = '<strong>2</strong> ' + t(lang, 'heroStat1').replace('2 ', '');
    if (heroStats[1]) heroStats[1].innerHTML = '<strong>100%</strong> ' + t(lang, 'heroStat2').replace('100% ', '');
    if (heroStats[2]) heroStats[2].innerHTML = '<strong>US Navy</strong> ' + t(lang, 'heroStat3').replace('US Navy ', '').replace('US-Marine-', '').replace('미 해군 ', '').replace('米海军', '').replace('美国海军', '').replace('Marinha EUA', '').replace('Método Naval EE.UU.', '').replace('Méthode Marine US', '').replace('Método Marinha EUA', '');

    // Calculator section
    setText('#calculator-heading', 'calcHeading');
    setText('.section-subtitle', 'calcSubtitle');

    // Tabs — preserve SVG, change text node
    const tabBmiEl = document.getElementById('tab-bmi');
    if (tabBmiEl) {
      const last = tabBmiEl.childNodes[tabBmiEl.childNodes.length - 1];
      if (last && last.nodeType === 3) last.textContent = '\n            ' + t(lang, 'tabBmi') + '\n          ';
    }
    const tabBfEl = document.getElementById('tab-bodyfat');
    if (tabBfEl) {
      const last = tabBfEl.childNodes[tabBfEl.childNodes.length - 1];
      if (last && last.nodeType === 3) last.textContent = '\n            ' + t(lang, 'tabBodyfat') + '\n          ';
    }

    // BMI form labels
    setText('label[for="bmi-metric"]', 'unitMetric');
    setText('label[for="bmi-imperial"]', 'unitImperial');
    setText('label[for="bf-metric"]', 'unitMetric');
    setText('label[for="bf-imperial"]', 'unitImperial');

    // BMI calculate/reset buttons
    const bmiCalcBtn = document.getElementById('bmi-calculate-btn');
    if (bmiCalcBtn) {
      const svg = bmiCalcBtn.querySelector('svg');
      bmiCalcBtn.textContent = t(lang, 'calcBmiBtn');
      if (svg) bmiCalcBtn.prepend(svg);
    }
    const bmiResetBtn = document.getElementById('bmi-reset-btn');
    if (bmiResetBtn) {
      const svg = bmiResetBtn.querySelector('svg');
      bmiResetBtn.textContent = t(lang, 'resetBtn');
      if (svg) bmiResetBtn.prepend(svg);
    }

    // Body fat calculate/reset buttons
    const bfCalcBtn = document.getElementById('bodyfat-calculate-btn');
    if (bfCalcBtn) {
      const svg = bfCalcBtn.querySelector('svg');
      bfCalcBtn.textContent = t(lang, 'calcBfBtn');
      if (svg) bfCalcBtn.prepend(svg);
    }
    const bfResetBtn = document.getElementById('bodyfat-reset-btn');
    if (bfResetBtn) {
      const svg = bfResetBtn.querySelector('svg');
      bfResetBtn.textContent = t(lang, 'resetBtn');
      if (svg) bfResetBtn.prepend(svg);
    }

    // Results section
    setText('#results-heading', 'resultsHeading');
    const resSubs = document.querySelector('#results .section-subtitle');
    if (resSubs) resSubs.textContent = t(lang, 'resultsSubtitle');

    // BMI result card
    setText('#bmi-result-card .result-card__title', 'bmiCardTitle');
    setText('#bmi-category-text', 'bmiDefaultCategory');
    const bmiInsightP = document.querySelector('#bmi-insight p');
    if (bmiInsightP) bmiInsightP.textContent = t(lang, 'bmiDefaultInsight');

    // Body fat result card
    setText('#bodyfat-result-card .result-card__title', 'bfCardTitle');
    setText('#bodyfat-category-text', 'bfDefaultCategory');
    const bfInsightP = document.querySelector('#bodyfat-insight p');
    if (bfInsightP) bfInsightP.textContent = t(lang, 'bfDefaultInsight');

    // BMI ranges
    setText('#bmi-result-card .result-card__ranges-title', 'bmiCategoryRangesTitle');

    // Body fat ranges title
    setText('#bodyfat-ranges .result-card__ranges-title', 'bfCategoriesMen');

    // Disclaimer
    const disclaimerEl = document.querySelector('.disclaimer p');
    if (disclaimerEl) {
      disclaimerEl.innerHTML = '<strong>' + t(lang, 'disclaimerLabel') + '</strong> ' + t(lang, 'disclaimerText');
    }

    // Educational headings
    setText('#edu-bmi-heading', 'eduBmiTitle');
    setText('#edu-bf-heading', 'eduBfTitle');
    setText('#edu-compare-heading', 'eduCompareTitle');
    setText('#edu-navy-heading', 'eduNavyTitle');
    setText('#edu-limits-heading', 'eduLimitsTitle');

    // FAQ
    setText('#faq-heading', 'faqHeading');
    const faqSub = document.querySelector('#faq .section-subtitle');
    if (faqSub) faqSub.textContent = t(lang, 'faqSubtitle');

    // FAQ questions
    const faqKeys = ['faq1q','faq2q','faq3q','faq4q','faq5q','faq6q','faq7q','faq8q','faq9q'];
    document.querySelectorAll('.faq-question span').forEach(function(el, i) {
      if (faqKeys[i]) el.textContent = t(lang, faqKeys[i]);
    });

    // Footer
    setText('.footer__tagline', 'footerTagline');
    setText('.footer__col--brand .footer__col-title', 'footerBuiltBy');

    // Footer columns
    const footerCols = document.querySelectorAll('.footer__col:not(.footer__col--brand) .footer__col-title');
    if (footerCols[0]) footerCols[0].textContent = t(lang, 'footerQuickLinks');
    if (footerCols[1]) footerCols[1].textContent = t(lang, 'footerLegal');
    if (footerCols[2]) footerCols[2].textContent = t(lang, 'footerShare');

    // Footer quick links
    document.querySelectorAll('.footer__link').forEach(function(a) {
      const href = (a.getAttribute('href') || '').replace(/^\//, '').replace(/\.html$/, '').replace('#', '');
      if (href === '' || href === 'index') a.textContent = t(lang, 'navHome');
      else if (href === 'calculator') a.textContent = t(lang, 'footerBmiCalc');
      else if (href === 'about') a.textContent = t(lang, 'footerAbout');
      else if (href === 'howto') a.textContent = t(lang, 'footerHowTo');
      else if (href === 'faq') a.textContent = t(lang, 'footerFaq');
      else if (href === 'privacy') a.textContent = t(lang, 'footerPrivacy');
      else if (href === 'terms') a.textContent = t(lang, 'footerTerms');
      else if (href === 'contact') a.textContent = t(lang, 'footerContact');
    });

    // Print button
    const printBtn = document.getElementById('print-results-btn');
    if (printBtn) {
      const svg = printBtn.querySelector('svg');
      printBtn.textContent = t(lang, 'footerPrint');
      if (svg) printBtn.prepend(svg);
    }

    // Footer copyright
    const copyrightEl = document.querySelector('.footer__copyright');
    if (copyrightEl) {
      const year = new Date().getFullYear();
      copyrightEl.innerHTML = t(lang, 'footerCopyright').replace('{year}', year);
    }
    setText('.footer__disclaimer-short', 'footerDisclaimer');

    // Feedback FAB
    const feedbackFabLabel = document.querySelector('.feedback-fab__label');
    if (feedbackFabLabel) feedbackFabLabel.textContent = t(lang, 'feedbackFabLabel');

    // Feedback modal
    setText('#feedback-modal-title', 'feedbackModalTitle');
    setText('label[for="feedback-type"]', 'feedbackTypeLabel');
    setText('label[for="feedback-message"]', 'feedbackMessageLabel');

    // Feedback form submit/cancel buttons
    const feedbackSubmit = document.querySelector('#feedback-form .btn--primary');
    if (feedbackSubmit) feedbackSubmit.textContent = t(lang, 'feedbackSendBtn');
    const feedbackCancel = document.getElementById('feedback-cancel-btn');
    if (feedbackCancel) feedbackCancel.textContent = t(lang, 'feedbackCancelBtn');

    // Feedback select options
    const feedbackSelect = document.getElementById('feedback-type');
    if (feedbackSelect) {
      const opts = feedbackSelect.options;
      const optKeys = ['feedbackTypeDefault','feedbackTypeBug','feedbackTypeSuggestion','feedbackTypeAccuracy','feedbackTypeUi','feedbackTypeGeneral'];
      for (let i = 0; i < opts.length && i < optKeys.length; i++) {
        opts[i].textContent = t(lang, optKeys[i]);
      }
    }

    // Feedback textarea placeholder
    const feedbackTextarea = document.getElementById('feedback-message');
    if (feedbackTextarea) feedbackTextarea.placeholder = t(lang, 'feedbackMessagePlaceholder');

    // Feedback mailto
    const fbMailto = document.getElementById('bmi-feedback-mailto');
    if (fbMailto) {
      const subj = encodeURIComponent(t(lang, 'feedbackSubject'));
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
