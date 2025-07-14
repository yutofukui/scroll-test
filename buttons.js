const buttonContainer = document.getElementById('buttonContainer');

const buttonCount = 12;

for (let i = 0; i < buttonCount; i++) {
  const btn = document.createElement('button');
  btn.classList.add('button');
  btn.textContent = 'CLICK ME';

  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * 4800 + 100;

  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;

  btn.addEventListener('click', () => {
    if (btn.classList.contains('pressed')) return;

    const indicator = document.createElement('div');
    indicator.classList.add('pressed-indicator');
    indicator.textContent = '✔ PRESSED';
    btn.appendChild(indicator);
    btn.classList.add('pressed');

    setTimeout(() => {
      btn.classList.remove('pressed');
      if (indicator && indicator.parentElement) {
        indicator.parentElement.removeChild(indicator);
      }
    }, 1000);
  });

  buttonContainer.appendChild(btn);
}