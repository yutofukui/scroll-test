let scrollY = 0;
let multiplier = 1;

const content = document.getElementById('scrollable');
const slider = document.getElementById('scrollSlider');
const scrollBar = document.getElementById('scrollBar');
const levelIndicator = document.getElementById('levelIndicator');
const scrollPercent = document.getElementById('scrollPercent');

const sections = [
    { id: 'intro', start: 0, end: 0.1, content: 'Critical Cycling 開始' },
    { id: 'about', start: 0.1, end: 0.3, content: '我々の理念・背景' },
    { id: 'works', start: 0.3, end: 0.6, content: '主な作品とプロジェクト' },
    { id: 'map', start: 0.6, end: 0.9, content: 'ライドマップ' },
    { id: 'outro', start: 0.9, end: 1.0, content: 'ご覧いただきありがとう' }
  ];
  let currentSection = null;

  function updateSection(percent) {
    const sec = sections.find(s => percent >= s.start * 100 && percent < s.end * 100);
    if (sec && sec.id !== currentSection) {
      currentSection = sec.id;
      showSectionContent(sec.content);
    }
  }
  function showSectionContent(text) {
    const ov = document.getElementById('sectionOverlay');
    ov.textContent = text;
    ov.classList.add('show');
    clearTimeout(ov._hideTimer);
    ov._hideTimer = setTimeout(() => ov.classList.remove('show'), 2000);
  }

function updateScrollUI() {
  const maxScroll = content.scrollHeight - window.innerHeight;
  const percent = Math.min(100, (scrollY / maxScroll) * 100);
  scrollBar.style.width = `${percent}%`;
  scrollPercent.textContent = `${Math.round(percent)}%`;

  const hue = 200 + percent * 1.5;
  document.body.style.background = `hsl(${hue}, 50%, 10%)`;
//   updateSection(percent);
}

function updateLevelIndicator(value) {
  if (value < 0.5) {
    levelIndicator.textContent = '●';
  } else if (value < 1.5) {
    levelIndicator.textContent = '●●';
  } else if (value < 3) {
    levelIndicator.textContent = '●●●';
  } else {
    levelIndicator.textContent = '●●●●';
  }
}

slider.addEventListener('input', () => {
  multiplier = parseFloat(slider.value);
  updateLevelIndicator(multiplier);
});

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  scrollY += e.deltaY * multiplier;
  scrollY = Math.max(0, Math.min(scrollY, content.scrollHeight - window.innerHeight));
  window.scrollTo(0, scrollY);
  updateScrollUI();
}, { passive: false });

window.addEventListener('resize', updateScrollUI);
document.addEventListener('DOMContentLoaded', () => {
  updateScrollUI();
  updateLevelIndicator(multiplier);
});

// 最後に追加
function updatePattern() {
    updatePatternScroll(scrollY);
  }
  
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    scrollY += e.deltaY * multiplier;
    scrollY = Math.max(0, Math.min(scrollY, content.scrollHeight - window.innerHeight));
    window.scrollTo(0, scrollY);
    updateScrollUI();
    updatePattern();
  }, { passive: false });
  
  window.addEventListener('resize', () => {
    updateScrollUI();
    updatePattern();
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    updateScrollUI();
    updateLevelIndicator(multiplier);
    updatePattern();
  });