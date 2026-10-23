/* ===== 蒙阴农品 · 品牌数字馆 交互 ===== */

// 1) 导航：滚动后加玻璃质感
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// 2) 滚动入场动画 + 柱状图增长
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      if (e.target.classList.contains('chart-card')) {
        e.target.querySelectorAll('.bar-fill').forEach(b => {
          b.style.width = getComputedStyle(b).getPropertyValue('--w');
        });
      }
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .chart-card').forEach(el => io.observe(el));

// 3) 直播场景轮播（自动按顺序调换）
(function () {
  const slides = document.querySelectorAll('#liveCarousel .live-slide');
  const dots = document.querySelectorAll('#liveCarousel .live-dots .dot');
  if (!slides.length) return;
  let i = 0;
  function go(n) {
    slides[i].classList.remove('active');
    dots[i].classList.remove('active');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('active');
    dots[i].classList.add('active');
  }
  let timer = setInterval(() => go(i + 1), 3500);
  dots.forEach((d, idx) => d.addEventListener('click', () => { clearInterval(timer); go(idx); timer = setInterval(() => go(i + 1), 3500); }));
})();

// 4) S5 品牌文创：触屏点击也能播放胶片滑动
document.querySelectorAll('.culture-card').forEach(card => {
  card.addEventListener('click', () => {
    if (window.matchMedia('(hover:none)').matches) card.classList.toggle('play');
  });
});

