# 医疗弱电智能化知识库

## 项目简介

面向医疗弱电智能化领域的专业知识库系统，涵盖综合布线、医疗专项系统、安全防范、信息化系统、楼宇自控、医护通信、数据中心、工程验收等核心知识板块。

## 技术架构

- **前端**: HTML5 + CSS3 + Vanilla JavaScript
- **后端**: Node.js + Express
- **数据采集**: RSS 订阅 + Axios 爬虫

## 部署方案（混合部署）

- **后端**: Railway（海外，无需备案）
- **前端**: Coding Pages（国内，静态托管）

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/health | 健康检查 |
| GET | /api/news | 获取政策资讯 |
| GET | /api/tech | 获取技术动态 |
| GET | /api/all | 获取全部数据 |
| POST | /api/update | 手动触发数据更新 |

## 本地开发

```bash
npm install
npm start
# 访问 http://localhost:3000
```
