const comparison = document.querySelector('[data-comparison]');
const comparisonRange = comparison?.querySelector('.comparison-range');

if (comparison && comparisonRange) {
  const updateComparison = () => comparison.style.setProperty('--pos', `${comparisonRange.value}%`);
  comparisonRange.addEventListener('input', updateComparison);
  updateComparison();
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
