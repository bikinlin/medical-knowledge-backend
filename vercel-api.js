const axios = require('axios');
const cheerio = require('cheerio');

let newsData = [
    { id: 1, title: "国家卫健委发布《医院信息化建设标准与规范》", source: "国家卫生健康委员会", date: "2026-05-08" },
    { id: 2, title: "新版《医疗建筑智能化系统设计标准》GB51348-2025正式实施", source: "住房和城乡建设部", date: "2026-05-05" },
    { id: 3, title: "关于推进智慧医院建设的指导意见", source: "国家发改委", date: "2026-04-28" },
    { id: 4, title: "医疗数据安全管理办法出台", source: "国家网信办", date: "2026-04-20" },
    { id: 5, title: "医保信息化建设三年行动计划启动", source: "国家医保局", date: "2026-04-15" },
    { id: 6, title: "医院弱电系统工程验收规范更新", source: "中国工程建设标准知识服务网", date: "2026-04-10" }
];

let techData = [
    { id: 1, title: "5G技术在远程手术中的应用突破", tags: ["5G", "远程医疗"], source: "医疗技术前沿", date: "2026-05-10" },
    { id: 2, title: "AI辅助诊断系统准确率突破95%", tags: ["AI", "诊断"], source: "人工智能医疗", date: "2026-05-06" },
    { id: 3, title: "新型医用物联网传感器研发成功", tags: ["物联网", "传感器"], source: "医疗器械创新", date: "2026-05-01" },
    { id: 4, title: "区块链技术在医疗数据共享中的应用", tags: ["区块链", "数据共享"], source: "医疗信息化", date: "2026-04-28" },
    { id: 5, title: "智能病房管理系统全面升级", tags: ["智能病房", "管理系统"], source: "智慧医院", date: "2026-04-25" },
    { id: 6, title: "边缘计算技术在医疗设备中的应用", tags: ["边缘计算", "医疗设备"], source: "技术创新", date: "2026-04-20" }
];

module.exports = async (req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (pathname === '/api/news') {
        return res.status(200).json({
            success: true,
            data: newsData,
            updateTime: new Date().toISOString()
        });
    }
    
    if (pathname === '/api/tech') {
        return res.status(200).json({
            success: true,
            data: techData,
            updateTime: new Date().toISOString()
        });
    }
    
    if (pathname === '/api/all') {
        return res.status(200).json({
            success: true,
            news: newsData,
            tech: techData,
            updateTime: new Date().toISOString()
        });
    }
    
    if (pathname === '/api/health') {
        return res.status(200).json({
            status: 'ok',
            uptime: process.uptime(),
            newsCount: newsData.length,
            techCount: techData.length
        });
    }
    
    return res.status(404).json({ error: 'Not Found' });
};