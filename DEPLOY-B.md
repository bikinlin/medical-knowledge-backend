# 医疗弱电智能化知识库 - 方案B部署指南

## 📋 方案概述

**方案B: 混合部署**
- 🔄 **后端**: Railway（海外）- 支持定时任务自动更新
- 🌐 **前端**: Coding Pages（国内）- 国内用户快速访问

## 📁 项目结构

```
d:\IDE\
├── index.html          # PC端网站首页
├── wechat.html         # 微信公众号版本（移动端）
├── styles.css          # 样式文件
├── script.js           # 前端JavaScript
├── server.js           # Node.js后端服务
├── package.json        # 后端依赖配置
├── front-package.json  # 前端构建配置
├── DEPLOY.md           # 部署指南
```

---

## 🚀 第一步：部署后端到 Railway（海外）

### 1.1 注册与创建项目
1. 访问 https://railway.app
2. 使用GitHub账号登录
3. 点击 **"New Project"** → **"Deploy from GitHub repo"**
4. 选择您的代码仓库

### 1.2 配置环境变量
1. 在项目设置中点击 **"Variables"**
2. 添加环境变量：
   ```
   PORT=3000
   ```

### 1.3 部署验证
1. Railway会自动检测Node.js项目并部署
2. 部署成功后，获得后端URL，格式如：
   ```
   https://your-project-name.up.railway.app
   ```
3. 验证API：
   - 访问 `https://your-project-name.up.railway.app/api/health`
   - 返回JSON状态信息表示成功

### 1.4 更新前端API地址
修改 `script.js` 和 `wechat.html` 中的API地址：
```javascript
const API_BASE_URL = 'https://your-project-name.up.railway.app';
```

---

## 🚀 第二步：部署前端到 Coding Pages（国内）

### 2.1 注册与登录
1. 访问 https://coding.net
2. 使用账号登录（支持微信、GitHub登录）
3. 实名认证（国内服务必需）

### 2.2 创建项目
1. 点击 **"新建项目"**
2. 选择 **"代码仓库"**
3. 项目名称：`medical-knowledge-frontend`
4. 选择 **"公开"** 或 **"私有"**

### 2.3 上传代码
1. 进入项目后，点击 **"代码"**
2. 上传以下文件：
   - `index.html`
   - `styles.css`
   - `script.js`
   - `wechat.html`

### 2.4 配置 Pages
1. 点击 **"Pages"** → **"开始部署"**
2. 配置：
   - 分支：`main`
   - 目录：`/`
   - 构建命令：`npm run build`（如果需要）
3. 点击 **"部署"**

### 2.5 获取访问地址
部署成功后，获得国内访问地址：
```
https://your-username.coding-pages.com/medical-knowledge-frontend
```

---

## 🚀 第三步：微信公众号配置

### 3.1 登录微信公众平台
1. 访问 https://mp.weixin.qq.com
2. 进入 **"设置与开发"** → **"公众号设置"**

### 3.2 配置安全域名
1. 点击 **"功能设置"**
2. 添加 **"JS接口安全域名"**：
   ```
   your-username.coding-pages.com
   ```
3. 下载验证文件并上传到Coding Pages根目录

### 3.3 添加菜单
1. 进入 **"自定义菜单"**
2. 添加菜单链接：
   - 主菜单：`https://your-username.coding-pages.com/medical-knowledge-frontend/wechat.html`
   - 政策资讯：`https://your-username.coding-pages.com/medical-knowledge-frontend/wechat.html#news`
   - 技术动态：`https://your-username.coding-pages.com/medical-knowledge-frontend/wechat.html#tech`

---

## 🔄 自动更新配置

### 手动触发更新
```bash
curl -X POST https://your-project-name.up.railway.app/api/update
```

### 配置自动更新（推荐）
使用外部Cron服务每天自动调用：
1. 注册 https://www.easycron.com
2. 添加定时任务：
   - URL: `https://your-project-name.up.railway.app/api/update`
   - 频率: 每天早上6:00

---

## 🌐 访问地址汇总

| 用途 | 地址 |
|------|------|
| PC端网站 | `https://your-username.coding-pages.com/medical-knowledge-frontend/` |
| 微信公众号 | `https://your-username.coding-pages.com/medical-knowledge-frontend/wechat.html` |
| 后端API | `https://your-project-name.up.railway.app/api/news` |

---

## ⚠️ 注意事项

### 备案要求
- Coding Pages使用的是coding-pages.com域名，**不需要备案**
- 如果使用自定义域名绑定，需要先完成ICP备案

### 跨域问题
- 后端已配置CORS，允许所有域名访问
- 如果遇到跨域问题，检查浏览器控制台错误

### 数据更新延迟
- 后端每天自动更新一次
- 前端访问时实时从后端获取最新数据

---

## 📝 故障排除

### 前端无法加载数据
1. 检查后端服务是否正常运行
2. 确认API地址配置正确
3. 检查浏览器控制台网络请求

### 微信公众号打不开
1. 确认安全域名已配置
2. 验证文件已正确上传
3. 使用微信开发者工具调试

### 自动更新不生效
1. 检查Railway服务是否在运行
2. 查看Railway日志
3. 手动调用更新接口测试