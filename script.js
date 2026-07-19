const comparison = document.querySelector('[data-comparison]');
const comparisonRange = comparison?.querySelector('.comparison-range');

if (comparison && comparisonRange) {
  const updateComparison = () => comparison.style.setProperty('--pos', `${comparisonRange.value}%`);
  let userMovedComparison = false;

  const demonstrateComparison = () => {
    if (userMovedComparison || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const start = performance.now();
    const duration = 1250;
    const from = 46;
    const to = 68;

    const frame = (now) => {
      if (userMovedComparison) return;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      comparisonRange.value = String(from + (to - from) * eased);
      updateComparison();
      if (progress < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  };

  comparisonRange.addEventListener('pointerdown', () => { userMovedComparison = true; }, { once: true });
  comparisonRange.addEventListener('keydown', () => { userMovedComparison = true; }, { once: true });
  comparisonRange.addEventListener('input', updateComparison);
  updateComparison();

  const comparisonObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      setTimeout(demonstrateComparison, 350);
      comparisonObserver.disconnect();
    }
  }, { threshold: 0.45 });
  comparisonObserver.observe(comparison);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const toast = document.querySelector('.toast');
let toastTimer;
document.querySelectorAll('[data-contact]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (link.getAttribute('href') === '#') {
      event.preventDefault();
      toast.querySelector('b').textContent = `${link.dataset.contact}: ссылка пока не добавлена`;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 3600);
    }
  });
});
