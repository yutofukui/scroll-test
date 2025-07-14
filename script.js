let scrollY = 0;
let multiplier = 1;

const content = document.getElementById('scrollable');
const slider = document.getElementById('scrollSlider');
const scrollBar = document.getElementById('scrollBar');
const levelIndicator = document.getElementById('levelIndicator');
const scrollPercent = document.getElementById('scrollPercent');

function updateScrollUI() {
  const maxScroll = content.scrollHeight - window.innerHeight;
  const percent = Math.min(100, (scrollY / maxScroll) * 100);
  scrollBar.style.width = `${percent}%`;
  scrollPercent.textContent = `${Math.round(percent)}%`;

  const hue = 200 + percent * 1.5;
  document.body.style.background = `hsl(${hue}, 50%, 10%)`;
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