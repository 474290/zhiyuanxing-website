# 萍乡市致远行网络服务有限公司 · 企业官网

纯静态、零构建的多页面企业官网。暖调轻奢、简约大气，移动端自适应。

**当前公网预览**：https://c7b0f3df61964ed9a4bf0095c08d6b45.app.codebuddy.work
（由 CloudStudio 托管，可在国内直接访问）


## 文件结构
```
index.html      首页
about.html      关于我们
services.html   产品服务
contact.html    联系我们
404.html        404 页面
sitemap.xml     站点地图
robots.txt      搜索引擎抓取规则
README.md       本说明
css/style.css   全局样式（配色等均在 :root 变量里）
js/main.js      移动端菜单 / 滚动淡入 / 微信复制 / 留言表单
assets/
  logo.svg      文字标
  favicon.svg   站点图标
  hero.png      首页 Hero 主图（AI 生成，正式使用前建议替换）
  about.png     关于页配图（AI 生成，正式使用前建议替换）
  wechat-qr.png 微信二维码（待上传，见「微信二维码」一节）
```

## 本地预览
无需安装任何依赖，直接起一个静态服务器即可：

```bash
# 在项目根目录执行（任选其一）
python -m http.server 8080
# 然后浏览器打开 http://localhost:8080
```

直接双击 `index.html` 也能看，但建议用上面的方式（部分浏览器对本地文件的字体/CDN 限制更少）。

## 怎么改内容
- 公司名、电话、微信、地址：在 4 个 HTML 里搜索 `159 7928 4443`、`gsyy202504`、`萍乡市安源区汇蓝国际汇蓝阁` 全局替换即可。
- 文案：直接改对应 HTML 里的文字。每个区块都有清晰的注释与中文结构。

## 怎么换配色（一行即换）
打开 `css/style.css`，最上方 `:root` 里改这几个变量：
```css
--primary: #26403D;   /* 主色（深黛蓝绿） */
--accent:  #C2A15C;   /* 香槟金点缀 */
--rose:    #C28B86;   /* 莫兰迪玫瑰（招聘板块强调色） */
--bg:      #FAF8F4;   /* 页面底色 */
```
想更"冷/商务"可把 `--primary` 改成深蓝 `#1F3A5F`；想更"暖/女性"可把 `--rose` 调深一点。

## 替换照片
目前 Hero 主图和关于页配图由 AI 生成，风格可用但右下角带有「图片由 AI 生成」水印，正式上线前请替换为真实拍摄照片：
- 首页 Hero：替换 `assets/hero.png`，首页会自动读取。
- 关于页团队/办公照：替换 `assets/about.png`，about.html 已引用。
- 地图：见下方「地图嵌入说明」一节。

**尺寸建议**：Hero 图 1536×1024（或 3:2），关于页图 1536×1024；格式 .png 或 .jpg 都行。替换后如 OG 分享图需要完整 URL，请同步改 4 个 HTML 里的 `og:image`。当前为相对路径 `assets/hero.png`，绑定独立域名后请改成 `https://你的域名/assets/hero.png`。

## 微信二维码
联系页预留了微信二维码位置。微信加好友二维码是微信动态生成的 token，**无法由 AI 生成**，必须你自己操作：
1. 在微信里打开「我 → 二维码名片 → 保存到手机」。
2. 把截图放到 `assets/wechat-qr.png`。
3. 刷新页面即可显示在「微信二维码」卡片里。二维码已写进 HTML 的 `.qr-frame`，若你改文件名，需同步改 `contact.html` 中 `img src`。

## ICP 备案号
4 个页面页脚都有备案位，默认显示「赣ICP备XXXXXXXX号-1」。请登录 https://beian.miit.gov.cn/ 用你的主体备案号替换，否则国内服务器/域名绑定可能被管局要求整改。

## 配置留言表单（免后端）
表单默认在 `js/main.js` 里走 Formspree。两步即可收消息：
1. 打开 https://formspree.io 免费注册 → 新建表单 → 复制你的地址（形如 `https://formspree.io/f/abcdwxyz`）。
2. 打开 `js/main.js`，把第一行的
   `var FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";`
   改成你的地址。
未配置时，表单会自动降级为「唤起邮件客户端」并提示加微信，不影响使用。

## 部署（任意静态托管）
### 方式一：CloudStudio（已部署，立即可用）
当前公网地址：https://c7b0f3df61964ed9a4bf0095c08d6b45.app.codebuddy.work
直接打开即可预览，国内访问正常。

### 方式二：GitHub Pages（需要手动建仓库）
当前 MCP 连接器没有创建仓库权限，无法一键完成。请按以下 2 步手动操作：
1. 登录 GitHub → 新建仓库 → 命名为 `zhiyuanxing-website`（Public 公开）。
2. 把本项目文件全部推到仓库 `main` 分支，然后进入仓库 `Settings → Pages → Branch`，选择 `main / (root)` 保存，约 1 分钟后即可通过 `https://你的用户名.github.io/zhiyuanxing-website` 访问。

### 方式三：虚拟主机 / 对象存储（OSS、COS、七牛等）
把目录里所有文件原样上传即可，无需任何服务端环境。

### 国内域名与备案
- 如果绑定国内域名（如阿里云/腾讯云服务器），必须完成 **ICP 备案**并把备案号展示在页脚。
- 使用 GitHub Pages 或 CloudStudio 公网链接，则无需备案。

## 已做好的细节
- 响应式：手机端汉堡菜单、栅格自适应（断点 720 / 920 / 1024）。
- SEO：每页 `lang="zh-CN"`、title、description、keywords、OG 标签、Twitter Card、sitemap.xml、robots.txt。
- 交互：滚动淡入（IntersectionObserver）、微信一键复制、表单前端校验。
- 404 页面：独立 `404.html`，方便任何托管平台做自定义错误页。
- 无控制台报错、无死链（4 个页面互链 + 页脚互链均已校验）。

## 地图嵌入说明
联系我们页已内置**高德地图免 key iframe**，标记点精确落在「萍乡市安源区汇蓝国际汇蓝阁」。

- 坐标来源：腾讯地图返回的汇蓝国际精确坐标 `(纬度 27.638003, 经度 113.848073)`。高德 embed 参数 `lnglat` 是「经度在前、纬度在后」，即 `113.848073,27.638003`。
- 核心代码（`contact.html` 内 `.map-frame`）：
  ```html
  <iframe
    src="https://www.amap.com/embed?marker=lnglat:113.848073,27.638003&zoom=16&city=萍乡&callnative=0"
    width="100%" height="100%" frameborder="0" style="border:0;"
    allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"
    title="公司位置地图"></iframe>
  ```
- 改坐标：把 `lnglat:113.848073,27.638003` 换成你自己的 `经度,纬度`（用高德/百度坐标拾取器查）。
- 改缩放：`zoom=16` 越大越近（16≈街区级，14≈城区级）。
- 兜底：地图框上方有「在高德地图中打开 ↗」按钮，iframe 因网络或防盗链不可用时，访客点链接仍可在新标签导航。
- 备用方案（自定义标记 / 公司名标注，需免费 key）：若想用高德 JS API，去 https://lbs.amap.com 注册 → 创建「Web 端」应用拿 key，再把 iframe 换成官方 JS 示例（带 `new AMap.Marker`）。当前站点无需 key 即可显示地图。