// 5) 产品详情弹窗数据
const PRODUCTS = {
  peach: {
    title: '蒙阴蜜桃', sub: '中国桃乡 · 国家地理标志双认证',
    main: 'assets/peach.png', gallery: ['assets/peach.png', 'assets/peach-detail-1.png', 'assets/peach-detail-2.png'],
    sections: [
      ['历史渊源', '蒙阴县桃树栽培历史悠久，康熙十一年（1672）《蒙阴县志》即有民众栽植桃树的记录。1980年，寒露蜜、朝晖等品种桃引入蒙阴，开启蒙阴桃产业发展之路。'],
      ['规模与产值（2023年）', '截至2023年，全县果园总面积105万亩，其中桃种植面积71万亩；全县桃产量22.4亿斤，生产产值68亿元，全产业链综合产值108.12亿元。桃种植面积和产量分别占山东省的33.8%和23.14%，面积和产量均居全国县区第一。'],
      ['品牌荣誉', '蒙阴县被授予“中国蜜桃之都”“中国桃乡”荣誉称号；“蒙阴蜜桃”通过农业部农产品地理标志认证，成为全省首个地理标志保护果品，入选第一批“好品山东”品牌名单、2023年全国“土特产”推介名录。'],
      ['品种与上市', '2023年，蒙阴县有毛桃、油桃、蟠桃三大类200余个品种，主栽品种77个，其中种植过万亩的品种15个。从5月到10月均有鲜食桃持续供应，是全国鲜食黄桃面积最大、品种最多、上市时间最长的优势产区之一。']
    ],
    resource: {
      title: '资源环境 · 蒙阴蜜桃的专业视角',
      items: [
        ['立地条件', '沂蒙丘陵坡地，砂质壤土疏松透气、排水良好，是蜜桃的优生区。'],
        ['绿色生产', '测土配方施肥 + 有机肥替代 + 果园生草栽培，减肥增效、养地增产。'],
        ['生态价值', '桃花与果园生草涵养蜜源，蜂群授粉、生物多样性丰富，生态与经济双赢。']
      ]
    },
    note: '说明：详情采用 2023 年口径，与首页头条（2025 年口径）数据年份不同。'
  },
  chestnut: {
    title: '蒙阴板栗', sub: '国家地理标志产品 · 泰山系板栗',
    main: 'assets/chestnut.png', gallery: ['assets/chestnut.png', 'assets/chestnut-detail-1.png', 'assets/chestnut-detail-2.png'],
    sections: [
      ['历史渊源', '蒙阴板栗栽培历史悠长，作为地方特色经济树种，蒙山板栗栽培已超千年；2011年“蒙山板栗”获国家地理标志认证。板栗耐旱抗瘠、适应山地丘陵与河滩，是当地农户增收的重要经济树种。'],
      ['规模与产值', '蒙阴板栗是全县第三大主栽果树树种、国家地理标志产品。全县栽培面积8万亩，年产量5万吨，主要分布在高都镇、野店镇、垛庄镇等乡镇。（注：蒙山板栗跨蒙阴、费县、平邑三县，总栽培面积约15万亩。）'],
      ['产地特征', '“甜于南，糯于燕”——作为全国板栗三大系列中“泰山系”的主要成员，蒙阴板栗粒大、皮薄、口感好、色泽光亮，具有独特的诱人口感，是受外商青睐的优质果品。'],
      ['核心优势', '垛庄镇板栗批发市场在销售旺季日交易量达1800吨，是山东省最大的板栗交易集散中心；当地建成4家规模精深加工企业，推行“企业+合作社+农户”模式，实现收购、加工、冷链、销售一体经营，小板栗做成大产业。']
    ],
    resource: {
      title: '资源环境 · 蒙阴板栗的专业视角',
      items: [
        ['立地条件', '山地棕壤，土层深厚、肥力中等，适宜板栗扎根与丰产。'],
        ['绿色生产', '以有机肥为主，病虫害物理防控，减少化学投入。'],
        ['生态价值', '栗林固土保水、涵养水源，是山区的生态屏障与经济林。']
      ]
    },
    note: '※ 本页数据据蒙阴县政府官网及公开报道整理，待最终核对。'
  },
  honey: {
    title: '蒙山蜂蜜', sub: '国家地理标志农产品 · 林蜂产业',
    main: 'assets/honey.png', gallery: ['assets/honey.png', 'assets/honey-detail-1.png', 'assets/honey-detail-2.png'],
    sections: [
      ['历史渊源', '蒙阴县地处北纬35°黄金蜜源带，森林覆盖率达62.2%，被520余座山峰环抱，孕育丰富的野生蜜源植物。“蒙山蜂蜜”为国家地理标志农产品，并荣登中国区域农业品牌影响力排行榜前十强。'],
      ['规模与产值', '蒙阴县蜜蜂种群数量、产业产值、交易量、电商销售量、品牌价值均居全省第一。全县蜂农1500余户，蜜蜂存养量6.5万群，年产各类蜂产品1750余吨；蜂业年产值突破13亿元（2025年）。（注：部分报道写作“突破10亿元”，系不同年份口径。）'],
      ['产地特征', '沂蒙山区拥有一千万亩蜜粉源植物，槐花、荆条、柿子花等山花蜜源丰富；当地创新“中蜂沟峪型保种模式”，建立10个沟峪型中蜂保种示范区，是沂蒙山国家级中华蜜蜂保护区。'],
      ['核心优势', '依托山东省首家蜂农学院与5G智慧养蜂技术，形成“养殖+加工+文旅”全链条；注册“蒙源”“沂蒙花香”等商标40余个，推出蜂蜜、蜂王浆、蜂花粉、蜂胶4个系列60余种产品，蜂业年产值居全省第一。']
    ],
    resource: {
      title: '资源环境 · 蒙山蜂蜜的专业视角',
      items: [
        ['立地条件', '沂蒙山林蜜源，森林覆盖率高，山花植物丰富。'],
        ['绿色生产', '划定蜂蜜保护区，零农药蜜源，守护纯净蜂产品。'],
        ['生态价值', '养蜂促进植物授粉，维系森林生态系统平衡。']
      ]
    },
    note: '※ 本页数据据蒙阴县政府官网及公开报道整理，待最终核对。'
  },
  apple: {
    title: '蒙阴苹果', sub: '国家地理标志农产品 · 第二大栽培树种',
    main: 'assets/apple.png', gallery: ['assets/apple.png', 'assets/apple-detail-1.png', 'assets/apple-detail-2.png'],
    sections: [
      ['历史渊源', '蒙阴苹果为山东蒙阴县特产、国家地理标志农产品，是蒙阴县第二大栽培树种。蒙阴县是山东省平均海拔最高的县区，号称“山东屋脊”，自古适宜林果发展。'],
      ['规模与产值', '蒙阴苹果栽培面积18万亩，年产量3.5亿斤（蒙阴县政府官网）。品牌价值据2012年评估达6.18亿元。野店镇作为主产区，苹果面积约6万亩、年产值约8亿元。（注：另有2024年报道称全县约6万亩，统计口径不同。）'],
      ['产地特征', '地处温带季风区，海拔高、昼夜温差大、沙石山土壤含微量元素丰富；所产苹果储藏期长、无污染无公害、色泽鲜艳光亮红润、水分多糖度高、脆甜香、质细汁多、个大形正。'],
      ['核心优势', '蒙阴已是全国最大的新红星出口基地、国家级出口水果质量安全示范区、山东省无公害果品生产基地；品种涵盖嘎啦、新红将军、新红星、金帅等，红富士屡获全国金奖，并经由冷链南下广深、北上新疆内蒙并出口海外。']
    ],
    resource: {
      title: '资源环境 · 蒙阴苹果的专业视角',
      items: [
        ['立地条件', '丘陵缓坡砂壤土，昼夜温差大、糖分积累充分。'],
        ['绿色生产', '果实套袋 + 绿色防控 + 水肥一体化，提质增效。'],
        ['生态价值', '果园生草保土蓄水，减少地表径流与面源污染。']
      ]
    },
    note: '※ 本页数据据蒙阴县政府官网及公开报道整理，待最终核对。'
  },
  herbs: {
    title: '蒙山中药材', sub: '国家级林下经济示范基地 · 道地药材',
    main: 'assets/herbs.png', gallery: ['assets/herbs.png', 'assets/herbs-detail-1.png', 'assets/herbs-detail-2.png'],
    sections: [
      ['历史渊源', '蒙阴县是国家级林下经济示范基地，植物资源丰富，全县现知药用植物达209种；近年聚焦蒙山连翘、黄精等道地药材，借助山东农业大学、山东中医药大学科研力量培育中医药产业。'],
      ['规模与产值', '坦埠镇已发展大青叶、丹参、黄芪、黄芩、黄精、桔梗等中药材十几种，种植总面积6000余亩，年产各类优质干鲜药材2000吨，是鲁南地区最大的中药材种植基地；其中黄精等中草药种植500余亩（戴家庄），海龙万村黄精基地近70亩，鸡头黄精四年一收、亩产8000—12000斤。'],
      ['产地特征', '蒙阴多山地丘陵、森林覆盖率高、空气土壤洁净，背阴耐旱的岭地为黄精等喜阴药材提供优良生长环境；荒山复垦种药，实现“一份林地，多份收入”。'],
      ['核心优势', '推行“合作社+基地+农户”模式，统一供种、技术指导与回收，注册“锦山厚土”等品牌，开发黄精茶、即食食品；实施“药林群落双生系统”，走“林下种植+科普观赏+药用食用+深加工”一二三产融合之路，带动村集体与农户双增收。']
    ],
    resource: {
      title: '资源环境 · 蒙山中药材的专业视角',
      items: [
        ['立地条件', '林下阴湿小气候，腐殖质厚，适宜喜阴药材。'],
        ['绿色生产', '林下仿野生栽培，不毁林、不施化肥农药。'],
        ['生态价值', '林药复合经营，提升森林碳汇与林地综合效益。']
      ]
    },
    note: '※ 本页数据据蒙阴县政府官网及公开报道整理，待最终核对。'
  }
};

