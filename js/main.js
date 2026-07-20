/* 萍乡市致远行网络服务有限公司 · 官网交互
   - 移动端导航抽屉
   - 滚动淡入（IntersectionObserver）
   - 微信一键复制
   - 留言表单（免后端，提交到 Formspree 占位 endpoint）
   - 页脚年份 / 当前页高亮
*/
(function () {
  "use strict";

  /* ---- 移动端菜单 ---- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* ---- 滚动淡入 ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- 微信一键复制 ---- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () {
        var old = btn.textContent;
        btn.textContent = "已复制 ✓";
        setTimeout(function () { btn.textContent = old; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () { fallback(text); });
      } else { fallback(text); }
      function fallback(t) {
        var ta = document.createElement("textarea");
        ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  /* ---- 页脚年份 ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- 当前页导航高亮 ---- */
  var page = document.body.getAttribute("data-page");
  if (page) {
    var active = document.querySelector('.nav__links a[data-nav="' + page + '"]');
    if (active) active.classList.add("active");
  }

  /* ---- 留言表单（Formspree 免后端） ----
     使用方式：把下方 FORMSPREE_ENDPOINT 换成你的
     https://formspree.io/f/xxxxxxx 即可收消息。
     未配置时表单降级为 mailto 邮件。 */
  var FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID"; // ← 替换为你的 Formspree 地址
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var msg = form.querySelector(".form__msg");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // 前端校验
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (inp) {
        var field = inp.closest(".field");
        if (!inp.value.trim()) { field.classList.add("invalid"); ok = false; }
        else { field.classList.remove("invalid"); }
      });
      var tel = form.querySelector('[name="phone"]');
      if (tel && tel.value && !/^[\d\s+\-]{6,}$/.test(tel.value.trim())) {
        tel.closest(".field").classList.add("invalid");
        ok = false;
      }
      if (!ok) { msg.className = "form__msg bad"; msg.textContent = "请填写带 * 的必填项，电话格式需正确。"; return; }

      var name = (form.querySelector('[name="name"]') || {}).value || "";
      var phone = (form.querySelector('[name="phone"]') || {}).value || "";
      var wechat = (form.querySelector('[name="wechat"]') || {}).value || "";
      var message = (form.querySelector('[name="message"]') || {}).value || "";

      if (FORMSPREE_ENDPOINT.indexOf("YOUR_FORM_ID") > -1) {
        // 未配置 Formspree → 降级为发邮件
        var subject = encodeURIComponent("官网留言 - " + name);
        var body = encodeURIComponent("姓名：" + name + "\n电话：" + phone + "\n微信：" + wechat + "\n留言：" + message);
        window.location.href = "mailto:gsyy202504@163.com?subject=" + subject + "&body=" + body;
        msg.className = "form__msg ok";
        msg.textContent = "已为你唤起邮件客户端（未配置 Formspree）。也可直接加微信 gsyy202504 联系。";
        form.reset();
        return;
      }

      var data = new FormData(form);
      msg.className = "form__msg"; msg.textContent = "提交中…";
      fetch(FORMSPREE_ENDPOINT, {
        method: "POST", body: data, headers: { Accept: "application/json" }
      }).then(function (r) {
        if (r.ok) {
          msg.className = "form__msg ok";
          msg.textContent = "提交成功，我们会尽快与你联系！";
          form.reset();
        } else { throw new Error("fail"); }
      }).catch(function () {
        msg.className = "form__msg bad";
        msg.textContent = "提交失败，请直接拨打 159 7928 4443 或加微信 gsyy202504。";
      });
    });
  }
})();
