# 医疗弱电智能化知识库 - 部署指南

## 项目结构

```
d:\IDE\
├── index.html          # PC端网站首页
├── wechat.html         # 微信公众号版本（移动端）
├── styles.css          # 样式文件
├── script.js           # 前端JavaScript
├── server.js           # Node.js后端服务
├── package.json        # Node.js依赖配置
├── vercel.json         # Vercel部署配置
├── vercel-api.js       # Vercel Serverless API
├── railway.json        # Railway部署配置
└── README.md           # 部署指南
```

## 免费云服务方案

### 方案1: Vercel（推荐 - 前端部署）
**优点**: 免费、全球CDN、自动部署
**限制**: Serverless函数不支持后台定时任务

### 方案2: Railway（推荐 - 后端部署）
**优点**: 免费、支持后台任务、自动更新
**限制**: 免费额度有限（每月500小时）

### 方案3: Render
**优点**: 免费、支持后台任务
**限制**: 休眠后启动较慢

---

## 部署步骤

### 第一步：部署后端服务（Railway）

1. **注册Railway账号**
   - 访问 https://railway.app
   - 使用GitHub账号登录

2. **创建新项目**
   - 点击 "New Project" → "Deploy from GitHub repo"
   - 选择您的代码仓库

3. **配置环境变量**
   - 在项目设置中添加：
     - `PORT`: 3000

4. **部署**
   - Railway会自动检测Node.js项目并部署
   - 部署成功后，您会获得一个URL，如：`https://your-app.up.railway.app`

5. **验证后端**
   - 访问 `https://your-app.up.railway.app/api/health`
   - 应该返回JSON状态信息

### 第二步：部署前端网站（Vercel）

1. **注册Vercel账号**
   - 访问 https://vercel.com
   - 使用GitHub账号登录

2. **创建新项目**
   - 点击 "Add New" → "Project"
   - 导入您的GitHub仓库

3. **配置环境变量**
   - 添加：
     - `API_URL`: 您的Railway后端URL（如：`https://your-app.up.railway.app`）

4. **部署**
   - Vercel会自动构建并部署
   - 部署成功后，您会获得一个URL，如：`https://your-project.vercel.app`

### 第三步：配置微信公众号

1. **登录微信公众平台**
   - 访问 https://mp.weixin.qq.com
   - 进入 "设置与开发" → "公众号设置"

2. **添加服务器域名**
   - 在 "功能设置" 中添加：
     - JS接口安全域名
     - 网页授权域名

3. **接入网站**
   - 在自定义菜单中添加您的网站链接
   - 或在自动回复中推送网站链接

---

## 自动更新配置

Railway部署的后端服务支持每天自动更新政策资讯和技术动态。

### 手动触发更新
```bash
curl -X POST https://your-app.up.railway.app/api/update
```

### 配置自动更新（推荐）
使用外部Cron服务（如EasyCron）每天自动调用更新接口：
- URL: `https://your-app.up.railway.app/api/update`
- 频率: 每天早上6:00

---

## 微信公众号版本使用说明

`wechat.html` 是专门为微信内置浏览器优化的移动端版本：
- 触摸友好的界面
- 底部导航栏
- 选项卡切换
- 自动加载后端数据

可以直接通过微信公众号菜单或自动回复链接访问。

---

## 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 启动后端服务
npm start

# 3. 打开浏览器访问
# 前端: http://localhost:3000 (需在浏览器打开index.html)
# 后端API: http://localhost:3000/api/news
```

---

## 故障排除

### 后端API无法访问
1. 检查Railway部署状态
2. 查看日志排查错误
3. 确认环境变量配置正确

### 前端无法加载数据
1. 确认Vercel环境变量中设置了正确的API_URL
2. 检查浏览器控制台错误信息
3. 确认CORS配置正确

### 微信公众号打不开
1. 确认域名已备案（国内服务器需要）
2. 检查微信安全域名配置
3. 确认使用HTTPS

---

## 技术支持

如有问题，请检查：
1. Railway/Railway日志
2. Vercel构建日志
3. 浏览器开发者工具控制台