// 6) 打开 / 关闭弹窗
const overlay = document.getElementById('modalOverlay');
const mTitle = document.getElementById('mTitle');
const mSub = document.getElementById('mSub');
const mMain = document.getElementById('mMain');
const mGallery = document.getElementById('mGallery');
const mSections = document.getElementById('mSections');
const mNote = document.getElementById('mNote');

function openModal(key) {
  const d = PRODUCTS[key];
  if (!d) return;
  mTitle.textContent = d.title;
  mSub.textContent = d.sub;
  mMain.src = d.main;
  mGallery.innerHTML = d.gallery.map(src => `<img src="${src}" alt="${d.title}">`).join('');
  mSections.innerHTML = d.sections.map(([h, p]) =>
    `<div class="m-block"><h5>${h}</h5><p>${p}</p></div>`).join('');
  if (d.resource) {
    mResource.innerHTML = `<div class="mres-card">
      <div class="mres-title">${d.resource.title}</div>
      <div class="mres-grid">${d.resource.items.map(([k, v]) =>
        `<div class="mres-item"><span class="mres-k">${k}</span><p>${v}</p></div>`).join('')}
      </div></div>`;
    mResource.style.display = 'block';
  } else {
    mResource.innerHTML = '';
    mResource.style.display = 'none';
  }
  mNote.textContent = d.note || '';
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
document.querySelectorAll('.prod-card').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.modal));
});
document.getElementById('modalClose').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
