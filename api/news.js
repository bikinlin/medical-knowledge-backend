const axios = require('axios');
const cheerio = require('cheerio');

const sampleNews = [
    { id: 1, title: "国家卫健委发布《医院信息化建设标准与规范》", source: "国家卫生健康委员会", date: "2026-05-08" },
    { id: 2, title: "新版《医疗建筑智能化系统设计标准》GB51348-2025正式实施", source: "住房和城乡建设部", date: "2026-05-05" },
    { id: 3, title: "关于推进智慧医院建设的指导意见", source: "国家发改委", date: "2026-04-28" },
    { id: 4, title: "医疗数据安全管理办法出台", source: "国家网信办", date: "2026-04-20" },
    { id: 5, title: "医保信息化建设三年行动计划启动", source: "国家医保局", date: "2026-04-15" },
    { id: 6, title: "医院弱电系统工程验收规范更新", source: "中国工程建设标准知识服务网", date: "2026-04-10" }
];

const RSS_NEWS_SOURCES = [
    { name: "新华网健康", url: "http://www.xinhuanet.com/health/news_health.xml" },
    { name: "人民网健康", url: "http://health.people.com.cn/rss/news.xml" }
];

async function fetchRSS(source) {
    try {
        const response = await axios.get(source.url, {
            timeout: 10000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        const $ = cheerio.load(response.data, { xmlMode: true });
        const items = [];
        $('item').each((i, elem) => {
            if (i < 5) {
                const pubDateText = $(elem).find('pubDate').text().trim();
                items.push({
                    title: $(elem).find('title').text().trim(),
                    link: $(elem).find('link').text().trim(),
                    date: pubDateText ? new Date(pubDateText).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
                });
            }
        });
        return items;
    } catch (error) {
        console.log(`Failed to fetch ${source.name}: ${error.message}`);
        return [];
    }
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') return res.status(200).end();

    let allNews = [...sampleNews];
    for (const source of RSS_NEWS_SOURCES) {
        const items = await fetchRSS(source);
        if (items.length > 0) {
            const mapped = items.map((item, i) => ({
                id: Date.now() + i,
                title: item.title,
                source: source.name,
                date: item.date,
                url: item.link
            }));
            allNews = [...mapped, ...allNews];
        }
    }

    res.status(200).json({
        success: true,
        data: allNews.slice(0, 20),
        updateTime: new Date().toISOString()
    });
};
