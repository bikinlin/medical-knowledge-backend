const cheerio = require('cheerio');
const axios = require('axios');

let newsData = [
    { id: 1, title: "国家卫健委发布《医院信息化建设标准与规范》", source: "国家卫生健康委员会", date: "2026-05-08", url: "https://example.com/news/1" },
    { id: 2, title: "新版《医疗建筑智能化系统设计标准》GB51348-2025正式实施", source: "住房和城乡建设部", date: "2026-05-05", url: "https://example.com/news/2" },
    { id: 3, title: "关于推进智慧医院建设的指导意见", source: "国家发改委", date: "2026-04-28", url: "https://example.com/news/3" },
    { id: 4, title: "医疗数据安全管理办法出台", source: "国家网信办", date: "2026-04-20", url: "https://example.com/news/4" },
    { id: 5, title: "医保信息化建设三年行动计划启动", source: "国家医保局", date: "2026-04-15", url: "https://example.com/news/5" },
    { id: 6, title: "医院弱电系统工程验收规范更新", source: "中国工程建设标准知识服务网", date: "2026-04-10", url: "https://example.com/news/6" }
];

const RSS_NEWS = [
    { name: "新华网健康", url: "http://www.xinhuanet.com/health/news_health.xml" },
    { name: "人民网健康", url: "http://health.people.com.cn/rss/news.xml" }
];

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    res.json({
        success: true,
        data: newsData,
        updateTime: new Date().toISOString()
    });
};