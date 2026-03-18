document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const button = document.getElementById('themeToggle');
  const stored = localStorage.getItem('ck-theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('ck-theme', theme);
    if (button) {
      button.querySelector('.theme-text').textContent = theme === 'dark' ? 'Light' : 'Dark';
    }
  }

  setTheme(stored || (systemDark ? 'dark' : 'light'));

  button?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  const links = Array.from(document.querySelectorAll('.side-nav a'));
  const sections = links
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    const id = '#' + visible.target.id;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === id));
  }, { threshold: [0.25, 0.5, 0.75], rootMargin: '-10% 0px -55% 0px' });

  sections.forEach(section => observer.observe(section));
});