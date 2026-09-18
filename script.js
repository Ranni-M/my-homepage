// 第 3 次课 · 个人主页脚本
// 迭代1：锚点平滑滚动 + 页脚年份
// 迭代3：新增导航当前区块高亮（scrollspy）

/* ---------- 1. 锚点平滑滚动 ---------- */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // 移动端点击后自动收起菜单
    document.body.classList.remove('nav-open');
  });
});

/* ---------- 2. 页脚署名 ---------- */
document.querySelector('.footer .sign').innerHTML =
  '© ' + new Date().getFullYear() +
  ' 阮耀辉 · <span>本页由 AI 辅助开发</span>';

/* ---------- 3. 导航当前区块高亮 ---------- */
var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
var sections = navLinks
  .map(function (a) { return document.querySelector(a.getAttribute('href')); })
  .filter(Boolean);

function syncNav() {
  var offset = window.scrollY + 120; // 固定导航高度 + 一点余量
  var current = sections[0];
  sections.forEach(function (sec) {
    if (sec.offsetTop <= offset) current = sec;
  });
  navLinks.forEach(function (a) {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current.id);
  });
}

window.addEventListener('scroll', syncNav, { passive: true });
window.addEventListener('load', syncNav);
syncNav();

/* ---------- 4. 窄屏汉堡菜单（迭代4） ---------- */
var toggle = document.querySelector('.nav-toggle');
if (toggle) {
  toggle.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
