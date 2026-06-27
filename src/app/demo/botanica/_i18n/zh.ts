// 繁體中文語系內容（多語系內容分檔管理：zh.ts / en.ts）
const zh = {
  nav: { home: '首頁', story: '品牌故事', products: '產品系列', blog: '日誌', contact: '聯絡' },
  common: {
    explore: '探索系列',
    talk: '與我們聊聊',
    readMore: '閱讀更多',
    viewAll: '看全部',
    backToList: '返回日誌',
    next: '下一篇',
    prev: '上一頁',
    nextPage: '下一頁',
    page: '頁',
    send: '送出訊息',
    minRead: '分鐘閱讀',
  },
  home: {
    heroEyebrow: 'Lifestyle of Green',
    heroTitle: ['讓植物', '成為生活的呼吸'],
    heroLead:
      '植感生活 Botanica，從一株植物開始，把自然的節奏帶回日常。我們相信，照顧植物，也是在照顧自己。',
    statTitle: '與自然同步的生活',
    stats: [
      { n: '2018', l: '品牌創立' },
      { n: '40+', l: '嚴選品項' },
      { n: '12k', l: '植感生活者' },
      { n: '100%', l: '友善包材' },
    ],
    storyEyebrow: 'Our story',
    storyTitle: '我們相信，慢一點，更靠近生活',
    storyLead:
      '從都市陽台的一盆綠開始，植感生活想做的，是讓每個忙碌的人，都能擁有一處能深呼吸的角落。',
    productEyebrow: 'Collections',
    productTitle: '當季精選',
    productLead: '依四季節奏挑選的植物與生活器物，陪你把日子過得更有溫度。',
    journalEyebrow: 'Journal',
    journalTitle: '植感日誌',
    journalLead: '關於植物照顧、空間佈置與慢生活的筆記。',
  },
  story: {
    eyebrow: 'Brand story',
    title: '從一盆綠，到一種生活',
    lead: '植感生活並非要你成為園藝專家，而是邀請你，在照顧植物的過程裡，重新感受時間與自己。',
    sections: [
      {
        h: '起點',
        p: '2018 年，創辦人在租屋處的小陽台養活了第一盆龜背芋。看著葉子緩緩展開，她第一次意識到，原來照顧一個生命，能讓自己也安定下來。',
      },
      {
        h: '理念',
        p: '我們不追逐稀有品種的炫耀，而是相信「好照顧、能長久」才是植物與人的長期關係。所選的每一個品項，都通過實際的居家測試。',
      },
      {
        h: '永續',
        p: '從可重複使用的陶盆到 100% 可回收的包材，我們盡量讓每一次購買，都對環境溫柔一點。',
      },
    ],
    valuesTitle: '三個堅持',
    values: [
      { h: '好照顧', p: '優先挑選耐養、適合新手的品項。' },
      { h: '在地選物', p: '與本地陶藝與小農合作。' },
      { h: '友善環境', p: '減塑包裝，鼓勵循環使用。' },
    ],
  },
  products: {
    eyebrow: 'Collections',
    title: '產品系列',
    lead: '依生活場景與季節分類，從植栽到器物，找到屬於你的那一份綠意。',
  },
  blog: {
    eyebrow: 'Journal',
    title: '植感日誌',
    lead: '植物照顧、空間靈感與慢生活的書寫。',
  },
  contact: {
    eyebrow: 'Contact',
    title: '留下訊息，與我們聊聊',
    lead: '無論是合作邀約、批發詢問，或單純想聊聊植物，都歡迎寫信給我們。',
    form: {
      name: '稱呼',
      email: '電子信箱',
      topic: '主題',
      topics: ['一般詢問', '批發合作', '空間佈置', '媒體邀約'],
      message: '訊息內容',
      placeholderMsg: '想說的話⋯⋯',
      send: '送出訊息',
      successTitle: '訊息已送出',
      successBody: '謝謝你的來信，我們會盡快回覆。',
      again: '再寫一則',
      note: '＊此為展示用表單，送出後僅於前端顯示成功訊息',
    },
    infoTitle: '其他聯絡方式',
  },
  footer: {
    tagline: '讓植物，成為生活的呼吸。',
    sitemap: '網站導覽',
    contact: '聯絡資訊',
    newsletter: '訂閱電子報',
    newsletterNote: '每月一封，分享植物照顧與生活靈感。',
    subscribe: '訂閱',
    rights: '本頁為品牌官網 + CMS 展示範例',
  },
};

export default zh;
export type Dict = typeof zh;
