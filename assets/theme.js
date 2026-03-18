(function () {
  function applyTheme(theme) {
    const root = document.documentElement;
    const btn = document.getElementById('themeToggle');
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (btn) btn.textContent = '☀️ Light mode';
    } else {
      root.removeAttribute('data-theme');
      if (btn) btn.textContent = '🌙 Dark mode';
    }
  }

  function getPreferredTheme() {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return preferredDark ? 'dark' : 'light';
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
  }

  window.toggleTheme = toggleTheme;

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getPreferredTheme());
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', toggleTheme);
    }
  });
})();
