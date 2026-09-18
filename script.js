// 第 3 次课 · 个人主页脚本
// 迭代1：锚点平滑滚动 + 页脚年份
// 迭代3：导航当前区块高亮（scrollspy）
// 迭代4：窄屏汉堡菜单
// 迭代5：多子页面适配 + 联系表单（mailto 提交，无需后端）

/* ---------- 1. 锚点平滑滚动（只处理本页锚点） ---------- */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.body.classList.remove('nav-open');   // 移动端点击后收起菜单
  });
});

/* ---------- 2. 页脚署名 ---------- */
var sign = document.querySelector('.footer .sign');
if (sign) {
  sign.innerHTML = '© ' + new Date().getFullYear() +
    ' 阮耀辉 · <span>本页由 AI 辅助开发</span>';
}

/* ---------- 3. 导航当前区块高亮（仅首页有锚点，子页面跳过） ---------- */
var navLinks = Array.prototype.slice
  .call(document.querySelectorAll('.nav-links a'))
  .filter(function (a) { return a.getAttribute('href').charAt(0) === '#'; });

if (navLinks.length) {
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  var syncNav = function () {
    var offset = window.scrollY + 120;      // 固定导航高度 + 余量
    var current = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= offset) current = sec;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle(
        'active',
        !!current && a.getAttribute('href') === '#' + current.id
      );
    });
  };

  window.addEventListener('scroll', syncNav, { passive: true });
  window.addEventListener('load', syncNav);
  syncNav();
}

/* ---------- 4. 窄屏汉堡菜单 ---------- */
var toggle = document.querySelector('.nav-toggle');
if (toggle) {
  toggle.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

/* ---------- 5. 联系表单：校验后用 mailto 提交 ---------- */
var form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var topic = form.topic.value;
    var msg = form.message.value.trim();

    if (!name || !email || !msg) {
      alert('请把姓名、邮箱和留言填完整，方便我回复你。');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('邮箱格式好像不太对，检查一下？');
      return;
    }

    var subject = '[个人主页留言] ' + topic + ' · ' + name;
    var body = '姓名：' + name + '\n邮箱：' + email + '\n主题：' + topic +
               '\n\n留言：\n' + msg;
    window.location.href = 'mailto:irl852ley@outlook.com' +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    var ok = document.querySelector('.form-ok');
    if (ok) {
      ok.textContent = '已打开你的邮件客户端，点发送就能发到我邮箱；没反应的话直接把内容复制到 irl852ley@outlook.com。';
      ok.classList.add('show');
    }
    form.reset();
  });
}
