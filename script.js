// 首版脚本：锚点平滑滚动 + 页脚年份
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelector('.footer p').textContent =
  '© ' + new Date().getFullYear() + ' 阮耀辉 · 本页由 AI 辅助开发';
